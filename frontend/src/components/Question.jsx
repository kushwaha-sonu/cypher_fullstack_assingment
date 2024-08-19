import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Question = ({ questions }) => {
  console.log(questions);

  const [index, setIndex] = useState(0);

  return (
    <div className="flex items-center bg-slate-200 w-full justify-center h-screen">
      <div className="container mx-auto">
        <div className="bg-white max-w-3xl mx-auto p-4 rounded-md shadow-md">
          <h1 className="text-2xl font-semibold text-center">
            {questions[index].question}
          </h1>
          <div className="mt-4">
            {questions[index].options.map((option, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2 my-2 border rounded-md cursor-pointer hover:bg-gray-100"
              >
                <p>{option}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setIndex((prev) => prev - 1)}
              disabled={index === 0}
              className="bg-gray-200 p-2 px-4 rounded-md"
            >
              Previous
            </button>
            <button
              onClick={() => setIndex((prev) => prev + 1)}
              disabled={index === questions.length - 1}
              className="bg-gray-200 p-2 px-4 rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
