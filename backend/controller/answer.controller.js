import {calculateScorePercentage, convertObjectToArray, getQuestionsWithAnswers} from "../utils/index.js";
import Question from "../models/questionModel.js";
import UserAnswer from "../models/userAnswerModel.js";

export const userResult = async (req, res) => {
    try {
        const { userAnswers, category, email, _id } = req.body;
        // console.log(userAnswers, category);
        const questions = await Question.find({ category: category });

        let score = 0;
        let correctAnswers = 0;
        let wrongAnswers = 0;
        const totalQuestions = questions.length;
        // console.log(questions);

        questions.forEach((question) => {
            if (userAnswers[question._id]?.answer === question.answer) {
                score += 1;
                correctAnswers += 1;
            } else {
                wrongAnswers += 1;
            }
        });

        const scorePercentage = calculateScorePercentage(score, totalQuestions);
        const questionsWithAnswers = convertObjectToArray(questions, userAnswers);


        // console.log({
        //     questionsWithAnswers: questionsWithAnswers,
        // });

        const newUserAnswer = new UserAnswer({
            userId: _id,
            category: category,
            answers: questionsWithAnswers,
            email: email,
        });

        await newUserAnswer.save();

        // console.log(newUserAnswer);

        res.status(200).json({
            score: score,
            scorePercentage: scorePercentage,
            totalQuestions: totalQuestions,
            correctAnswers: correctAnswers,
            wrongAnswers: wrongAnswers,
            message: "success",
            success: true,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: e.message,
        });
    }
};