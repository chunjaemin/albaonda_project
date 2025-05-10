import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'

import Landing from './compo/landing.jsx'
import Login from './compo/login.jsx'

import Home from './compo/home.jsx'
import Schedule from './compo/schedule.jsx'
import Salary from './compo/salary.jsx'
import Settings from './compo/settings.jsx'

import './App.css'

function App() {
  return (
    <>
      <div className="relative w-full sm:max-w-[600px] mx-auto overflow-x-hidden">
        <Routes>
          <Route path="/landing" element={<Landing></Landing>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/home" element={<Home></Home>}>
            <Route path="schedule" element={<Schedule></Schedule>}></Route>
            <Route path="salary" element={<Salary></Salary>}></Route>
            <Route path="settings" element={<Settings></Settings>}></Route>
          </Route>
          <Route path="/*" element={<div>그 외</div>}></Route>
        </Routes>
      </div>

    </>
  )
}

export default App
