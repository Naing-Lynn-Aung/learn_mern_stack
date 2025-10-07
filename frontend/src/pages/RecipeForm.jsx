import { useEffect, useState } from 'react';
import plus from '../assets/plus.svg';
import axios from '../helpers/axios';
import Ingredients from '../components/Ingredients';
import { useNavigate, useParams } from 'react-router-dom';

export default function RecipeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        const res = await axios.get('/api/recipes/' + id);
        if (res.status === 200) {
          setTitle(res.data.title);
          setDescription(res.data.description);
          setIngredients(res.data.ingredients);
          setPreview(import.meta.env.VITE_BACKEND_URL + res.data.photo);
        }
      }
    };
    fetchRecipe();
  }, [id]);

  const addIngredient = () => {
    setIngredients(prev => [newIngredient, ...prev]);
    setNewIngredient('');
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const recipe = {
        title,
        description,
        ingredients
      };
      let res;
      if (id) {
        res = await axios.patch('/api/recipes/' + id, recipe);
      } else {
        res = await axios.post('/api/recipes', recipe);
      }
      const formData = new FormData;
      formData.set('photo', file);
      // upload
      const uploadRes = axios.post(`/api/recipes/${res.data._id}/upload`, formData, {
        headers: {
          Accept: "multipart/form-data"
        }
      });
      console.log(uploadRes);

      if (res.status === 200) {
        setLoading(false);
        navigate('/');
      }
    } catch (error) {
      setLoading(false);
      setErrors(Object.keys(error.response.data.errors));
    }
  };

  const upload = (e) => {
    const file = e.target.files[0];
    setFile(file);
    // preview
    const fileReader = new FileReader;
    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className='mx-auto max-w-md border-2 border-white p-4'>
      <h1 className='text-2xl font-bold text-orange-400 text-center mb-5'>Recipe {id ? 'Edit' : 'Create'} Form</h1>
      <form className='space-y-5' onSubmit={submit}>
        <ul className='list-disc pl-3'>
          {!!errors.length && errors.map((err, i) => (
            <li className='text-red-500 text-sm' key={i}>{err} is invalid value</li>
          ))}
        </ul>
        <input type="file" onChange={upload} />
        {!!preview && <img src={preview} />}
        <input type="text" placeholder='Recipe Title' className='w-full p-1' value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea rows="5" placeholder='Recipe Description' className='w-full p-1' value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <div className='flex space-x-2 items-center'>
          <input type="text" placeholder='Recipe Ingredient' className='w-full p-1' value={newIngredient} onChange={(e) => setNewIngredient(e.target.value)} />
          <img src={plus} alt="" className='cursor-pointer' onClick={addIngredient} />
        </div>
        <div>
          <Ingredients ingredients={ingredients} />
        </div>
        <button type='submit' className='w-full px-3 py-1 rounded-full bg-orange-400 text-white flex items-center justify-center'>
          {loading && <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
          {id ? 'Update' : 'Create'} Recipe</button>
      </form>
    </div>
  );
}
