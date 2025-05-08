const db = require("../infrastructure/firebase");

class Prompt {
  constructor(content, status, createdAt) {
    this.content = content;
    this.status = status;
    this.createdAt = createdAt;
  }

  getPrompt() {
    return {
      content: this.content,
      status: this.status,
      createdAt: this.createdAt,
    };
  }

  static async getById(id) {
    try {
      const doc = await db.collection("prompts").doc(id).get();
      if (!doc.exists) {
        return null;
      }
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error("Error retrieving message from Firestore:", error);
      throw error;
    }
  }

  async save() {
    try {
      const promptData = this.getPrompt();
      const docRef = await await db.collection("prompts").add(promptData);
      return docRef.id;
    } catch (error) {
      console.error("Error saving message to Firestore:", error);
      throw error;
    }
  }

  static async setStatusAsDone(id) {
    try {
      const docRef = db.collection("prompts").doc(id);
      const doc = await docRef.get();
      if (!doc.exists) {
        return null;
      }
      await docRef.update({ status: "done" });
      return true;
    } catch (error) {
      console.error("Error updating message in Firestore:", error);
      throw error;
    }
  }

  static async sentStatusAsError(id) {
    try {
      const docRef = db.collection("prompts").doc(id);
      const doc = await docRef.get();
      if (!doc.exists) {
        return null;
      }
      await docRef.update({ status: "error" });
      return true;
    } catch (error) {
      console.error("Error updating message in Firestore:", error);
      throw error;
    }
  }
}

module.exports = Prompt;
