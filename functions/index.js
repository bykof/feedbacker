const crypto = require('crypto');

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

class Feedback {
  constructor(goodText, improvementText) {
    this.goodText = goodText;
    this.improvementText = improvementText;
  }

  toJSON() {
    return {
      goodText: this.goodText,
      improvementText: this.improvementText,
    }
  }
}

class FeedbackGroup {
  constructor(
    password = null,
    masterPassword = null,
    feedbacks = [],
    id = null,
    feedbackerId = null,
    hashedPassword = null,
    hashedMasterPassword = null,
  ) {
    this.id = id
    this.feedbacks = feedbacks.map(this.mapToFeedback);
    this.feedbackerId = feedbackerId ? feedbackerId : this.generateFeedbackerId();
    this.hashedPassword = password && password !== '' ? this.encrypt(password) : hashedPassword;
    this.hashedMasterPassword = masterPassword && masterPassword !== '' ? this.encrypt(masterPassword) : hashedMasterPassword;
  }

  generateFeedbackerId() {
    return (Math.floor(Math.random() * 90000) + 10000).toString();
  }

  encrypt(password) {
    return crypto.createHmac(
      'sha256',
      functions.config().passwords.hashpassword,
    ).update(password).digest('hex');
  }

  samePassword(password) {
    return this.hashedPassword === this.encrypt(password);
  }

  sameMasterPassword(masterPassword) {
    return this.hashedMasterPassword === this.encrypt(masterPassword);
  }

  mapToFeedback(feedbackJson) {
    return new Feedback(
      feedbackJson.goodText,
      feedbackJson.improvementText,
    )
  }

  deepCopy() {
    return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
  }

  toAnonymous() {
    const copiedFeedbackGroup = this.deepCopy();
    copiedFeedbackGroup.feedbacks = undefined;
    copiedFeedbackGroup.hashedMasterPassword = undefined;
    return copiedFeedbackGroup;
  }

  toJSON() {
    const json = {
      id: this.id,
      feedbackerId: this.feedbackerId,
    };

    if (this.feedbacks) {
      json.feedbacks = this.feedbacks.map(feedback => feedback.toJSON())
    }
    return json
  }
}

class FeedbackStore {
  constructor(admin) {
    this.feedbackGroups = admin.database().ref('feedbackGroups');
  }

  toFeedbackGroup(id, feedbackGroupJSON) {
    return new FeedbackGroup(
      null,
      null,
      feedbackGroupJSON.feedbacks,
      id,
      feedbackGroupJSON.feedbackerId,
      feedbackGroupJSON.hashedPassword,
      feedbackGroupJSON.hashedMasterPassword,
    );
  }

  create(feedbackGroup) {
    return this.feedbackGroups.push(feedbackGroup.toJSON());
  }

  async findFeedbackGroup(feedbackerId, password) {
    let foundFeedbackGroup = null;
    const snapshot = await this.feedbackGroups.once('value')
    const feedbackGroupsJSON = snapshot.val();

    for (const key in feedbackGroupsJSON) {
      const feedbackGroup = this.toFeedbackGroup(key, feedbackGroupsJSON[key]);

      if (feedbackGroup.feedbackerId === feedbackerId && feedbackGroup.samePassword(password)) {
        foundFeedbackGroup = feedbackGroup;
      }
    }
    return foundFeedbackGroup;
  }

  async findAnonymousFeedbackGroup(feedbackerId, password) {
    const foundFeedbackGroup = await this.findFeedbackGroup(feedbackerId, password);
    if (foundFeedbackGroup) {
      return foundFeedbackGroup.toAnonymous();
    }
    return foundFeedbackGroup;
  }

  async findMasterFeedbackGroup(feedbackerId, password, masterPassword) {
    const foundFeedbackGroup = await this.findFeedbackGroup(feedbackerId, password);
    if (foundFeedbackGroup && foundFeedbackGroup.sameMasterPassword(masterPassword)) {
      return foundFeedbackGroup;
    }
  }
}

function addCORS(response) {
  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Credentials', 'true');
  response.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  response.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

exports.createFeedbackGroup = functions.https.onRequest((request, response) => {
  addCORS(response);
  if (request.method === 'OPTIONS') {
    return response.status(204).send('');
  }

  if (!request.body.data.password || !request.body.data.masterPassword) {
    return response.status(400).send({ data: { error: 'please provide password and masterPassword' } });
  }

  const feedbackStore = new FeedbackStore(admin);
  const newFeedbackGroup = new FeedbackGroup(request.body.data.password, request.body.data.masterPassword);
  return response.send({ data: feedbackStore.create(newFeedbackGroup).toJSON() });
});

exports.findAnonymousFeedbackGroup = functions.https.onRequest(async (request, response) => {
  addCORS(response);
  if (request.method === 'OPTIONS') {
    return response.status(204).send('');
  }

  if (!request.body.data.feedbackerId || !request.body.data.password) {
    return response.status(400).send({ data: { error: 'please provide feedbackerId and password' } });
  }
  const feedbackStore = new FeedbackStore(admin);
  const feedbackGroup = await feedbackStore.findAnonymousFeedbackGroup(request.body.data.feedbackerId, request.body.data.password);

  if (feedbackGroup) {
    return response.send({ data: feedbackGroup.toJSON() });
  } else {
    return response.status(404).send({ data: { error: 'feedbackGroup not found' } })
  }
});

exports.findMasterFeedbackGroup = functions.https.onRequest(async (request, response) => {
  addCORS(response);
  if (request.method === 'OPTIONS') {
    return response.status(204).send('');
  }

  if (!request.body.data.feedbackerId || !request.body.data.password || !request.body.data.masterPassword) {
    return response.status(400).send({ data: { error: 'please provide feedbackerId, password and masterPassword' } });
  }
  const feedbackStore = new FeedbackStore(admin);
  const feedbackGroup = await feedbackStore.findMasterFeedbackGroup(
    request.body.data.feedbackerId,
    request.body.data.password,
    request.body.data.masterPassword,
  );

  if (feedbackGroup) {
    return response.send({ data: feedbackGroup.toJSON() });
  } else {
    return response.status(404).send({ data: { error: 'feedbackGroup not found' } })
  }
});
