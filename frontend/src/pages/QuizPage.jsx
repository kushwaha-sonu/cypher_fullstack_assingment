import MediaCapture from "../components/MediaCapture";
import Question from "../components/Question";
import useAllQuestions from "../hooks/getAllQuestion";
import { BiLoaderCircle } from "react-icons/bi";

const QuizPage = () => {
  const { questions, loading } = useAllQuestions();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <BiLoaderCircle className="size-16 animate-spin" />
      </div>
    );
  return (
    <main className="h-screen">
      <MediaCapture />
      <Question questions={questions} />
    </main>
  );
};

export default QuizPage;
