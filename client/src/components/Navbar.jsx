import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../auth/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">DxResumee</Link>
      <div className="space-x-4">
        <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>
        {user ? (
          <button onClick={logout} className="text-red-500 hover:text-red-600 font-semibold">Logout</button>
        ) : (
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
