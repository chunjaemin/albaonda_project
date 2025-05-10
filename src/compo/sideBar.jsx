import { useSidebarStateStore } from '../js/store';
import '../App.css';

export default function SideBar() {
  const isSidebar = useSidebarStateStore((state) => state.isSidebar);

  return (
    <div
      className={`
        absolute top-0 left-0 w-[40%] h-full bg-yellow-100 z-100
        transition-all duration-300 ease-in-out
        ${isSidebar ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      사이드바
    </div>
  );
}