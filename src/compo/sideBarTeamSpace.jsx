import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { PencilIcon } from "@heroicons/react/24/outline";

export default function SideBarTeamSpace({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [teams, setTeams] = useState([
    { id: 1, icon: '친', color: 'bg-gray-400', name: '김영중 개인공간', editing: false },
    { id: 2, icon: '맘', color: 'bg-yellow-400', name: '맘스터치 팀공간', editing: false },
    { id: 3, icon: '버', color: 'bg-red-400', name: '버거킹 팀공간', editing: false }
  ]);

  const [editInput, setEditInput] = useState('');

  const toggleEdit = (id, currentName) => {
    setEditInput(currentName);
    setTeams(prev =>
      prev.map(team =>
        team.id === id ? { ...team, editing: true } : team
      )
    );
  };

  const saveEdit = (id) => {
    setTeams(prev =>
      prev.map(team =>
        team.id === id ? { ...team, name: editInput, editing: false } : team
      )
    );
  };

  return (
    <div
      className={`
        absolute top-0 left-0 h-full w-[280px] bg-white z-30 shadow-md
        transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* 사용자 정보 */}
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-400 rounded-full text-white flex items-center justify-center font-bold">김</div>
          <div>
            <div className="text-sm font-medium">kimyoungjong@naver.com</div>
            <div className="text-xs text-blue-500 cursor-pointer hover:underline">내 정보 &gt;</div>
          </div>
        </div>
      </div>

      {/* 팀 목록 */}
      <div className="p-4 space-y-3">
        {teams.map(team => (
          <div key={team.id} className="flex items-center gap-2">
            <div className={`w-6 h-6 ${team.color} text-white text-xs rounded flex items-center justify-center`}>
              {team.icon}
            </div>

            {team.editing ? (
              <>
                <input
                  value={editInput}
                  onChange={e => setEditInput(e.target.value)}
                  className="border px-1 py-0.5 text-sm w-32 rounded"
                />
                <button onClick={() => saveEdit(team.id)} className="text-blue-500 text-sm hover:underline cursor-pointer">확인</button>
              </>
            ) : (
              <>
                <span
                  className="text-sm flex-1 truncate cursor-pointer hover:underline"
                  onClick={() => {
                    if (team.id === 1) navigate('/home/schedule');
                    onClose();
                  }}
                >
                  {team.name}
                </span>
                <button
                  onClick={() => toggleEdit(team.id, team.name)}
                  className="hover:text-gray-700"
                >
                  <PencilIcon className="h-5 w-5 text-gray-500 cursor-pointer" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
