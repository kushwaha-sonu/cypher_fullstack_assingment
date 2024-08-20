import MediaCapture from "../components/MediaCapture";
import Question from "../components/Question";
import useAllQuestions from "../hooks/getAllQuestion";
import {BiLoaderCircle} from "react-icons/bi";
import {useState} from "react";

const QuizPage = () => {
    const {questions, loading} = useAllQuestions();
    const [cameraAllowed, setCameraAllowed] = useState(false);

    if (loading)
        return (
            <div className="flex items-center justify-center h-screen">
                <BiLoaderCircle className="size-16 animate-spin"/>
            </div>
        );
    return (
        <main className="h-full bg-slate-200">

            <MediaCapture cameraAllowed={cameraAllowed} setCameraAllowed={setCameraAllowed}/>


            {
                cameraAllowed && (
                    <>
                        <Question questions={questions} cameraAllowed={cameraAllowed} />
                    </>

                )
            }
        </main>
    );
};

export default QuizPage;
