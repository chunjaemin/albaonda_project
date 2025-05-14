import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'

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

import './App.css'

function App() {
  return (
    <>
      <div className="relative w-full sm:max-w-[600px] mx-auto overflow-x-hidden">
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
  
          <Route path="/home" element={<Home />}>
            <Route path="schedule" element={<Schedule />} />
            <Route path="salary" element={<Salary />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<div>홈 내부 - 페이지 없음</div>} /> {/* 홈 안에서만 catch-all */}
          </Route>

          <Route path="/teamspace" element={<TeamSpace />}>
            <Route path="teamschedule" element={<TeamSchedule />} />
            <Route path="userinfo" element={<UserInfo />} />
            <Route path="noticeboard" element={<NoticeBoard />} />
            <Route path="*" element={<div>팀스페이스 내부 - 페이지 없음</div>} /> {/* teamspace 안에서만 catch-all */}
          </Route>

      {/* 전체 앱용 fallback은 맨 마지막으로 */}
          <Route path="*" element={<div>그 외</div>} />
        </Routes>

      </div>

    </>
  )
}

export default App
