// src/routes/GuestRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';

const GuestRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  console.log(user)

  if (loading) return null; // or a loading spinner

  // ✅ If user is logged in, redirect them
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  // ✅ Else show the actual route (login/signup)
  return children;
};

export default GuestRoute;
