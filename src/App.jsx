import { useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'

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

import './App.css'

function App() {
  return (
    <>
      <div className="relative w-full sm:max-w-[600px] mx-auto overflow-x-hidden">
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
  
          <Route path="/home" element={<Home />}>
            <Route index element={<Navigate to="/home/schedule" replace />} />
            <Route path="schedule" element={<Schedule />} />
            <Route path="salary" element={<Salary />} />
            <Route path="settings" element={<Settings />} />
            <Route path="calResult" element={<CalResult></CalResult>} /> 
            <Route path="*" element={<Navigate to="/home/schedule" replace />} />
          </Route>

          <Route path="/teamspace" element={<TeamSpace />}>
            <Route path="teamschedule" element={<TeamSchedule />} />
            <Route path="userinfo" element={<UserInfo />} />
            <Route path="noticeboard" element={<NoticeBoard />} />
            <Route path="*" element={<Navigate to="/teamspace/teamschedule" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/home/schedule" replace />} />
        </Routes>

      </div>

    </>
  )
}

export default App
