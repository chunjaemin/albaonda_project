import '../App.css';
import { useState } from 'react';
import TeamMonthSchedule from './teamMonthSchedule';
import TeamWeekSchedule from './teamWeekSchedule';

import { dummyTeam } from '../js/dummyTeam.js';

export default function TeamSchedule() {
  const [scheduleType, setScheduleType] = useState('month');
  const [isModify, setIsModify] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]); // ✅ 선택된 인원 배열
  const [showModal, setShowModal] = useState(false);

  const toggleMember = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const isSelected = (id) => selectedMembers.includes(id);

  const month_blue = scheduleType === 'month' ? 'text-blue-400 font-bold' : 'text-gray-400';
  const week_blue = scheduleType === 'week' ? 'text-blue-400 font-bold' : 'text-gray-400';

  return (
    <div className="relative">
      <div className='w-full'>
        {/* 월/주 선택 + 수정 버튼 */}
        <div className='w-full flex justify-between'>
          <div className='ml-4 w-[20%] aspect-[10/3] flex border border-gray-300 rounded-[8px] mt-5'>
            <div className={`w-[50%] border-r border-gray-300 flex justify-center items-center ${month_blue} cursor-pointer`} onClick={() => setScheduleType("month")}>월</div>
            <div className={`w-[50%] border-r border-gray-300 flex justify-center items-center ${week_blue} cursor-pointer`} onClick={() => setScheduleType("week")}>주</div>
          </div>
          {
            isModify ? (
              <div className='flex justify-center items-center mr-4 mt-8'>
                <div className='mr-4 text-red-400 cursor-pointer' onClick={() => setIsModify(false)}>취소</div>
                <div className='text-blue-400 cursor-pointer' onClick={() => setIsModify(false)}>저장</div>
              </div>
            ) : (
              <div className='mr-4 mt-8 text-blue-400 cursor-pointer' onClick={() => {
                setIsModify(true);
                setScheduleType('week');
              }}>수정</div>
            )
          }
        </div>
      </div>

      {/* 시간표 */}
      {
        scheduleType === 'month' ? (
          <TeamMonthSchedule />
        ) : (
          <TeamWeekSchedule />
        )
      }

      {/* ✅ 인원 선택 */}
      <div className="px-4 mt-4">
        <h2 className="text-center text-sm font-semibold mb-2">인원 선택</h2>
        <div className="space-y-2">
          {dummyTeam.members.map((member) => (
            <div
              key={member.id}
              onClick={() => toggleMember(member.id)}
              className={`flex justify-between items-center p-4 rounded-xl shadow-sm cursor-pointer ${
                isSelected(member.id) ? 'bg-blue-100 border-blue-300' : 'bg-white'
              }`}
            >
              <div>
                <div className="text-sm font-semibold">{member.name}</div>
                <div className="text-xs text-gray-500">시급: {member.hourPrice.toLocaleString()}원</div>
              </div>
              {isModify && <button className="text-blue-500 text-xs">수정</button> }
            </div>
          ))}

          {/* ➕ 버튼 */}
          <div className="flex justify-center">
            <button
              onClick={() => alert('인원 추가')}
              className="w-full p-4 text-2xl text-gray-500 border border-gray-300 rounded-xl"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
