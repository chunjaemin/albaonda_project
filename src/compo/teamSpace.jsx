// ✅ TeamSpace.jsx (상위 전체 레이아웃 역할)
import { useSidebarStateStore } from '../js/store.js';
import { Outlet } from "react-router-dom";
import TopBar from './topBar.jsx';
import SideBar from './sideBar.jsx';
import BottomNavbarTeamSpace from './bottomNavbarTeamSpace.jsx';

import '../App.css';

export default function TeamSpace() {
  const { isSidebar, doSwitch } = useSidebarStateStore();

  return (
    <div className="relative min-h-screen">
      {/* 사이드바 오버레이 */}
      {isSidebar && (
        <div
          className="absolute inset-0 bg-black/30 z-20"
          onClick={doSwitch}
        ></div>
      )}

      {/* 사이드바 (항상 페이지 전체 기준) */}
      <SideBar />

      {/* 페이지 주요 콘텐츠 */}
      <div className="flex flex-col min-h-screen">
        <TopBar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <BottomNavbarTeamSpace />
      </div>
    </div>
  );
}
