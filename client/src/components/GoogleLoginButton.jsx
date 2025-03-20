import { FcGoogle } from 'react-icons/fc';

const GoogleLoginButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5050/api/auth/google';
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
    >
      <FcGoogle className="text-xl mr-2" />
      <span className="text-sm font-medium">Continue with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
