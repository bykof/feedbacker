module.exports = class Feedback {
  constructor(id, goodText, improvementText) {
    this.id = id;
    this.goodText = goodText;
    this.improvementText = improvementText;
  }

  toJSON() {
    return {
      id: this.id,
      goodText: this.goodText,
      improvementText: this.improvementText,
    }
  }
}
