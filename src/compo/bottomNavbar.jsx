import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// outline 아이콘 (테두리)
import {
  CalendarIcon as CalendarOutline,
  CalculatorIcon as CalculatorOutline,
  Cog6ToothIcon as Cog6ToothOutline,
} from "@heroicons/react/24/outline";

// solid 아이콘 (채워진 아이콘)
import {
  CalendarIcon as CalendarSolid,
  CalculatorIcon as CalculatorSolid,
  Cog6ToothIcon as Cog6ToothSolid,
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
      path: "/home/schedule",
      label: "시간표",
      OutlineIcon: CalendarOutline,
      SolidIcon: CalendarSolid,
    },
    {
      path: "/home/salary",
      label: "급여 계산",
      OutlineIcon: CalculatorOutline,
      SolidIcon: CalculatorSolid,
    },
    {
      path: "/home/settings",
      label: "설정",
      OutlineIcon: Cog6ToothOutline,
      SolidIcon: Cog6ToothSolid,
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
        const colorClass = isActive ? "text-blue-500" : "text-gray-500";
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
