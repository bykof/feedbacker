const FeedbackGroup = require('../models/FeedbackGroup');

module.exports = class FeedbackStore {
  constructor(admin) {
    this.feedbackGroups = admin.database().ref('feedbackGroups');
  }

  toFeedbackGroup(id, feedbackGroupJSON) {
    return new FeedbackGroup(
      null,
      feedbackGroupJSON.feedbacks,
      id,
      feedbackGroupJSON.feedbackerId,
      feedbackGroupJSON.hashedPassword,
    );
  }

  async create(feedbackGroup) {
    const newFeedbackGroupRef = await this.feedbackGroups.push(feedbackGroup.toJSON());
    const newFeedbackGroupSnapshot = await newFeedbackGroupRef.once('value');
    return this.toFeedbackGroup(newFeedbackGroupSnapshot.key, newFeedbackGroupSnapshot.val());
  }

  async findFeedbackGroupRefWithId(feedbackGroupId) {
    return await this.feedbackGroups.child(feedbackGroupId);
  }

  async addFeedback(feedbackGroupId, feedback) {
    const feedbackGroupRef = await this.findFeedbackGroupRefWithId(feedbackGroupId);
    await feedbackGroupRef.child('feedbacks').push(feedback);
    const feedbackGroupSnapshot = await feedbackGroupRef.once('value');
    return this.toFeedbackGroup(feedbackGroupId, feedbackGroupSnapshot.val());
  }

  async getFeedbackGroupById(feedbackGroupId) {
    const feedbackGroupRef = await this.findFeedbackGroupRefWithId(feedbackGroupId);
    const feedbackGroupSnapshot = await feedbackGroupRef.once('value');

    if (feedbackGroupSnapshot.val()) {
      return this.toFeedbackGroup(feedbackGroupId, feedbackGroupSnapshot.val()).toAnonymous();
    }
  }

  async findFeedbackGroup(feedbackerId) {
    let foundFeedbackGroup = null;
    const snapshot = await this.feedbackGroups.once('value')
    const feedbackGroupsJSON = snapshot.val();

    for (const key in feedbackGroupsJSON) {
      const feedbackGroup = this.toFeedbackGroup(key, feedbackGroupsJSON[key]);

      if (feedbackGroup.feedbackerId === feedbackerId) {
        foundFeedbackGroup = feedbackGroup;
      }
    }
    return foundFeedbackGroup;
  }

  async findAnonymousFeedbackGroup(feedbackerId) {
    const foundFeedbackGroup = await this.findFeedbackGroup(feedbackerId);
    if (foundFeedbackGroup) {
      return foundFeedbackGroup.toAnonymous();
    }
    return foundFeedbackGroup;
  }

  async findMasterFeedbackGroup(feedbackerId, password) {
    const foundFeedbackGroup = await this.findFeedbackGroup(feedbackerId, password);
    if (foundFeedbackGroup) {
      return foundFeedbackGroup;
    }
  }
}
