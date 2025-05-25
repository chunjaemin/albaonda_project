import { useState } from 'react'
import { useSidebarStateStore } from '../js/store';


import { Outlet } from "react-router-dom";
import TopBar from './topBar.jsx'
import BottomNavbar from './bottomNavbar.jsx'
import SideBar from './sideBar.jsx'


import '../App.css'

export default function Home() {
  const { isSidebar, doSwitch } = useSidebarStateStore();

  return (
    <>
      {isSidebar && (
        <div
          className="absolute top-0 left-0 z-20 w-full h-full bg-black/30"
          onClick={doSwitch}></div>
      )}
      <TopBar></TopBar>
      <SideBar></SideBar>
      <Outlet />
      <BottomNavbar></BottomNavbar>
    </>
  )
}