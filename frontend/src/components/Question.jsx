import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { answerStart, answerSuccess, scoreFailure, scoreSuccess } from "../store/slices/answerSlice.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Question = ({ questions, cameraAllowed }) => {
    const { email,_id } = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    // console.log(_id)

    const [index, setIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});

    const handleAnswerSelect = (questionId, answer) => {
        setUserAnswers((prev) => ({
            ...prev,
            [questionId]: { questionId, answer },
        }));
    };

    const onSubmit = useCallback(async () => {
        try {
            const response = await axios.post(`api/user_answer/answer`, {
                userAnswers,
                category,
                email,
                _id
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            const data = response.data;
            dispatch(scoreSuccess(data));
            console.log(data.score);

            navigate('/result');
        } catch (e) {
            console.log(e);
            dispatch(scoreFailure(e.message));
        }
    }, [userAnswers]);
    // console.log(userAnswers)

    return (
        <>
            <div className='flex flex-row-reverse'>
                <div className='w-1/4 h-screen p-3 border-l-2 border-slate-300 '>
                    <div className='mt-4 flex items-center justify-center bg-slate-300 p-2'>
                        <span className='text-black font-semibold text-xl '>{questions[index].category}</span>
                    </div>
                    <ul className="flex flex-row gap-4 border border-slate-400 flex-wrap items-center justify-center mt-3 p-4 w-full">
                        {questions.map((question, i) => (
                            <li
                                key={i}
                                className={`cursor-pointer flex items-center justify-center rounded-md w-10 h-10 p-2
                                ${userAnswers[question._id] ? 'bg-green-500 text-white' : index === i ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
                                onClick={() => setIndex(i)}
                            >
                                {i + 1}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="container mt-24 mx-auto p-3">
                    <div className="bg-white max-w-2xl mx-auto p-4 rounded-md shadow-md">
                        <div className='flex items-center gap-2'>
                            <h1 className='text-2xl font-semibold text-center'>{index + 1}.</h1>
                            <h1 className="text-2xl font-semibold text-center">
                                {questions[index].question}
                            </h1>
                        </div>
                        <div className="mt-4">
                            {questions[index].options.map((option, i) => (
                                <div key={i} className='flex items-center gap-2'>
                                    <div>{i + 1}</div>
                                    <div
                                        onClick={() => handleAnswerSelect(questions[index]._id, option)}
                                        className={`flex-1 items-center justify-between p-2 my-2 border rounded-md cursor-pointer
                                            ${userAnswers[questions[index]._id]?.answer === option ? 'bg-green-300' : 'hover:bg-gray-200'}
                                            ${userAnswers[questions[index]._id]?.answer === option ? 'hover:bg-green-400' : ''}`}
                                    >
                                        <p>{option}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="container mx-auto mt-28 bg-slate-500/20 p-4">
                        <div className='max-w-3xl mx-auto flex justify-between items-center'>
                            <div className='flex gap-6 font-semibold '>
                                <button
                                    onClick={() => setIndex((prev) => prev - 1)}
                                    disabled={index === 0}
                                    className="bg-gray-200 p-2 px-4 rounded-md w-32 text-center"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setIndex((prev) => prev + 1)}
                                    disabled={index === questions.length - 1}
                                    className="bg-gray-200 p-2 px-4 rounded-md w-32 text-center"
                                >
                                    Next
                                </button>
                            </div>

                            <div>
                                <button
                                    onClick={onSubmit}
                                    className="bg-blue-500 p-2 px-4 rounded-md w-32 text-center font-semibold text-xl"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Question;