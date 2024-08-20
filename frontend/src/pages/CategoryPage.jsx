// frontend/src/pages/CategoryPage.jsx
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {API_URL} from "../constants/index.js";

const CategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`/api/question/all-categories`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: "include",
                    }
                );
                const data = await response.json();
                setCategories(data.categories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        navigate(`/quiz?category=${category}`);
    };
    // console.log(categories)

    return (
        <main className='h-screen bg-slate-200'>


            <div className='container mx-auto'>
                <div>

                    <h1 className='font-semibold text-2xl text-center p-3 pt-12'>Explore a Variety of Quiz Topics</h1>

                    <p className='text-center max-w-3xl mx-auto text-lg border p-2'>

                        Choose a category below to start your quiz. Test your knowledge and challenge your friends to
                        see
                        who can get the highest score!

                    </p>
                </div>
                <ul className='max-w-3xl mx-auto p-3 '>
                    {categories.length > 0 && categories.map((category, index) => (

                        <li key={index}
                            className='flex bg-slate-300 rounded-md gap-8 items-center border-2 my-2 justify-between p-3'>

                            <span className='font-semibold text-xl '>
                                {category}
                            </span>
                            <button
                                onClick={() => handleCategoryClick(category)}
                                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                                Start Test
                            </button>

                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default CategoryPage;