import { useState } from 'react'
import { useSidebarStateStore } from '../js/store';


import { Outlet } from "react-router-dom";
import TopBar from './topBar.jsx'
import BottomNavbar from './bottomNavbar.jsx'
import SideBar from './sideBar.jsx'
import MyInfoDetail from './myInfoDetail.jsx';


import '../App.css'

export default function Home() {
  const { isSidebar, doSwitch } = useSidebarStateStore();
  const [showMyInfo, setShowMyInfo] = useState(false); // ✅ 모달 상태 추가

  return (
    <>
      {isSidebar && (
        <div
          className="absolute top-0 left-0 z-20 w-full h-full bg-black/30"
          onClick={doSwitch}></div>
      )}
      <TopBar></TopBar>
      <SideBar
        onShowMyInfo={() => setShowMyInfo(true)} // ✅ 모달 열기 콜백
      ></SideBar>
      <Outlet />
      <BottomNavbar></BottomNavbar>

      {/* 내 정보 모달 */}
      {showMyInfo && (
        <MyInfoDetail
          isOpen={showMyInfo}
          onClose={() => setShowMyInfo(false)}
        />
      )}
    </>
  )
}