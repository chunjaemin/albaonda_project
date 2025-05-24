import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import kakao_logo from '../assets/kakao_logo.png'

export default function KakaoLoginButton() {
    const kakaoAppKey = "2021c041cfaf03777f82835e12b9f9c4"; // 카카오 JavaScript 키
    const navigate = useNavigate();
    useEffect(() => {
        // SDK 스크립트 추가
        if (!window.Kakao) {
            const script = document.createElement('script');
            script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
            script.async = true;
            script.onload = () => {
                window.Kakao.init(kakaoAppKey);
                console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
            };
            document.head.appendChild(script);
        } else if (!window.Kakao.isInitialized()) {
            window.Kakao.init(kakaoAppKey);
        }
    }, [kakaoAppKey]);

    const handleLogin = () => {
        if (!window.Kakao) return;

        window.Kakao.Auth.login({
            scope: 'profile_nickname',
            success: function (authObj) {
                console.log('카카오 로그인 성공:', authObj);
                window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: function (res) {
                        console.log('사용자 정보:', res);
                        // 필요 시: 서버로 전달
                        navigate("/home/schedule");
                    },
                    fail: function (error) {
                        console.error('사용자 정보 요청 실패:', error);
                    },
                });
            },
            fail: function (err) {
                console.error('카카오 로그인 실패:', err);
            },
        });
    };

    return (
        <button
            onClick={handleLogin}
            className="relative w-full aspect-[10/1] bg-[#FEE500] text-[#191600] font-semibold rounded-md text-sm flex items-center justify-center cursor-pointer"
        >
            <img
                src={kakao_logo}
                alt="카카오"
                className="h-[100%] aspect-square absolute top-0 left-0 rounded-md"
            />
            카카오로 로그인
        </button>
    );
}