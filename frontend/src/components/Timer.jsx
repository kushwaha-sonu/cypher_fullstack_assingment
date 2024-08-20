import {useEffect, useState} from "react";

const Timer =({onSubmit}) => {

    const [timeLeft, setTimeLeft] = useState(600);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes} min : ${secs < 10 ? '0' : ''}${secs} sec`;
    };


    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    onSubmit(); // Submit the test when time is up
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [onSubmit()]);


    return (
        <div>
            <div className='mt-4 flex items-center justify-center bg-slate-300 p-2'>
                Time Left
            </div>
            <div>
                {formatTime(timeLeft)}
            </div>
        </div>
    )

}
export default Timer;