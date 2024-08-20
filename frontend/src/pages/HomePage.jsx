import { useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const HomePage = () => {

    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);

    const handleButtonClick = () => {
        if (user) {
            navigate("/categories");
        } else {
            navigate("/sign-in");
        }
    };
    return (
        <main className="h-screen pt-4 hero-section">
            <div className="mt-8">
                <h1 className="text-5xl text-white  font-bold text-center p-2">
                    Challenge Your Mind with Every Question!
                </h1>
            </div>

            <div className="flex w-full items-center justify-center mt-8 p-2 ">
                <p className="text-center max-w-3xl mx-auto text-white font-semibold text-xl border ">
                    Put your knowledge to the test with our exciting quiz challenges.
                    Whether you’re a trivia buff or just looking for a fun way to learn,
                    our app offers endless questions to keep your brain sharp. Compete
                    with friends, climb the leaderboard, and discover how much you really
                    know!
                </p>
            </div>

            <div className="flex items-center justify-center mt-10">
                <button
                    onClick={handleButtonClick}
                    className="w-60 text-white p-3 rounded-md text-2xl font-semibold bg-gradient-to-r hover:bg-gradient-to-tl from-pink-700/80 to-sky-600 "
                >
                    Start Quiz Now

                </button>
            </div>
        </main>
    );
};

export default HomePage;
