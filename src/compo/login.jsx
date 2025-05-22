import { useState } from 'react';
import '../App.css';
import '../css/keyframe.css'; // 커스텀 애니메이션 CSS 임포트
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate(); 

  const handleLogin = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUserInfo(credentialResponse);
    console.log(decoded);
  };

  return (
    <div className="relative w-full h-screen bg-gradient-animation overflow-hidden">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 grid grid-cols-[repeat(auto-fill,minmax(40px,1fr))] grid-rows-[repeat(auto-fill,40px)] gap-[2px] z-0">
        {Array.from({ length: 300 }).map((_, i) => (
          <div key={i} className="bg-white/30 border border-white/20"></div>
        ))}
      </div>

      {/* Login Content */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Get Started now</h1>
            <p className="text-gray-500 text-sm">Create an account or log in to explore about our app</p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex mb-6">
            <button className="flex-1 py-2 text-sm font-medium border-b-2 border-blue-500">Log In</button>
            <button className="flex-1 py-2 text-sm font-medium text-gray-500">Sign Up</button>
          </div>

          <GoogleLogin
            onSuccess={credentialResponse => {
              // console.log(credentialResponse);
              handleLogin(credentialResponse);
              navigate('/home/schedule'); // 로그인 성공 시 홈으로 이동
            }}
            onError={() => {
              console.log('Login Failed');
              alert('Login Failed'); //나중에 지우기 
            }}
          />;

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Loisbecket@gmail.com"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full mt-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-500" /> Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">Forgot Password ?</a>
            </div>

            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all">
              Log In
            </button>
          </div>

          {/* Divider */}
          <div className="text-center text-gray-400 my-4 text-sm">Or login with</div>

          {/* Social Icons */}
          <div className="grid grid-cols-4 gap-4">
            <button className="flex items-center justify-center border rounded p-2"><img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="google" className="w-5 h-5" /></button>
            <button className="flex items-center justify-center border rounded p-2"><img src="https://img.icons8.com/ios-filled/50/3b5998/facebook-new.png" alt="facebook" className="w-5 h-5" /></button>
            <button className="flex items-center justify-center border rounded p-2"><img src="https://img.icons8.com/ios-filled/50/000000/mac-os.png" alt="apple" className="w-5 h-5" /></button>
            <button className="flex items-center justify-center border rounded p-2"><img src="https://img.icons8.com/ios-filled/50/000000/smartphone.png" alt="phone" className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
