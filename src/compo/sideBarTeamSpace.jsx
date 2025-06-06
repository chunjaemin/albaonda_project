import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useSidebarStateStore, useCurrentSpaceNameStore } from '../js/store';
import '../App.css';

export default function SideBarTeamSpace({ isOpen, onClose, onShowMyInfo }) {
  const navigate = useNavigate();
  const setSelectedTeamName = useCurrentSpaceNameStore(state => state.setName);
  const selectedTeamName = useCurrentSpaceNameStore(state => state.name);

  const [teams, setTeams] = useState([
    { id: 1, icon: '천', color: 'bg-gray-300', name: '천재민 개인공간', editing: false },
    { id: 2, icon: '맘', color: 'bg-yellow-300', name: '맘스터치 팀공간', editing: false },
    { id: 3, icon: '버', color: 'bg-green-300', name: '버거킹 팀공간', editing: false }
  ]);

  const [editInputs, setEditInputs] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setTeams(prev => prev.map(team => ({ ...team, editing: false })));
      setEditInputs({});
      setIsAdding(false);
      setNewTeamName('');
    }
  }, [isOpen]);

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

  const handleTeamClick = (team) => {
    setSelectedTeamName(team.name);

    if (team.id === 1) navigate('/home/schedule');
    else navigate('/teamspace/teamschedule');

    onClose();
  };
  return (
    <div className={`absolute top-0 left-0 w-[260px] h-full bg-white shadow-[inset_-2px_0_4px_rgba(0,0,0,0.05)] border-r border-gray-200 z-50 transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

      {/* 프로필 상단 */}
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
            천
          </div>
          <div className="flex flex-col text-sm">
            <span className="text-gray-800 font-semibold">천재민</span>
            <span className="text-gray-500 text-xs">chunjaemin@naver.com</span>
            <button onClick={onShowMyInfo} className="text-blue-500 hover:underline text-xs mt-1 text-left">내 정보 &gt;</button>
          </div>
        </div>
      </div>

      {/* 팀 목록 */}
      <div className="p-4 flex flex-col gap-2">
        {teams.map(team => (
          <div
            key={team.id}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition cursor-pointer hover:bg-gray-100 ${selectedTeamName === team.name ? 'bg-blue-50 font-semibold' : ''}`}
            onClick={() => handleTeamClick(team)}
          >
            <div className={`w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold ${team.color}`}>
              {team.icon}
            </div>
            {team.editing ? (
              <>
                <input
                  value={editInputs[team.id] || ''}
                  onChange={e => setEditInputs(prev => ({ ...prev, [team.id]: e.target.value }))}
                  onKeyDown={e => e.key === 'Enter' && saveEdit(team.id)}
                  className="border px-2 py-1 text-sm w-32 rounded"
                />
                <button onClick={() => saveEdit(team.id)} className="text-blue-500 text-sm hover:underline">확인</button>
              </>
            ) : (
              <span className="flex-1 truncate">
                {team.name}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 새 팀 추가 */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        {isAdding ? (
          <div className="flex items-center gap-2">
            <input
              value={newTeamName}
              onChange={e => setNewTeamName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addNewTeam()}
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
