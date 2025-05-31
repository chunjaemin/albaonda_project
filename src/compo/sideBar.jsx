import { useSidebarStateStore, useCurrentSpaceNameStore, useCurrentTeamIdStore } from '../js/store';
import { dummyUserData } from '../js/dummyUserData';
import { dummyTeamSchedule1, dummyTeamSchedule2 } from '../js/dummyTeamData';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SideBar({ onShowMyInfo }) {
  const { isSidebar } = useSidebarStateStore();
  const { setName } = useCurrentSpaceNameStore();
  const { setId } = useCurrentTeamIdStore();

  const [newTeamName, setNewTeamName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const navigate = useNavigate();
  const userData = dummyUserData;
  const teamData1 = dummyTeamSchedule1;
  const teamData2 = dummyTeamSchedule2;

  const color = ["bg-gray-300", "bg-yellow-300", "bg-green-300"];

  const teamArr = [
    {
      name: `${userData.name} 개인공간`,
      initial: userData.name[0],
      color: color[0],
      link: null,
    },
    {
      name: `${teamData1.title}`,
      initial: teamData1.title[0],
      color: color[1],
      teamId: teamData1.teamId,
    },
    {
      name: `${teamData2.title}`,
      initial: teamData2.title[0],
      color: color[2],
      teamId: teamData2.teamId,
    },
  ];

  const handleClick = (team) => {
    if (!team.teamId) {
      setName(team.name);
      navigate("/home/schedule");
    } else {
      setName(team.name);
      setId(team.teamId);
      navigate("/teamspace/teamSchedule");
    }
  };

  const addNewTeam = () => {
    const trimmed = newTeamName.trim();
    if (!trimmed) return;
    const colors = ['bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-purple-400'];
    const newTeam = {
      id: Date.now(),
      icon: trimmed[0],
      color: colors[Math.floor(Math.random() * colors.length)],
      name: trimmed,
      editing: false,
    };
    setTeams((prev) => [...prev, newTeam]);
    setNewTeamName('');
    setIsAdding(false);
  };

  return (
    <div className={`absolute top-0 left-0 w-[260px] h-full bg-white shadow-[inset_-2px_0_4px_rgba(0,0,0,0.05)] border-r border-gray-200 z-50 transition-transform ${isSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
            {userData.name[0]}
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-gray-800 font-semibold">{userData.name}</span>
            <span className="text-gray-500 text-xs">{userData.email}</span>
            <button onClick={onShowMyInfo} className="text-blue-500 hover:underline text-xs mt-1 text-left">내 정보 &gt;</button>
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        {teamArr.map((team, index) => (
          <div
            key={index}
            onClick={() => handleClick(team)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition cursor-pointer hover:bg-gray-100 ${
              team.name === userData.name + ' 개인공간' ? 'bg-blue-50 font-medium' : ''
            }`}
          >
            <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold ${team.color}`}>
              {team.initial}
            </div>
            <span className="truncate">{team.name}</span>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 mt-auto">
        {isAdding ? (
          <div className="flex items-center gap-2">
            <input
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addNewTeam()}
              className="border border-gray-300 text-sm px-2 py-1 rounded w-full"
              placeholder="새 팀 이름"
              autoFocus
            />
            <button onClick={addNewTeam} className="text-blue-500 hover:underline text-sm">확인</button>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-1 text-blue-500 text-sm hover:underline"
          >
            <PlusIcon className="w-4 h-4" />
            새 팀 만들기
          </button>
        )}
      </div>
    </div>
  );
}
