import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import axios from 'axios';

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
        const response = await axios.get(`api/question/all-questions`, {
          params: { category },
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        setQuestions(response.data.questions);
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