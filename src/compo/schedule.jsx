import { useState, useMemo } from 'react'
import '../App.css'

import MonthSchedule from './monthSchedule.jsx';
import WeekSchedule from './weeekSchedule.jsx';

export default function Schedule() {
  const [scheduleType, setScheduleType] = useState('month'); // 'month' or 'week'
  const month_blue = scheduleType === 'month' ? 'text-blue-400 font-bold' : 'text-gray-400';
  const week_blue = scheduleType === 'week' ? 'text-blue-400 font-bold' : 'text-gray-400';
  return (
    <>
      <div className='w-full'>

        {/* 월/주 + 수정 컨테이너 */}
        <div className='w-full flex justify-between'>
          <div className='ml-4 w-[20%] aspect-[10/3] flex border border-gray-300 rounded-[8px] mt-5'>
            <div className={`w-[50%] border-r border-gray-300 flex justify-center items-center ${month_blue}`} onClick={()=>{setScheduleType("month")}}>월</div>
            <div className={`w-[50%] border-r border-gray-300 flex justify-center items-center ${week_blue}`} onClick={()=>{setScheduleType("week")}}>주</div>
          </div>
          <div className='mr-4 mt-8 text-blue-400 font-'>수정</div>
        </div>
        {/* 월/주 + 수정 컨테이너 끝 */}
  
        {/* (월) 시간표 컴포넌트 */}
        {
          scheduleType === 'month' ? 
          <MonthSchedule></MonthSchedule> : 
          <WeekSchedule></WeekSchedule>
        }
        
      </div>
    </>
  )
}