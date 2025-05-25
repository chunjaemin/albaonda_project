import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../js/store';

export default function ProtectedRoute({
  children,
  requireLogin = false, //로그인이 요구되는 컴포넌트
  guestOnly = false, //게스트로그인 하는 곳 
  requireRole = null, //이사람 권한 확인  
  redirectTo = '/home/schedule',   // 게스트가 아닐 경우 리다이렉션 해줄 곳 
}) {
  const user = useAuthStore((s) => s.user);

  // 1. 로그인 필요한데 안 되어 있으면 → 로그인 페이지로
  if (requireLogin && !user) return <Navigate to="/login" replace />;

  // 2. 로그인 안 한 사람만 접근 가능한데 로그인 되어 있으면 → 리다이렉트
  if (guestOnly && user) return <Navigate to={redirectTo} replace />;

  // 3. 특정 역할 필요할 때
  if (requireRole && (!user || user.role !== requireRole)) {
    return <Navigate to={redirectTo} replace />;
  }

  // 4. 모두 통과 → 자식 컴포넌트 보여줌(원래의 목적 달성)
  return children;
}