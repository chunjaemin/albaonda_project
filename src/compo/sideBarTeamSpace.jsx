import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useSidebarStateStore } from '../js/store';
import '../App.css';

export default function SideBarTeamSpace({ isOpen, onClose, onShowMyInfo }) {
  const navigate = useNavigate();
  const setSelectedTeamName = useSidebarStateStore(state => state.setSelectedTeamName);
  const selectedTeamName = useSidebarStateStore(state => state.selectedTeamName);

  const [teams, setTeams] = useState([
    { id: 1, icon: '천', color: 'bg-gray-400', name: '천재민 개인공간', editing: false },
    { id: 2, icon: '맘', color: 'bg-yellow-400', name: '맘스터치 팀공간', editing: false },
    { id: 3, icon: '버', color: 'bg-red-400', name: '버거킹 팀공간', editing: false }
  ]);

  const [editInputs, setEditInputs] = useState({});

  useEffect(() => {
    if (!isOpen) {
      setTeams(prev => prev.map(team => ({ ...team, editing: false })));
      setEditInputs({});
    }
  }, [isOpen]);

  const toggleEdit = (id, currentName) => {
    setEditInputs(prev => ({ ...prev, [id]: currentName }));
    setTeams(prev => prev.map(team => team.id === id ? { ...team, editing: true } : team));
  };

  const saveEdit = (id) => {
    const newName = editInputs[id];
    setTeams(prev => prev.map(team =>
      team.id === id ? { ...team, name: newName, editing: false } : team
    ));

    const editedTeam = teams.find(team => team.id === id);
    if (editedTeam && editedTeam.name === selectedTeamName) {
      setSelectedTeamName(newName);
    }

    setEditInputs(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div className={`absolute top-0 left-0 h-full w-[280px] bg-white z-30 shadow-md transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-400 rounded-full text-white flex items-center justify-center font-bold">김</div>
          <div>
            <div className="text-sm font-medium">chunjaemin@naver.com</div>
            <div
              className="text-xs text-blue-500 cursor-pointer hover:underline"
              onClick={onShowMyInfo}
            >
              내 정보 &gt;
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {teams.map(team => (
          <div key={team.id} className="flex items-center gap-2">
            <div className={`w-6 h-6 ${team.color} text-white text-xs rounded flex items-center justify-center`}>
              {team.icon}
            </div>

            {team.editing ? (
              <>
                <input
                  value={editInputs[team.id] || ''}
                  onChange={e => setEditInputs(prev => ({ ...prev, [team.id]: e.target.value }))}
                  onKeyDown={e => {
                    if (e.key === 'Enter') saveEdit(team.id);
                  }}
                  className="border px-1 py-0.5 text-sm w-32 rounded"
                />
                <button
                  onClick={() => saveEdit(team.id)}
                  className="text-blue-500 text-sm hover:underline cursor-pointer"
                >
                  확인
                </button>
              </>
            ) : (
              <>
                <span
                  className="text-sm flex-1 truncate cursor-pointer hover:underline"
                  onClick={() => {
                    if (team.id === 1) navigate('/home/schedule');
                    else if (team.id === 2) navigate('/teamspace/teamschedule');
                    setSelectedTeamName(team.name);
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
