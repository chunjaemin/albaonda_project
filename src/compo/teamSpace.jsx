import { useState } from 'react';
import { useSidebarStateStore } from '../js/store.js';
import { Outlet } from 'react-router-dom';
import TopBarTeamSpace from './topBarTeamSpace.jsx';
import BottomNavbarTeamSpace from './bottomNavbarTeamSpace.jsx';
import SideBarTeamSpace from './sideBarTeamSpace.jsx';
import MyInfoDetail from './myInfoDetail.jsx';

import '../App.css';

export default function TeamSpace() {
  const { isSidebar, doSwitch ,selectedTeamName} = useSidebarStateStore();
  const [showMyInfo, setShowMyInfo] = useState(false); // ✅ 모달 상태 추가

  return (
    <div className="relative min-h-screen">
      {/* 사이드바 오버레이 (모달과 별개) */}
      {isSidebar && (
        <div
          className="absolute inset-0 bg-black/30 z-20"
          onClick={doSwitch}
        ></div>
      )}

      {/* 사이드바 */}
      <SideBarTeamSpace
        isOpen={isSidebar}
        onClose={doSwitch}
        onShowMyInfo={() => setShowMyInfo(true)} // ✅ 모달 열기 콜백
      />

      {/* 전체 레이아웃 */}
      <div className="flex flex-col min-h-screen">
        <TopBarTeamSpace />
        <div className="flex-grow pb-[80px]">
          <Outlet />
        </div>
        <BottomNavbarTeamSpace />
      </div>
      

      {/* 내 정보 모달 */}
      {showMyInfo && (
        <MyInfoDetail
          isOpen={showMyInfo}
          onClose={() => setShowMyInfo(false)}
        />
      )}
    </div>
  );
}