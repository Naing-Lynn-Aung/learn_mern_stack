import axios from '../helpers/axios';
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/authContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { dispatch } = useContext(AuthContext);

  const login = async (e) => {
    try {
      setError(null);
      e.preventDefault();
      const data = {
        email,
        password
      };
      const res = await axios.post('/api/users/login', data, { withCredentials: true });
      if (res.status === 200) {
        dispatch({ type: 'LOGIN', payload: res.data.user });
        navigate('/');
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={login}>
        <h1 className="text-2xl font-bold text-center">Register Form</h1>
        {!!error && <p className="text-red-500 text-md italic my-3">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Login
          </button>
          <Link to='/signup' className="inline-block align-baseline font-bold text-sm text-orange-500 hover:text-orange-800">
            Register Here
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
}
