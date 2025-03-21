import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import VerifyOtp from './pages/VerifyOtp';
import GuestRoute from './components/GuestRoute';
import ResumeCreatePage from './pages/ResumeCreatePage';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/login" element={
            <GuestRoute>
              <Login />
            </GuestRoute>} 
          />
          <Route path="/signup" element={
            <GuestRoute>
              <Signup />
            </GuestRoute>} 
          />
          <Route path="/verify" element={
            <GuestRoute>
              <VerifyOtp />
            </GuestRoute>} 
          />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>} 
          />
          <Route path="/resume/create" element={<PrivateRoute><ResumeCreatePage /></PrivateRoute>} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
