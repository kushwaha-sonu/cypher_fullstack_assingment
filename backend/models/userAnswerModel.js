// backend/models/userAnswerModel.js
import mongoose,{Schema} from 'mongoose';

const userAnswerSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    answers: {
        type: Array,
        required: true,
    },
    evaluated: {
        type: Boolean,
        default: false,
    },
    email: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const UserAnswer = mongoose.models.UserAnswer || mongoose.model('UserAnswer', userAnswerSchema);

export default UserAnswer;