'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import {toast} from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth(); // Use the login function from AuthContext
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('/api/admin/login', { email, password });
      if (response.status === 200) {
        toast.success("Login Successful")
        const { token } = response.data;
        login(token); // Call login function with the token
        router.push('/'); // Redirect after successful login
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      toast.error("Login Failure")
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-[15px]">
      <div className="bg-white w-full flex flex-col gap-[40px]">
        <h1 className="text-[32px] font-[700] leading-[38.4px] text-center">Login</h1>
        <form className="flex flex-col gap-[40px]" onSubmit={handleLogin}>
          <div className="flex flex-col gap-[16px]">
            <input
              type="email"
              placeholder="Email"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-[10px] px-[13px] bg-[#EEF3F7] rounded-[5px] text-[14px] font-[400] leading-[19.6px] placeholder-[#00000066]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <div className="text-center">
            <a href="#" className="text-[16px] font-[400] leading-[16px] text-[#000000] hover:underline">
              Forgot Password
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-[#000000] text-[#ffffff] text-[14px] font-[700] leading-[19.6px] px-[16px] py-[10px] rounded-[5px] gap-[10px] transition ease-out duration-300 hover:opacity-[0.8]"
          >
            Login
          </button>
        </form>
      </div>
      <a href="#" className="flex font-[400] text-[16px] leading-[16px] mb-[127px] my-[110px]">
        www.<span className="text-[#E31F1F] font-[700]">missing</span>activists.org
      </a>
    </div>
  );
};

export default Login;
