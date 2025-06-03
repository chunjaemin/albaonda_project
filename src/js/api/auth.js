export const loginWithGoogle = async (id_token) => {
  const res = await fetch('http://localhost:5000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ id_token }),
    credentials: 'include', // 💡 세션 쿠키 유지 필수!
  });

  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || '로그인 실패');
  }

  return res.json(); // {"success": true, "user": {...}}
};