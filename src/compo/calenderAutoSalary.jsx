import { useState, useMemo, useRef } from 'react';
import { generateCalendarDates, getCurrentYear, getCurrentMonth } from '../js/scheduleDate.js';
import dummySchedule from '../js/dummyData1.js';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export default function CalenderAutoSalary() {
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [selectedDates, setSelectedDates] = useState(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const dragAreaRef = useRef(null);

  const dates = useMemo(
    () => generateCalendarDates(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const selectedFullDates = useMemo(() => {
    return dates
      .filter((d) => d.isCurrentMonth && selectedDates.has(d.day))
      .map((d) => {
        const year = currentYear;
        const month = String(currentMonth).padStart(2, '0');
        const day = String(d.day).padStart(2, '0');
        return `${year}-${month}-${day}`;
      });
  }, [selectedDates, dates, currentYear, currentMonth]);

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

  const toggleDate = (day, isCurrentMonth) => {
    setSelectedDates((prev) => {
      const copy = new Set(prev);
      if (isCurrentMonth) {
        if (copy.has(day)) {
          copy.delete(day);
        } else {
          copy.add(day);
        }
      }
      return copy;
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

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    if (dragAreaRef.current && dragAreaRef.current.contains(target)) {
      const day = target.getAttribute('data-day');
      const current = target.getAttribute('data-current') === 'true';
      if (day && current) {
        toggleDate(Number(day), current);
      }
    }
  };

  return (
    <div
      ref={dragAreaRef}
      className='relative w-full p-4 select-none'
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
    >
      <div className='w-full aspect-[10/1] flex justify-between items-center border-b border-gray-300 pt-3 pb-3'>
        <ChevronLeftIcon className='h-[100%] aspect-[1/1] cursor-pointer'
          onClick={() => {
            if (currentMonth === 1) {
              setCurrentYear((prev) => prev - 1);
              setCurrentMonth(12);
            } else {
              setCurrentMonth((prev) => prev - 1);
            }
          }}
        />
        <div className="text-base font-semibold">{currentMonth}월 {currentYear}</div>
        <ChevronRightIcon className='h-[100%] aspect-[1/1] cursor-pointer'
          onClick={() => {
            if (currentMonth === 12) {
              setCurrentYear((prev) => prev + 1);
              setCurrentMonth(1);
            } else {
              setCurrentMonth((prev) => prev + 1);
            }
          }}
        />
      </div>

      <div className="w-full flex justify-between items-center mt-2 mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="w-1/7 text-center text-sm font-medium">
            {day}
          </div>
        ))}
      </div>

      {dates.map((date, index) => {
        if (index % 7 === 0) {
          return (
            <div key={index} className="flex">
              {dates.slice(index, index + 7).map(({ day, isCurrentMonth }) => {
                const isSelected = isCurrentMonth && selectedDates.has(day);
                return (
                  <div
                    key={day}
                    data-day={day}
                    data-current={isCurrentMonth}
                    className={`relative w-1/7 aspect-[1/1] border border-gray-200 flex items-center justify-center cursor-pointer ${
                      isSelected ? 'bg-blue-200/70' : ''
                    }`}
                    onMouseDown={() => handleMouseDown(day, isCurrentMonth)}
                    onMouseEnter={() => handleMouseEnter(day, isCurrentMonth)}
                    onTouchStart={() => {
                      setIsDragging(true);
                      handleMouseDown(day, isCurrentMonth);
                    }}
                  >
                    <span className={`${isCurrentMonth ? 'text-black' : 'text-gray-400'}`}>
                      {day}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        }
        return null;
      })}

      <div className="w-full flex gap-2 mt-6">
        <button
          onClick={() => setSelectedDates(new Set())}
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
          className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          계산하기
        </button>
      </div>
    </div>
  );
}
