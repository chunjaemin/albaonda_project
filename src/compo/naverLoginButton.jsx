import naver_logo from '../assets/naver_logo.svg'

export default function NaverLoginButton() {
  const handleLogin = () => {
    const clientId = "oDpUJdctuLekdr_Hq6tq";
    const redirectUri = encodeURIComponent("http://localhost:5173/home/schedule");
    const state = Math.random().toString(36).substring(2, 15);
    const loginUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;
    window.location.href = loginUrl;
  };

  return (
    <button
      onClick={handleLogin}
      className="relative w-full aspect-[10/1] bg-[#03C75A] text-white font-semibold rounded-md text-sm flex items-center justify-center gap-2 px-4"
    >
      <img
        src={naver_logo}
        alt="네이버 로고"
        className="h-[100%] aspect-square absolute top-0 left-0"
      />
      네이버로 로그인
    </button>
  );
}
