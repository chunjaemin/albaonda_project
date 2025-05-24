import { useState } from 'react';
import '../App.css';
import '../css/keyframe.css'; // 커스텀 애니메이션 CSS 임포트

import { GoogleLogin } from '@react-oauth/google';
import NaverLoginButton from '../compo/naverLoginButton'
import KakaoLoginButton from "../compo/kakaoLoginButton";

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
            <h1 className="text-2xl font-bold">알바온다 소셜 로그인</h1>
            <p className="text-gray-500 text-sm">일정을 효율적으로 관리하고 급여 관리를 간편하게 해보세요!</p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex mb-6">
            <button className="flex-1 py-2 text-sm font-medium border-b-2 border-blue-500">Log In</button>
            <button className="flex-1 py-2 text-sm font-medium text-gray-500">Sign Up</button>
          </div>

          <div className='m-4 cursor-pointer'>
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
            />
          </div>
          <div className='m-4'>
            <KakaoLoginButton />
          </div>
          <div className='m-4'>
            <NaverLoginButton/>
          </div>

          {/* Form */}
          <div className="space-y-4">

            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
