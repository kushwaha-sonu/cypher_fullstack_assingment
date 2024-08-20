import { useState, useEffect } from "react";
import { API_URL } from "../constants";
import { useLocation } from "react-router-dom";

const useAllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/question/all-questions?category=${category}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: "include",
        });
        const { questions } = await response.json();

        setQuestions(questions);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [category]);

  return { questions, loading, error };
};

export default useAllQuestions;