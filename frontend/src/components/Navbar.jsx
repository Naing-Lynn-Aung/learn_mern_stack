import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";
import axios from "../helpers/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const { dispatch, user } = useContext(AuthContext);
  const logout = async () => {
    const res = await axios.post('/api/users/logout');
    if (res.status === 200) {
      dispatch({ type: 'LOGIN' });
      navigate('/login');
    }
  };

  return (
    <nav className="flex justify-between items-center p-5 bg-white">
      <div>
        <h1 className="font-bold text-2xl text-orange-400">Recipicity</h1>
      </div>
      <ul className="flex space-x-10">
        {!!user && <li> <Link to="/" className="hover:text-orange-400">{user.name}</Link> </li>}
        <li> <Link to="/" className="hover:text-orange-400">Home</Link> </li>
        <li> <Link to="/about" className="hover:text-orange-400">About</Link> </li>
        <li> <Link to="/contact" className="hover:text-orange-400">Contact</Link> </li>
        <li> <Link to="/recipes/create" className="hover:text-orange-400">Create Recipe</Link> </li>

        {!user && (
          <>
            <li> <Link to="/login" className="hover:text-orange-400">Login</Link> </li>
            <li> <Link to="/signup" className="hover:text-orange-400">Register</Link> </li>
          </>
        )}
        {!!user && <li> <button onClick={logout} className="hover:text-orange-400">Logout</button> </li>}
      </ul>
    </nav>
  );
}
