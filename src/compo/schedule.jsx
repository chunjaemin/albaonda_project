import { useState } from 'react';
import '../App.css';

import MonthSchedule from './monthSchedule.jsx';
import WeekSchedule from './weeekSchedule.jsx';

export default function Schedule() {
  const [scheduleType, setScheduleType] = useState('month'); // 'month' or 'week'
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const monthClass = scheduleType === 'month' ? 'text-blue-400 font-bold' : 'text-gray-400';
  const weekClass = scheduleType === 'week' ? 'text-blue-400 font-bold' : 'text-gray-400';

  // const handleToggleEdit = () => {
  //   // 수정 모드 진입 시 자동으로 week로 전환
  //   if (!isEditing) setScheduleType('week');
  //   setIsEditing(prev => !prev);
  // };

  return (
    <div className='w-full'>

      {/* 월/주 전환 + 수정 버튼 */}
      <div className='w-full flex justify-between'>
        <div className='ml-4 w-[20%] aspect-[10/3] flex border border-gray-300 rounded-[8px] mt-5'>
          <div
            className={`w-[50%] border-r border-gray-300 flex justify-center items-center ${monthClass} cursor-pointer`}
            onClick={() => setScheduleType("month")}
          >
            월
          </div>
          <div
            className={`w-[50%] flex justify-center items-center ${weekClass} cursor-pointer`}
            onClick={() => setScheduleType("week")}
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

      {/* 사용자 선택 리스트 (편집 중일 때만 표시) */}
      {isEditing && (
        <div className="px-4 py-2 flex gap-3">
          {['김점장', '이직원', '박알바'].map((name) => (
            <div
              key={name}
              className={`text-sm pb-1 border-b hover:cursor-pointer hover:underline ${
                selectedUser === name ? 'text-blue-500 font-semibold' : ''
              }`}
              onClick={() => setSelectedUser(name)}
            >
              {name}
            </div>
          ))}
        </div>
      )}

      {/* 조건에 따라 컴포넌트 렌더링 */}
      {isEditing || scheduleType === 'week' ? (
        <WeekSchedule isEditing={isEditing} selectedUser={selectedUser} />
      ) : (
        <MonthSchedule />
      )}
    </div>
  );
}
