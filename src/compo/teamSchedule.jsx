import { useState } from 'react';
import '../App.css';

import MonthSchedule from './monthSchedule.jsx';
import WeekSchedule from './weeekSchedule.jsx';
import { getCurrentStartOfWeek } from '../js/scheduleDate.js';

export default function TeamSchedule() {
  const [scheduleType, setScheduleType] = useState('month'); // 'month' or 'week'
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [scheduleData, setScheduleData] = useState({});
  const [currentWeekStart, setCurrentWeekStart] = useState(getCurrentStartOfWeek());
  const users = [
  { name: '김점장', role: '점장' },
  { name: '이직원', role: '직원' },
  { name: '박알바', role: '알바' },
];

  const monthClass = scheduleType === 'month' ? 'text-blue-400 font-bold' : 'text-gray-400';
  const weekClass = scheduleType === 'week' ? 'text-blue-400 font-bold' : 'text-gray-400';

  const handleTabClick = (type) => {
    if (type === 'month') setIsEditing(false);
    setScheduleType(type);
  };

  const handleToggleEdit = () => {
    if (!isEditing) {
      setScheduleType('week');
    }
    setIsEditing(prev => !prev);
  };

  const getWeekKey = () => {
    const { year, month, day } = currentWeekStart;
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  return (
    <div className='w-full'>
      {/* 월/주 전환 + 수정 버튼 */}
      <div className='w-full flex justify-between'>
        <div className='ml-4 w-[20%] aspect-[10/3] flex border border-gray-300 rounded-[8px] mt-5'>
          <div
            className={`w-[50%] border-r border-gray-300 flex justify-center items-center ${monthClass} cursor-pointer`}
            onClick={() => handleTabClick("month")}
          >
            월
          </div>
          <div
            className={`w-[50%] flex justify-center items-center ${weekClass} cursor-pointer`}
            onClick={() => handleTabClick("week")}
          >
            주
          </div>
        </div>
        <div
          className='mr-4 mt-8 text-blue-400 cursor-pointer'
          onClick={handleToggleEdit}
        >
          {isEditing ? '수정 완료' : '수정'}
        </div>
      </div>

      {/* 사용자 선택 리스트 */}
      {isEditing && (
  <div className="px-4 py-2 flex flex-col gap-2">
    {['점장', '직원', '알바'].map((role) => {
      const roleUsers = users.filter((user) => user.role === role);

      return (
        <div key={role} className="flex items-center gap-2">
          <div className="font-semibold w-[50px]">{role}:</div>
          <div className="flex gap-3">
            {roleUsers.map((user) => (
              <div
                key={user.name}
                className={`text-sm pb-1 hover:cursor-pointer hover:underline ${
                  selectedUser === user.name ? 'text-blue-500 font-semibold' : ''
                }`}
                onClick={() => setSelectedUser(user.name)}
              >
                {user.name}
              </div>
            ))}
          </div>
        </div>
      );
    })}
  </div>
)}


      {/* 렌더링 */}
      {isEditing || scheduleType === 'week' ? (
        <WeekSchedule
          isEditing={isEditing}
          selectedUser={selectedUser}
          scheduleData={scheduleData}
          setScheduleData={setScheduleData}
          currentWeekStart={currentWeekStart}
          setCurrentWeekStart={setCurrentWeekStart}
        />
      ) : (
        <MonthSchedule
          isEditing={isEditing}
          scheduleData={scheduleData}
        />
      )}
    </div>
  );
}
