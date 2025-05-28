import { useSidebarStateStore } from '../js/store';
import { useCurrentSpaceNameStore } from '../js/teamStore'; // ✅ teamStore에서 팀 이름 가져오기
import '../App.css';

export default function TopBarTeamSpace() {
  const { doSwitch } = useSidebarStateStore(); // 사이드바 토글 함수
  const selectedTeamName = useCurrentSpaceNameStore(state => state.name); // 팀 이름 상태

  return (
    <div className="relative w-full aspect-[10/1] flex items-center border-b border-gray-300">
      {/* 햄버거 버튼 */}
      <div className="relative w-[5%] ml-4 cursor-pointer" onClick={doSwitch}>
        <div className="w-full aspect-[8/1] bg-black"></div>
        <div className="w-full aspect-[8/1] bg-black mt-1"></div>
        <div className="w-full aspect-[8/1] bg-black mt-1"></div>
      </div>

      {/* 선택된 팀 이름 */}
      <div className="m-4">{selectedTeamName || '맘스터치 팀공간'}</div>
    </div>
  );
}
