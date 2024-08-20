import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const ResultPage = () => {
    const {
        score,
        scorePercentage,
        totalQuestions,
        correctAnswers,
        wrongAnswers
    } = useSelector((state) => state.answer.score)
    return (
        <main className='h-screen'>

            <div className='container mx-auto mt-28'>


                <div className='max-w-lg mx-auto bg-slate-200 rounded-md'>
                    <h1 className='text-3xl font-semibold  text-center p-2'>Your Quiz Results</h1>

                    <div className='mt-8 pb-4 text-slate-700 p-3'>

                        <h1 className='text-3xl bg-white my-2 rounded-md font-semibold p-2 text-center'>Score:{score}</h1>
                        <h1 className='text-3xl bg-white my-2 rounded-md font-semibold p-2 text-center'>Percentage:{scorePercentage}%</h1>
                        <h1 className='text-3xl bg-white my-2 rounded-md font-semibold p-2 text-center'>Total Questions:{totalQuestions}</h1>
                        <h1 className='text-3xl bg-white my-2 rounded-md font-semibold p-2 text-center'>Correct Answers:{correctAnswers}</h1>
                        <h1 className='text-3xl bg-white my-2 rounded-md font-semibold p-2 text-center'>Wrong Answer:{wrongAnswers}</h1>
                    </div>
                </div>

                <div className='mt-12 text-center font-semibold text-xl'>
                    <p>For detail answer check your email </p>
                </div>

                <div className='flex items-center justify-center'>
                    <Link to='/categories'
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-full mt-4'>
                        Give Another Test
                    </Link>
                </div>
            </div>

        </main>
    )
}
export default ResultPage