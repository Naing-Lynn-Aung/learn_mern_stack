import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Pagination from "../components/Pagination";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "../helpers/axios";

export default function Home() {

  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [links, setLinks] = useState(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search);
  const page = parseInt(searchQuery.get('page')) || 1;

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await axios('/api/recipes?page=' + page);
      if (response.status === 200) {
        const data = response.data;
        setLinks(data.links);
        setRecipes(data.recipes);
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
      }
    };
    fetchRecipes();
  }, [page]);

  const onDeleted = (_id) => {
    if (recipes.length === 1 && page > 1) {
      navigate('/?page=' + (page - 1));
    } else {
      setRecipes(prev => prev.filter(recipe => recipe._id !== _id));
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 space-x-2 space-y-3">
        {!!recipes.length && recipes.map(recipe => (
          <RecipeCard recipe={recipe} key={recipe._id} onDeleted={onDeleted} />
        ))}
      </div>
      {page != 1 && <Pagination links={links} page={page} />}
    </>
  );
}
