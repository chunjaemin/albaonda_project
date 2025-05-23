import { useSidebarStateStore, useCurrentSpaceNameStore, useCurrentTeamIdStore } from '../js/store';
import { dummyUserData } from '../js/dummyUserData';
import { dummyTeamSchedule1, dummyTeamSchedule2 } from '../js/dummyTeamData';
import '../App.css';
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
  const { isSidebar } = useSidebarStateStore();
  const { setName } = useCurrentSpaceNameStore();
  const { setId } = useCurrentTeamIdStore();
  const navigate = useNavigate();
  const userData = dummyUserData;
  const teamData1 = dummyTeamSchedule1;
  const teamData2 = dummyTeamSchedule2;

  const color = [
    "bg-gray-300",
    "bg-yellow-300",
    "bg-green-300",
  ]

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
      teamId: teamData1.teamId
    },
    {
      name: `${teamData2.title}`,
      initial: teamData2.title[0],
      color: color[2],
      teamId: teamData2.teamId
    }
  ];

  
  const handleClick = (team) => {
    if (!team.teamId) {//개인스페이스 일때 
      setName(team.name);
      navigate("/home/schedule");
    } else { //팀스페이스일때, null이 아니면 팀스페이스
      setName(team.name);
      setId(team.teamId);
      navigate("/teamspace/teamSchedule");
    }
  };

  return (
    <div
      className={`
        absolute top-0 left-0 w-[40%] h-full bg-gray-100 z-100
        transition-all duration-300 ease-in-out
        ${isSidebar ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* 프로필 상단 */}
      <div className="flex flex-col items-start p-4 gap-2">
        <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold text-lg">
          {dummyUserData.name[0]}
        </div>
        <div className="text-sm text-gray-800">{dummyUserData.email}</div>
        <div className="text-sm text-blue-600 underline cursor-pointer">내 정보 &gt;</div>
      </div>

      {/* 구분선 */}
      <div className="border-t border-gray-300 my-2" />

      {/* 팀 공간 목록 */}
      <div className="px-4 flex flex-col gap-3 cursor-pointer">
        {teamArr.map((team, index) => (
          <div key={index} className="flex items-center gap-2 text-sm" onClick={()=>{handleClick(team)}}>
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
