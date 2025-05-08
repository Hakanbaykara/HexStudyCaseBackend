const Prompt = require("../models/prompt");

exports.getPrompt = async (req, res) => {
  try {
    const { id } = req.params;
    const prompt = await Prompt.getById(id);
    if (!prompt) {
      return res.status(404).json({ error: "Prompt not found" });
    }
    res.json(prompt);
  } catch (error) {
    console.error("Error retrieving prompt:", error);
    res.status(500).json({ error: "Failed to retrieve prompt" });
  }
};

exports.createPrompt = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content || typeof content !== "string") {
      return res
        .status(400)
        .json({ error: "Invalid or missing content in request body" });
    }

    const prompt = new Prompt(content, "processing", Date.now());
    const id = await prompt.save();

    // Start timer for status update simulation (fire and forget)
    setTimeout(async () => {
      try {
        if (id === "wrong") {
          await Prompt.sentStatusAsError(id);
        } else await Prompt.setStatusAsDone(id);
      } catch (error) {
        console.error("Failed to mark prompt as expired:", error);
      }
    }, 15000);

    res.json({ id, ...prompt.getPrompt() });
  } catch (error) {
    console.error("Error processing prompt:", error);
    res.status(500).json({ error: "Failed to save prompt" });
  }
};
