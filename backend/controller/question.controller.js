import Question from "../models/questionModel.js";

export const createQuestion = async (req, res) => {
  try {
    const { question, options, answer, category, level, addedBy } = req.body;
    // console.log(question, options, answer, category, level, addedBy);

    let errorMessage = "";

    switch (true) {
        case question === undefined || question=== "":
            errorMessage = "Question is required";
            break;
        case options === undefined || options === "":
            errorMessage = "Options are required";
            break;

        case answer === undefined || answer === "":
            errorMessage = "Answer is required";
            break;
        case category === undefined || category === "":
            errorMessage = "Category is required";
            break;
        case level === undefined || level === "":
            errorMessage = "Level is required";
            break;
        case addedBy === undefined || addedBy === "":
            errorMessage = "Added by is required";
            break;

    }

    if (errorMessage) {
        return res.status(400).send({
            message: errorMessage,
        });
    }

    const newQuestion = new Question({
        question,
        options,
        answer,
        category,
        level,
        addedBy,
    });

    await newQuestion.save();

    res.status(200).json({
     newQuestion,
      message: "Question Created",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      success: false,
      error: error.message,
    });
  }
};


export const getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate("addedBy","_id");
        res.status(200).json({
        questions,
        success: true,
        });
    } catch (error) {
        res.status(500).json({
        message: "Something went wrong",
        success: false,
        error: error.message,
        });
    }
}
