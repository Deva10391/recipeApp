import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

export default function SavedRecipes() {
  const userID = useGetUserID();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies('access_token');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipe/savedRecipes/${userID}`, 
        { headers: { authorization: cookies.access_token } });
        console.log(response.data.savedRecipes);
        setSavedRecipes(response.data.savedRecipes);

      } catch (err) {
        console.error(err);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div className='instructions'>
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking time: {recipe.cookingTime} (minutes)</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
