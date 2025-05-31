import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// outline 아이콘 (테두리)
import {
  CalendarIcon as CalendarOutline,
  ClipboardIcon as ClipboardOutline,
  UserGroupIcon as UserGroupOutline,
} from "@heroicons/react/24/outline";

// solid 아이콘 (채워진 아이콘)
import {
  CalendarIcon as CalendarSolid,
  ClipboardIcon as ClipboardSolid,
  UserGroupIcon as UserGroupSolid,
} from "@heroicons/react/24/solid";

import "../App.css";

export default function BottomNavbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      path: "/teamspace/teamSchedule",
      label: "시간표",
      OutlineIcon: CalendarOutline,
      SolidIcon: CalendarSolid,
    },
    {
      path: "/teamspace/noticeBoard",
      label: "게시판",
      OutlineIcon: ClipboardOutline,
      SolidIcon: ClipboardSolid,
    },
    {
      path: "/teamspace/userInfo",
      label: "사용자 정보",
      OutlineIcon: UserGroupOutline,
      SolidIcon: UserGroupSolid,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // 아래로 스크롤 시 숨김
      } else {
        setShowNavbar(true); // 위로 스크롤 시 다시 표시
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[80px] bg-white flex items-center justify-center gap-[90px] shadow-md border-t border-gray-300 transition-transform duration-300 z-10
      ${showNavbar ? "translate-y-0" : "translate-y-full"}`}
    >
      {navItems.map(({ path, label, OutlineIcon, SolidIcon }) => {
        const isActive = currentPath === path;
        const colorClass = isActive ? "text-green-400" : "text-gray-500";
        const Icon = isActive ? SolidIcon : OutlineIcon;

        return (
          <div
            key={path}
            className="h-[80%] flex flex-col justify-center items-center cursor-pointer"
            onClick={() => navigate(path)}
          >
            <Icon className={`h-[50%] mb-1 ${colorClass}`} />
            <p className={`text-xs ${colorClass}`}>{label}</p>
          </div>
        );
      })}
    </div>
  );
}
