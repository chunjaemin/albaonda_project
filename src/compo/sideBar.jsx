import { useSidebarStateStore } from '../js/store';
import '../App.css';

export default function SideBar() {
  const isSidebar = useSidebarStateStore((state) => state.isSidebar);
  const teamArr = ["천재민 개인공간", "맘스터치 팀공간", "버거킹 팀공간"]
  return (
    <div
      className={`
        absolute top-0 left-0 w-[40%] h-full bg-gray-100 z-100
        transition-all duration-300 ease-in-out
        ${isSidebar ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className='w-full'>
        <div className="w-[30%] aspect-[1/1] rounded-full bg-gray-400"></div>
      </div>
      <div className='w-full border-b border-gray-400 '>
        <p>chun4582@naver.com</p>
        <p>내정보</p>
      </div>
      <div className='w-full'>
        {
          teamArr.map((team, index) => (
            <div key={index} className='w-full'>
              <p>{team}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}