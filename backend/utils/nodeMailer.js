import nodemailer from "nodemailer";

export const sendScoreToEmail = async (data) => {
    const {
        userId,
        category,
        score,
        scorePercentage,
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        questionsWithActualAnswersAndUseAnswer,
        email
    } = data;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GOOGLE_EMAIL,
            pass: process.env.GOOGLE_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Quiz Result",
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h1 style="color: #333;">Your Quiz Results</h1>
            <h2 style="color: #555;">Score: ${score}</h2>
            <h2 style="color: #555;">Percentage: ${scorePercentage}%</h2>
            <h2 style="color: #555;">Total Questions: ${totalQuestions}</h2>
            <h2 style="color: #555;">Correct Answers: ${correctAnswers}</h2>
            <h2 style="color: #555;">Wrong Answers: ${wrongAnswers}</h2>
            <h2 style="color: #333;">Answers</h2>
            <ul style="list-style-type: none; padding: 0;">
                ${questionsWithActualAnswersAndUseAnswer.map((question) => `
                <li style="margin-bottom: 10px;">
                    <h3 style="color: #333;">Question: ${question.question}</h3>
                    <h3 style="color: ${question.userAnswer === question.correctAnswer ? '#4CAF50' : '#F44336'};">Your Answer: ${question.userAnswer}</h3>
                    <h3 style="color: #555;">Correct Answer: ${question.correctAnswer}</h3>
                </li>
                `).join("")}
            </ul>
        </div>
        `
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
};