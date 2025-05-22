import { useSidebarStateStore } from '../js/store.js';
import Schedule from "./schedule";
import { Outlet } from "react-router-dom";
import TopBarTeamSpace from './topBarTeamSpace.jsx';
import BottomNavbarTeamSpace from './bottomNavbarTeamSpace.jsx';
import SideBarTeamSpace from './sideBarTeamSpace.jsx';

import '../App.css';

export default function TeamSchedule() {
  const { isSidebar, doSwitch } = useSidebarStateStore();

  return (
    <div className="relative"> {/* 기준이 되는 부모 요소 */}
      {/* 오버레이 */}
      {isSidebar && (
        <div
          className="fixed top-0 left-0 z-20 w-full h-full bg-black/30"
          onClick={doSwitch}
        ></div>
      )}


      {/* 콘텐츠 */}
      
      <Schedule />
      <Outlet />
      <BottomNavbarTeamSpace />
    </div>
  );
}
