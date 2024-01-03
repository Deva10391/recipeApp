import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './Pages/Auth';
import CreateRecipe from './Pages/CreateRecipe';
import Home from './Pages/Home';
import SavedRecipes from './Pages/SavedRecipes';
import NavBar from './Components/NavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/auth' element={<Auth />} />
          <Route path='/create-recipe' element={<CreateRecipe />} />
          <Route path='/' element={<Home />} />
          <Route path='/saved-recipes' element={<SavedRecipes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
