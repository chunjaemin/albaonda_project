import { useState } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useSidebarStateStore } from '../js/store';
import { useCurrentSpaceNameStore } from '../js/teamStore'; // ✅ teamStore에서 팀 이름 가져오기
import '../App.css';

export default function TopBarTeamSpace() {
  const { doSwitch } = useSidebarStateStore(); // 사이드바 토글 함수
  const { name: selectedTeamName, setName: setSelectedTeamName } = useCurrentSpaceNameStore();

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState('');
  const isAdmin = true; // ✅ 관리자 여부 (실제로는 로그인 정보 기반 상태로 대체)

  const handleSave = () => {
    if (tempName.trim()) {
      setSelectedTeamName(tempName.trim());
    }
    setIsEditing(false);
  };

  return (
    <div className="relative w-full aspect-[10/1] flex items-center bg-gray-100/70">
      {/* 햄버거 버튼 */}
      <div className="relative w-5 ml-4 cursor-pointer flex flex-col justify-center gap-[4.5px]" onClick={doSwitch}>
        <div className="w-full h-[2px] bg-black "></div>
        <div className="w-full h-[2px] bg-black "></div>
        <div className="w-full h-[2px] bg-black "></div>
      </div>

      {/* 팀 이름 또는 수정 입력 */}
      <div className="flex items-center gap-2 flex-1">
        {isEditing ? (
          <>
            <input
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
              }}
              className="border px-2 py-1 rounded text-sm"
              autoFocus
            />
            <button onClick={handleSave} className="text-blue-500 text-sm hover:underline">확인</button>
          </>
        ) : (
          <>
            <span className="text-lg font-medium truncate ml-4">{selectedTeamName || '맘스터치 팀공간'}</span>
            {isAdmin && (
              <PencilIcon
                className="w-5 h-5 text-gray-500 cursor-pointer hover:text-black"
                onClick={() => {
                  setTempName(selectedTeamName);
                  setIsEditing(true);
                }}
                title="팀 이름 수정"
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
