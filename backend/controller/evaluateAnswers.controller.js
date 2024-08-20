import cron from 'node-cron';
import { calculateScorePercentage, getQuestionsWithAnswers } from '../utils/index.js';
import Question from '../models/questionModel.js';
import UserAnswer from '../models/userAnswerModel.js';
import Result from '../models/resultModel.js';
import { sendScoreToEmail } from '../utils/nodeMailer.js';

// Function to evaluate answers and store results
export const evaluateAnswersController = async () => {
    try {
        // Fetch user answers that need to be evaluated
        const userAnswers = await UserAnswer.find({ evaluated: false });
        let user_answers=null;

        // console.log(userAnswers);

        for (const userAnswer of userAnswers) {
            const { answers, userId, category, email } = userAnswer;
            // console.log({
            //     answers: answers,
            // })
            user_answers=answers;
            const questions = await Question.find({ category });

            let score = 0;
            const totalQuestions = questions.length;
            let correctAnswers = 0;
            let wrongAnswers = 0;

            questions.forEach((question) => {
                const userAnswerForQuestion = answers.find(answer => answer.question === question.question);


                if (userAnswerForQuestion && userAnswerForQuestion.userAnswer === question.answer) {
                    score += 1;
                    correctAnswers += 1;
                } else {
                    wrongAnswers += 1;
                }
            });

            const scorePercentage = calculateScorePercentage(score, totalQuestions);
            const questionsWithActualAnswersAndUseAnswer = getQuestionsWithAnswers(questions, user_answers);


            // console.log({
            //     questionsWithAnswers: questionsWithAnswers
            // })






            // Store the result
            const result = new Result({
                userId,
                category,
                score,
                scorePercentage,
                totalQuestions,
                correctAnswers,
                wrongAnswers,
                questionsWithActualAnswersAndUseAnswer,
                email
            });



            // console.log('-----------------------------------------------------------------------------------');
            //
            // console.log({
            //     result: result
            // });




            await result.save();

            // Log the evaluation result
            // console.log(`Evaluation result for user ${userId}:`, result);


            // Send score to email
            await sendScoreToEmail({
                score,
                scorePercentage,
                questionsWithActualAnswersAndUseAnswer,
                totalQuestions,
                correctAnswers,
                wrongAnswers,
                email
            });

            // Mark the user answers as evaluated

            userAnswer.evaluated = true;
            await userAnswer.save();
        }
    } catch (error) {
        console.error('Error evaluating answers:', error);
    }
};

// scheduled for 1 min for testing purpose
cron.schedule('* * * * *', evaluateAnswersController);