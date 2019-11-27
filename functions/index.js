const admin = require('firebase-admin');
const functions = require('firebase-functions');

const addCORS = require('./addCors');
const FeedbackGroup = require('./models/FeedbackGroup');
const FeedbackStore = require('./stores/FeedbackStore');

admin.initializeApp();


exports.createFeedbackGroup = functions.https.onRequest(async (request, response) => {
  addCORS(response);
  if (request.method === 'OPTIONS') {
    return response.status(204).send('');
  }

  if (!request.body.data.password || !request.body.data.repeatPassword) {
    return response.status(400).send({ data: { error: 'please provide password and repeatPassword', key: 'empty' } });
  }

  if (request.body.data.password !== request.body.data.repeatPassword) {
    return response.status(400).send({ data: { error: 'passwords should be the same', key: 'same' } })
  }

  const feedbackStore = new FeedbackStore(admin);
  const newFeedbackGroup = new FeedbackGroup(request.body.data.password);
  try {
    const createdFeedbackGroup = await feedbackStore.create(newFeedbackGroup);
    return response.send({ data: createdFeedbackGroup.toJSON() });
  } catch (error) {
    return response.status(500).send({ data: { error: 'please try again later' } })
  }
});

exports.findAnonymousFeedbackGroup = functions.https.onRequest(async (request, response) => {
  addCORS(response);
  if (request.method === 'OPTIONS') {
    return response.status(204).send('');
  }

  if (!request.body.data.feedbackerId) {
    return response.status(400).send({ data: { error: 'please provide feedbackerId and password' } });
  }
  const feedbackStore = new FeedbackStore(admin);
  const feedbackGroup = await feedbackStore.findAnonymousFeedbackGroup(request.body.data.feedbackerId);

  if (feedbackGroup) {
    return response.send({ data: feedbackGroup.toJSON() });
  } else {
    return response.status(404).send({ data: { error: 'the feedbackGroup was not found' } })
  }
});

exports.findMasterFeedbackGroup = functions.https.onRequest(async (request, response) => {
  addCORS(response);
  if (request.method === 'OPTIONS') {
    return response.status(204).send('');
  }

  if (!request.body.data.feedbackerId || !request.body.data.password) {
    return response.status(400).send({ data: { error: 'please provide feedbackerId or password' } });
  }
  const feedbackStore = new FeedbackStore(admin);
  const feedbackGroup = await feedbackStore.findMasterFeedbackGroup(
    request.body.data.feedbackerId,
    request.body.data.password,
  );

  if (feedbackGroup) {
    return response.send({ data: feedbackGroup.toJSON() });
  } else {
    return response.status(404).send({ data: { error: 'the feedbackGroup was not found' } })
  }
});

exports.addFeedback = functions.https.onRequest(async (request, response) => {
  addCORS(response);
  if (request.method === 'OPTIONS') {
    return response.status(204).send('');
  }

  if (!request.body.data.feedbackGroupId || !request.body.data.feedback || !request.body.data.feedback.goodText || !request.body.data.feedback.improvementText) {
    return response.status(400).send({ data: { error: 'please provide feedbackGroupId and feedback(goodText, improvementText)' } });
  }
  const feedbackStore = new FeedbackStore(admin);
  try {
    const feedbackGroup = await feedbackStore.addFeedback(
      request.body.data.feedbackGroupId,
      request.body.data.feedback,
    );
    if (feedbackGroup) {
      return response.send({ data: feedbackGroup.toAnonymous().toJSON() });
    } else {
      return response.status(404).send({ data: { error: 'the feedbackGroup was not found' } })
    }
  } catch (error) {
    return response.status(500).send({ data: { error: `an unexpected error occured: ${error}` } })
  }
});


exports.findFeedbackGroup = functions.https.onRequest(async (request, response) => {
  addCORS(response);
  if (request.method === 'OPTIONS') {
    return response.status(204).send('');
  }

  if (!request.body.data.feedbackGroupId) {
    return response.status(400).send({ data: { error: 'please provide feedbackGroupId' } });
  }
  const feedbackStore = new FeedbackStore(admin);
  try {
    const feedbackGroup = await feedbackStore.getFeedbackGroupById(
      request.body.data.feedbackGroupId,
    );
    if (feedbackGroup) {
      return response.send({ data: feedbackGroup.toJSON() });
    } else {
      return response.status(404).send({ data: { error: 'the feedbackGroup was not found' } })
    }
  } catch (error) {
    return response.status(500).send({ data: { error: `an unexpected error occured: ${error}` } })
  }
});
