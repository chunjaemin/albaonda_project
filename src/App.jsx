import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Landing from './compo/landing.jsx'
import Login from './compo/login.jsx'

import Home from './compo/home.jsx'
import Schedule from './compo/schedule.jsx'
import Salary from './compo/salary.jsx'
import Settings from './compo/settings.jsx'
import TeamSpace from './compo/teamSpace.jsx'
import TeamSchedule from './compo/teamSchedule.jsx'
import UserInfo from './compo/userInfo.jsx'
import NoticeBoard from './compo/noticeBoard.jsx'
import CalResult from './compo/calResult.jsx'

import ProtectedRoute from './compo/protectedRoute.jsx'

import { useCurrentSpaceNameStore } from './js/store'
import { useAuthStore } from './js/store';

import { dummyUserData } from './js/dummyUserData.js'

import './App.css'

function App() {
  const setName = useCurrentSpaceNameStore((s) => s.setName);
  const setUser = useAuthStore((s) => s.setUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setName(dummyUserData.name + ' 개인공간');
  }, []);

  //로컬db jwt토큰 검사 나중에 쓸 일 있을지 모르니 일단 구현만 해놓았음 
  //앱 시작 시 토큰 검사
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setLoading(false);
      return;
    }

    //토큰이 있으면 서버에 유저정보 요청 
    fetch('/api/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setUser(data)) // Zustand에 유저 저장
      .catch(() => localStorage.removeItem('jwt'))
      .finally(() => setLoading(false));
  }, []);

  //로딩컴포넌트 넣는 부분 여차하면 지우기(?)
  if (loading) return <div>로딩 중...</div>;

  return (
    <>
      <div className="relative w-full sm:max-w-[600px] mx-auto overflow-x-hidden font-['Pretendard-Regular']">
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<ProtectedRoute guestOnly={false}><Login /></ProtectedRoute>} />

          <Route path="/home" element={<ProtectedRoute requireLogin={false}><Home /></ProtectedRoute>}>
            <Route index element={<Navigate to="/home/schedule" replace />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="salary" element={<Salary />} />
            <Route path="settings" element={<Settings />} />
            <Route path="calResult" element={<CalResult></CalResult>} />
            <Route path="*" element={<Navigate to="/home/schedule" replace />} />
          </Route>

          <Route path="/teamspace" element={<ProtectedRoute requireLogin={false}><TeamSpace /></ProtectedRoute>}>
            <Route path="teamschedule" element={<TeamSchedule />} />
            <Route path="userinfo" element={<UserInfo />} />
            <Route path="noticeboard" element={<NoticeBoard />} />
            <Route path="*" element={<Navigate to="/teamspace/teamschedule" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/landing" replace />} />
        </Routes>

      </div>

    </>
  )
}

export default App
