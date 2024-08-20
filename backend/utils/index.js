export const calculateScorePercentage = (score, totalQuestions) => {
    return Math.round((score / totalQuestions) * 100 * 100) / 100;
};

// export const getQuestionsWithAnswers = (questions, answers) => {
//     return questions.map((question) => {
//         const userAnswer = answers.find(answer => String(answer.userAnswer.questionId) === String(question._id));
//         return {
//             question: question.question,
//             correctAnswer: question.answer,
//             userAnswer: userAnswer ? userAnswer.userAnswer.answer : null
//         };
//     });
// };


// export const getQuestionsWithAnswers = (questions, answers) => {
//     if (!Array.isArray(answers)) {
//         throw new TypeError('Expected answers to be an array');
//     }
//
//     return questions.map((question) => {
//         const userAnswer = answers.find(answer => String(answer.userAnswer.questionId) === String(question._id));
//         return {
//             question: question.question,
//             correctAnswer: question.answer,
//             userAnswer: userAnswer ? userAnswer.userAnswer.answer : null
//         };
//     });
// };



export const convertObjectToArray = (questions, userAnswers) => {


    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    //
    // console.log({
    //     userAnswers: userAnswers,
    //     questions: questions
    // })
    const answersArray = Object.values(userAnswers).map(({ questionId, answer }) => ({ questionId, answer }));

    return questions.map((question) => {
        const userAnswer = answersArray.find(answer => String(answer.questionId) === String(question._id));
        return {
            question: question.question,
            correctAnswer: question.answer,
            userAnswer: userAnswer ? userAnswer.answer : 'No answer provided'
        };
    });
};

export const getQuestionsWithAnswers = (questions, user_answers) => {


    return questions.map((question) => {
        const userAnswer = user_answers.find(answer => answer.question === question.question);
        return {
            question: question.question,
            correctAnswer: question.answer,
            userAnswer: userAnswer ? userAnswer.userAnswer : 'No answer provided'
        };
    });
};

