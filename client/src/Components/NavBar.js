import React from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'

export default function NavBar() {

  const [cookies, setCookies] = useCookies(['access_token']);
  const navigate = useNavigate();

  const logout = () => {
    setCookies('access_token', '');
    window.localStorage.removeItem('userID');
    navigate('/auth');
  }

  return (
    <div className='navbar'>
      <Link to={'/'}>Home</Link>
      {!cookies.access_token ? <Link to={'/auth'}>Authenticate</Link> : <>
        <Link to={'/create-recipe'}>Create Recipe</Link>
        <Link to={'/saved-recipes'}>Saved Recipes</Link>
        <button onClick={logout}>Log Out</button>
      </>}
    </div>
  )
}
