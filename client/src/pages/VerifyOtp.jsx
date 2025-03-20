
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios';
import Input from '../components/Input';
import Button from '../components/Button';

const VerifyOtp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState(location.state?.form.email || '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        await api.post('/auth/verify', { email, otp });
        window.location.href = '/dashboard'
        } catch (err) {
        alert(err.response?.data?.message || 'OTP verification failed');
        }
    };

    const resendOtp = async () => {
        try {
        await api.post('/auth/resend-otp', {email});
        alert('OTP resent!');
        } catch {
        alert('Failed to resend OTP');
        }
    };

    useEffect(() => {
        if (!email) {
          navigate('/register'); // or show an error
        }
      }, [email, navigate]);
    

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
        <form onSubmit={handleSubmit}>
            <Input label="Enter 6-digit OTP" value={otp} onChange={e => setOtp(e.target.value)} />
            <Button type="submit">Verify</Button>
        </form>
        <p className="mt-3 text-sm text-center">
            Didn't get OTP? <button onClick={resendOtp} className="text-blue-600 hover:underline">Resend</button>
        </p>
        </div>
    );
};

export default VerifyOtp;

