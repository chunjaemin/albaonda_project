import { useState, useMemo, useRef } from 'react';
import { generateCalendarDates, getCurrentYear, getCurrentMonth } from '../js/scheduleDate.js';
import dummySchedule from '../js/dummyData1.js';
import { colorPalette } from '../js/colorPalette.js';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function CalenderAutoSalary() {
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [selectedMap, setSelectedMap] = useState(new Map());
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const dragAreaRef = useRef(null);

  const key = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
  const dates = useMemo(() => generateCalendarDates(currentYear, currentMonth), [currentYear, currentMonth]);

  const toggleDate = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;

    setSelectedMap((prev) => {
      const newMap = new Map(prev);
      const monthSet = new Set(newMap.get(key) || []);

      if (monthSet.has(day)) {
        monthSet.delete(day);
      } else {
        monthSet.add(day);
      }

      newMap.set(key, monthSet);
      return newMap;
    });
  };

  const handleMouseDown = (day, isCurrentMonth) => {
    setIsDragging(true);
    toggleDate(day, isCurrentMonth);
  };

  const handleMouseEnter = (day, isCurrentMonth) => {
    if (isDragging) {
      toggleDate(day, isCurrentMonth);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const selectedFullDates = useMemo(() => {
    const fullDates = [];
    for (let [monthKey, daySet] of selectedMap.entries()) {
      for (let day of daySet) {
        fullDates.push(`${monthKey}-${String(day).padStart(2, '0')}`);
      }
    }
    return fullDates;
  }, [selectedMap]);

  const totalSalary = useMemo(() => {
    let total = 0;
    selectedFullDates.forEach(date => {
      dummySchedule.entries
        .filter(entry => entry.date === date)
        .forEach(entry => {
          const [sh, sm] = entry.startTime.split(':').map(Number);
          const [eh, em] = entry.endTime.split(':').map(Number);
          const duration = (eh * 60 + em - (sh * 60 + sm)) / 60;
          total += duration * entry.payInfo.hourPrice;
        });
    });
    return Math.round(total);
  }, [selectedFullDates]);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (dragAreaRef.current && dragAreaRef.current.contains(target)) {
      const day = target.getAttribute('data-day');
      const current = target.getAttribute('data-current') === 'true';
      if (day && current) toggleDate(Number(day), current);
    }
  };

  const nameColorMap = useMemo(() => {
    const uniqueNames = [...new Set(dummySchedule.entries.map(e => e.name))];
    return uniqueNames.reduce((acc, name, idx) => {
      acc[name] = colorPalette[idx % colorPalette.length];
      return acc;
    }, {});
  }, []);

  return (
    <div
      ref={dragAreaRef}
      className='relative w-full p-4 select-none'
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      {/* 달 이동 */}
      <div className='w-full aspect-[10/1] flex justify-between items-center pt-3 pb-3'>
        <ChevronLeftIcon className='h-[100%] aspect-[1/1] cursor-pointer'
          onClick={() => {
            if (currentMonth === 1) {
              setCurrentYear(prev => prev - 1);
              setCurrentMonth(12);
            } else {
              setCurrentMonth(prev => prev - 1);
            }
          }}
        />
        <div className="text-lg font-semibold">{currentMonth}월 {currentYear}</div>
        <ChevronRightIcon className='h-[100%] aspect-[1/1] cursor-pointer'
          onClick={() => {
            if (currentMonth === 12) {
              setCurrentYear(prev => prev + 1);
              setCurrentMonth(1);
            } else {
              setCurrentMonth(prev => prev + 1);
            }
          }}
        />
      </div>

      {/* 요일 표시 */}
      <div className="w-full flex justify-between items-center">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
          <div key={day} className={`w-1/7 text-center text-sm font-medium ${i % 2 === 0 ? 'bg-green-200' : 'bg-green-100'}`}>
            {day}
          </div>
        ))}
      </div>

      {/* 날짜 박스 */}
      {dates.map((date, index) => {
        if (index % 7 === 0) {
          return (
            <div key={index} className="flex">
              {dates.slice(index, index + 7).map(({ day, isCurrentMonth }) => {
                const monthSet = selectedMap.get(key) || new Set();
                const isSelected = isCurrentMonth && monthSet.has(day);
                const fullDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const works = dummySchedule.entries.filter(entry => entry.date === fullDate);
                const visible = works.slice(0, 2);
                const hiddenCount = works.length > 2 ? works.length - 2 : 0;

                return (
                  <div
                    key={day}
                    data-day={day}
                    data-current={isCurrentMonth}
                    className={`relative w-1/7 aspect-[1/1] border border-gray-200 flex flex-col items-start p-[4px] cursor-pointer ${isSelected ? 'bg-blue-200/70' : ''}`}
                    onMouseDown={() => handleMouseDown(day, isCurrentMonth)}
                    onMouseEnter={() => handleMouseEnter(day, isCurrentMonth)}
                    onTouchStart={() => {
                      setIsDragging(true);
                      handleMouseDown(day, isCurrentMonth);
                    }}
                  >
                    <span className={`${isCurrentMonth ? 'text-black' : 'text-gray-300'} text-[12px]`}>
                      {day}
                    </span>
                    <div className="mt-[2px] flex flex-col gap-[1px] w-full">
                      {visible.map((entry) => (
                        <div
                          key={entry.name}
                          className={`text-[10px] ${nameColorMap[entry.name]} text-gray-800 rounded px-1 truncate`}
                        >
                          {entry.name}
                        </div>
                      ))}
                      {hiddenCount > 0 && (
                        <div className="text-[10px] text-gray-500 text-center">+{hiddenCount} more</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        }
        return null;
      })}

      {/* 버튼 영역 */}
      <div className="w-full flex gap-2 mt-6">
        <button
          onClick={() => setSelectedMap(new Map())}
          className="flex-1 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
        >
          초기화
        </button>
        <button
          onClick={() => navigate('/home/calResult', {
            state: {
              workDays: selectedFullDates.length,
              name: '천재민',
              salary: totalSalary,
            },
          })}
          className="flex-1 py-2 bg-green-400 text-white rounded hover:bg-green-500"
        >
          계산하기
        </button>
      </div>
    </div>
  );
}
