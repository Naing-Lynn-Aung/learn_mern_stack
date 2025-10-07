import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from '../App.jsx';
import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import RecipeForm from '../pages/RecipeForm.jsx';
import SignupForm from '../pages/SignupForm.jsx';
import LoginForm from '../pages/LoginForm.jsx';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext.jsx';

export default function Index() {
  const { user } = useContext(AuthContext);
  const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/',
          element: user ? <Home /> : <Navigate to={'/login'} />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/contact',
          element: <Contact />
        },
        {
          path: '/recipes/create',
          element: <RecipeForm />
        },
        {
          path: '/recipes/edit/:id',
          element: <RecipeForm />
        },
        {
          path: '/signup',
          element: !user ? <SignupForm /> : <Navigate to='/' />
        },
        {
          path: '/login',
          element: !user ? <LoginForm /> : <Navigate to='/' />
        }
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
  );
}
