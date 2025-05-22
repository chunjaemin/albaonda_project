import { useSidebarStateStore } from '../js/store';
import '../App.css';

export default function SideBar() {
  const isSidebar = useSidebarStateStore((state) => state.isSidebar);
  const teamArr = [
    { name: "천재민 개인공간", initial: "천", color: "bg-gray-300" },
    { name: "맘스터치 팀공간", initial: "맘", color: "bg-yellow-400" },
    { name: "버거킹 팀공간", initial: "벅", color: "bg-red-300" },
  ];

  return (
    <div
      className={`
        absolute top-0 left-0 w-[60%] h-full bg-gray-100 z-100
        transition-all duration-300 ease-in-out
        ${isSidebar ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* 프로필 상단 */}
      <div className="flex flex-col items-start p-4 gap-2">
        <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg">
          천
        </div>
        <div className="text-sm text-gray-800">chun4582@naver.com</div>
        <div className="text-sm text-blue-600 underline cursor-pointer">내 정보 &gt;</div>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-300 my-2" />

      {/* 팀 공간 목록 */}
      <div className="px-4 flex flex-col gap-3">
        {teamArr.map((team, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className={`w-5 h-5 text-xs rounded-sm text-white flex items-center justify-center font-semibold ${team.color}`}>
              {team.initial}
            </span>
            <span>{team.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
