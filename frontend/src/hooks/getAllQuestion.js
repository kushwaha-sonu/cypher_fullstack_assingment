import { useState, useEffect } from "react";
import { API_URL } from "../constants";


const useAllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const  response  = await fetch(`${API_URL}/api/question/all-questions`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials:"include",
        });
        const {questions }= await response.json();
        
        
        setQuestions(questions);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { questions, loading, error };
};

export default useAllQuestions;
