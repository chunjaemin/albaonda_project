import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CalendarIcon,
  ClipboardIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import "../App.css";

export default function BottomNavbarTeamSpace() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/teamspace/teamSchedule", label: "시간표", Icon: CalendarIcon },
    { path: "/teamspace/noticeBoard", label: "게시판", Icon: ClipboardIcon },
    { path: "/teamspace/userInfo", label: "사용자 정보", Icon: UserGroupIcon },
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
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[80px] bg-white flex items-center justify-around shadow-md border-t border-gray-300 transition-transform duration-300 z-10 ${
        showNavbar ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {navItems.map(({ path, label, Icon }) => {
        const isActive = currentPath === path;
        const colorClass = isActive ? "text-red-400" : "text-gray-500";

        return (
          <div
            key={path}
            className="w-[80px] h-full flex flex-col items-center justify-center cursor-pointer"
            onClick={() => navigate(path)}
          >
            <Icon className={`h-10 w-10 mb-1 ${colorClass}`} />
            <p className={`text-xs ${colorClass}`}>{label}</p>
          </div>
        );
      })}
    </div>
  );
}
