import { useState } from 'react';
import '../App.css';
import '../css/keyframe.css'; // 커스텀 애니메이션 CSS 임포트

import { GoogleLogin } from '@react-oauth/google';
import NaverLoginButton from '../compo/naverLoginButton'
import KakaoLoginButton from "../compo/kakaoLoginButton";

import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { useAuthStore } from '../js/store';

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser)
  const [isAnimating, setIsAnimating] = useState(false);

  const handleLogin = (credentialResponse) => {
    const userData = jwtDecode(credentialResponse.credential);
    setIsAnimating(true); // 로딩 애니메이션 시작

    //애니메이션이 끝날 때 까지 잠깐 기다려주기
    setTimeout(() => {
      setIsAnimating(false); // 안 보여도 무방하긴 함
      setUser({
        id: "user001",
        name: userData.name,
        email: userData.email,
        teams: ["team001", "team002"]
      })
      navigate('/home/schedule');
    }, 2000); // 모든 글자 애니메이션이 2초 내외로 끝나므로 약간 여유 있게
  };

  return (
    <div className="relative w-full h-screen bg-gradient-animation overflow-hidden">
      {isAnimating && (
        <div className="absolute inset-0 z-50 bg-white bg-opacity-80 flex flex-col items-center justify-center perspective">
          <div className="flex text-5xl font-bold mb-4">
            {'Albaonda'.split('').map((char, idx) => (
              <div key={idx} className="flip-container">
                <div className={`flipper delay-${idx}`}>
                  <div className="front">{char}</div>
                  <div className="back">{char}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ 추가: 로딩 바 */}
          <div className="w-[60%] aspect-[25/1] bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 animate-loadingBar"></div>
          </div>
        </div>
      )}

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
            <p className="text-gray-500 text-sm mt-1">일정을 효율적으로 관리하고 급여 관리를 간편하게 해보세요!</p>
          </div>

          {/* Toggle Tabs */}
          <div className="flex mb-6">
            <button className="flex-1 py-2 text-sm font-medium border-b-2 border-blue-500">Log In</button>
            <button className="flex-1 py-2 text-sm font-medium text-gray-500">Sign Up</button>
          </div>

          <div className='m-4 cursor-pointer'>
            <GoogleLogin
              ux_mode="popup"
              onSuccess={credentialResponse => {
                handleLogin(credentialResponse);
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
            <NaverLoginButton />
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
