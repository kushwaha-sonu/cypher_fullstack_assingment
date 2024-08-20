// backend/models/Result.js
import mongoose ,{Schema}from 'mongoose';

const resultSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
    scorePercentage: {
        type: Number,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },
    correctAnswers: {
        type: Number,
        required: true,
    },
    wrongAnswers: {
        type: Number,
        required: true,
    },
    questionsWithActualAnswersAndUseAnswer: {
        type: Array,
        required: true,
    },
}, {
    timestamps: true,
});

const Result =mongoose.models.Result|| mongoose.model('Result', resultSchema);

export default Result;