
const crypto = require('crypto');

const Feedback = require('./Feedback');

module.exports = class FeedbackGroup {
  constructor(
    password = null,
    masterPassword = null,
    feedbacks = {},
    id = null,
    feedbackerId = null,
    hashedPassword = null,
    hashedMasterPassword = null,
  ) {
    this.id = id
    this.feedbacks = this.mapFeedbacks(feedbacks);
    this.feedbackerId = feedbackerId ? feedbackerId : this.generateFeedbackerId();
    this.hashedPassword = password && password !== '' ? this.encrypt(password) : hashedPassword;
    this.hashedMasterPassword = masterPassword && masterPassword !== '' ? this.encrypt(masterPassword) : hashedMasterPassword;
  }

  mapFeedbacks(feedbacks) {
    const mappedFeedbacks = [];
    for (const key in feedbacks) {
      mappedFeedbacks.push(this.mapToFeedback(key, feedbacks[key]));
    }
    return mappedFeedbacks;
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

  mapToFeedback(feedbackId, feedbackJson) {
    return new Feedback(
      feedbackId,
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
    copiedFeedbackGroup.hashedPassword = undefined;
    copiedFeedbackGroup.hashedMasterPassword = undefined;
    return copiedFeedbackGroup;
  }

  toJSON() {
    const json = {
      id: this.id,
      feedbackerId: this.feedbackerId,
      hashedPassword: this.hashedPassword,
      hashedMasterPassword: this.hashedMasterPassword,
    };

    if (this.feedbacks) {
      json.feedbacks = this.feedbacks.map(feedback => feedback.toJSON())
    }
    return json
  }
}
