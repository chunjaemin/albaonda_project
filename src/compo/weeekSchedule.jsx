import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getWeekDates, getCurrentStartOfWeek } from '../js/scheduleDate.js';
import dummySchedule from '../js/dummyData1.js'; // 경로는 상황에 맞게 수정

export default function WeekSchedule() {
  const [currentDate, setCurrentDate] = useState(getCurrentStartOfWeek());
  const [todayDate] = useState(getCurrentStartOfWeek());

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dates = getWeekDates(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
  const hours = Array.from({ length: 25 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

  const borderColor = 'border-gray-400';

  const findEntryForCell = (dateObj, hour) => {
    const dateStr = `${dateObj.year}-${String(dateObj.month).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')}`;
    return dummySchedule.entries.find((entry) => {
      if (entry.date !== dateStr) return false;
      const cellHour = parseInt(hour.split(':')[0], 10);
      const [startHour] = entry.startTime.split(':').map(Number);
      const [endHour] = entry.endTime.split(':').map(Number);
      return cellHour >= startHour && cellHour < endHour;
    });
  };

  return (
    <div className="p-4 mb-4">
      {/* 날짜 컨트롤 바 */}
      <div className={`w-full aspect-[10/1] flex justify-between items-center border-b ${borderColor} pt-3 pb-3`}>
        <ChevronLeftIcon
          className='h-[100%] aspect-[1/1] cursor-pointer'
          onClick={() => {
            setCurrentDate((prev) => {
              const newDate = new Date(prev);
              newDate.setDate(newDate.getDate() - 7);
              return newDate;
            });
          }}
        />
        <div>{dates[0].month}월 {dates[0].day}일 - {dates[6].month}월 {dates[6].day}일, {dates[0].year}년</div>
        <ChevronRightIcon
          className='h-[100%] aspect-[1/1] cursor-pointer'
          onClick={() => {
            setCurrentDate((prev) => {
              const newDate = new Date(prev);
              newDate.setDate(newDate.getDate() + 7);
              return newDate;
            });
          }}
        />
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-8 text-center">
        <div className={`border-b py-2 font-bold ${borderColor}`}><br />시간</div>
        {days.map((day, i) => (
          <div key={day} className={`border-b py-2 ${borderColor}`}>
            <div className="font-bold">{day}</div>
            <div className="text-sm text-gray-500">{dates[i].day}</div>
          </div>
        ))}
      </div>

      {/* 시간표 본문 */}
      <div className="grid grid-cols-8">
        {hours.map((hour, rowIndex) => (
          <div key={`row-${rowIndex}`} className="contents">
            <div className={`text-sm flex items-center justify-center border-b border-l border-r ${borderColor}`}>
              {hour}
            </div>
            {dates.map((dateObj, colIndex) => {
              const entry = findEntryForCell(dateObj, hour);
              return (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  className={`
                    relative aspect-[1/1] border-r border-b ${borderColor} 
                    flex items-center justify-center text-xs 
                    ${entry ? 'bg-orange-300 font-semibold text-white' : ''}
                  `}
                >
                  {entry ? entry.name : null}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
