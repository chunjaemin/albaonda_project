import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, PlusIcon } from '@heroicons/react/24/outline'; // ✅ PlusIcon 추가
import { useSidebarStateStore } from '../js/teamStore';
import { useCurrentSpaceNameStore } from '../js/teamStore';
import '../App.css';

export default function SideBarTeamSpace({ isOpen, onClose, onShowMyInfo }) {
  const navigate = useNavigate();
  const setSelectedTeamName = useCurrentSpaceNameStore(state => state.setName);
  const selectedTeamName = useCurrentSpaceNameStore(state => state.name);

  const [teams, setTeams] = useState([
    { id: 1, icon: '천', color: 'bg-gray-400', name: '천재민 개인공간', editing: false },
    { id: 2, icon: '맘', color: 'bg-yellow-400', name: '맘스터치 팀공간', editing: false },
    { id: 3, icon: '버', color: 'bg-red-400', name: '버거킹 팀공간', editing: false }
  ]);
  const [editInputs, setEditInputs] = useState({});
  const [isAdding, setIsAdding] = useState(false); // ✅ 추가 중 상태
  const [newTeamName, setNewTeamName] = useState(''); // ✅ 새 팀 이름

  useEffect(() => {
    if (!isOpen) {
      setTeams(prev => prev.map(team => ({ ...team, editing: false })));
      setEditInputs({});
      setIsAdding(false);
      setNewTeamName('');
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
    setTeams(prev => [...prev, newTeam]);
    setNewTeamName('');
    setIsAdding(false);
  };

  return (
    <div className={`absolute top-0 left-0 h-full w-[280px] bg-white z-30 shadow-md transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-4 border-b">
        {/* 유저 정보 */}
        <div className="flex">
          <div className="flex flex-col">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-400 rounded-full text-white flex items-center justify-center font-bold">천</div>
              <div className="ml-3 text-xl font-medium">천재민</div>
            </div>
            <div className="mt-2">
              <div className="text-xs text-gray-600">chunjaemin@naver.com</div>
              <div className="mt-1 text-xs text-blue-500 cursor-pointer hover:underline" onClick={onShowMyInfo}>내 정보 &gt;</div>
            </div>
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
                  value={editInputs[team.id] || ''}
                  onChange={e => setEditInputs(prev => ({ ...prev, [team.id]: e.target.value }))}
                  onKeyDown={e => {
                    if (e.key === 'Enter') saveEdit(team.id);
                  }}
                  className="border px-1 py-0.5 text-sm w-32 rounded"
                />
                <button onClick={() => saveEdit(team.id)} className="text-blue-500 text-sm hover:underline">확인</button>
              </>
            ) : (
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
            )}
          </div>
        ))}

        {/* 새 팀 추가 UI */}
        {isAdding ? (
          <div className="flex gap-2">
            <input
              value={newTeamName}
              onChange={e => setNewTeamName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addNewTeam()}
              className="border px-2 py-1 text-sm flex-1 rounded"
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
