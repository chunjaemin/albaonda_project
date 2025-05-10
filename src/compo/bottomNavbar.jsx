import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { CalendarIcon, CalculatorIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

import "../App.css";


export default function BottomNavbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/home/schedule", label: "시간표", Icon: CalendarIcon },
    { path: "/home/salary", label: "급여 계산", Icon: CalculatorIcon },
    { path: "/home/settings", label: "설정", Icon: Cog6ToothIcon },
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
      {navItems.map(({ path, label, Icon }) => {
        const isActive = currentPath === path;
        const colorClass = isActive ? "text-red-400" : "text-gray-500";

        return (
          <div
            key={path}
            className="h-[80%] flex flex-col justify-center items-center cursor-pointer"
            onClick={() => navigate(path)}
          >
            <Icon className={`h-[60%] mb-1 ${colorClass}`} />
            <p className={`text-xs ${colorClass}`}>{label}</p>
          </div>
        );
      })}
    </div>
  );
}