import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useGetUserID } from '../hooks/useGetUserID';
import { useCookies } from 'react-cookie';

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const userID = useGetUserID();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies('access_token');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/recipe/');
        setRecipes(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/recipe/savedRecipes/ids/${userID}`,
          { headers: { authorization: cookies.access_token } });
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRecipes();
    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put('http://localhost:3001/recipe/',
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } });
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.error(err);
    }
  }

  const isRecipeSaved = (id) => {
    return savedRecipes.includes(id);
  }

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <button
                disabled={isRecipeSaved(recipe._id)}
                onClick={() => saveRecipe(recipe._id)}
              >{isRecipeSaved(recipe._id) ? 'Saved' : 'Save'}</button>
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
