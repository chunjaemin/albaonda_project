import { useState, useMemo } from 'react'
import '../App.css'

import MonthSchedule from './monthSchedule.jsx';
import WeekSchedule from './weeekSchedule.jsx';

export default function Schedule() {
  const [scheduleType, setScheduleType] = useState('month'); // 'month' or 'week'
  const [isModify, setIsModify] = useState(false); // 수정 모드 여부

  const month_blue = scheduleType === 'month' ? 'text-blue-400 font-bold' : 'text-gray-400';
  const week_blue = scheduleType === 'week' ? 'text-blue-400 font-bold' : 'text-gray-400';


  const scheduleItems = [
    { name: "Mom's Touch", wage: 12000 },
    { name: "버거킹", wage: 9125 },
  ];

  return (
    <>
      <div className='w-full'>

        {/* 월/주 + 수정 컨테이너 */}
        <div className='w-full flex justify-between'>
          <div className='ml-4 w-[20%] aspect-[10/3] flex border border-gray-300 rounded-[8px] mt-5'>
            <div className={`w-[50%] border-r border-gray-300 flex justify-center items-center ${month_blue} cursor-pointer`} onClick={() => { setScheduleType("month") }}>월</div>
            <div className={`w-[50%] border-r border-gray-300 flex justify-center items-center  ${week_blue} cursor-pointer`} onClick={() => { setScheduleType("week") }}>주</div>
          </div>
          {
            isModify ?
              <div className='flex justify-center items-center mr-4 mt-8'>
                <div className='mr-4 text-red-400 cursor-pointer' onClick={() => { setIsModify(false) }}>취소</div>
                <div className='text-blue-400 cursor-pointer' onClick={() => { setIsModify(false) }}>저장</div>
              </div> :
              <div className='mr-4 mt-8 text-blue-400 font- cursor-pointer' onClick={() => {
                setIsModify(true);
                setScheduleType('week');
              }}>수정</div>
          }
        </div>
        {/* 월/주 + 수정 컨테이너 끝 */}

        {/* (월) 시간표 컴포넌트 */}
        {
          scheduleType === 'month' ?
            <MonthSchedule></MonthSchedule> :
            <WeekSchedule isModify={isModify}></WeekSchedule>
        }
        <div className="mt-4 border-t border-gray-300 pt-4">
          <p className="text-center text-gray-500 mb-2">일정 선택</p>
          <div className="flex flex-col gap-4">
            {scheduleItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-white rounded-xl shadow-[0px_3px_4px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0px_3px_4px_rgba(0,0,0,0.20)] ml-4 mr-4"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1">시급: {item.wage.toLocaleString()}원</p>
                </div>
                {isModify && (
                  <button className="text-xs text-blue-600 hover:underline">수정</button>
                )}
              </div>
            ))}
            <button className="py-6 text-center text-2xl text-gray-400 bg-gray-100 rounded-xl shadow-[0px_3px_4px_rgba(0,0,0,0.12)] hover:shadow-[0px_3px_4px_rgba(0,0,0,0.20)] transition-shadow ml-4 mr-4">
              ＋
            </button>
          </div>
          <div className="w-full h-[300px]"></div>
        </div>
      </div>
    </>
  )
}