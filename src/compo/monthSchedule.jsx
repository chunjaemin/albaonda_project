import { useState, useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useQuery } from '@tanstack/react-query';
import { fetchPersonalMonthSchedule } from '../js/api/schedule';
import { useAuthStore } from '../js/store';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import 'swiper/css';
import {
  generateCalendarDates,
  getCurrentYear,
  getCurrentMonth,
} from '../js/scheduleDate.js';
import { colorPalette } from '../js/colorPalette';
import '../App.css';

export default function MonthSchedule() {
  const [currentYear, setCurrentYear] = useState(getCurrentYear());
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const swiperRef = useRef(null);
  const user = useAuthStore((s) => s.user);

  const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
  const { data, isLoading, error } = useQuery({
    queryKey: ['personal-month', user?.id, dateStr],
    queryFn: () => fetchPersonalMonthSchedule(user.id, dateStr),
    enabled: !!user?.id,
  });

  // 디버깅 로그 추가
  // console.log("📦 [MonthSchedule] user:", user);
  // console.log("📅 [MonthSchedule] dateStr:", dateStr);
  // console.log("📊 [MonthSchedule] data:", data);
  // console.log("⚠️ [MonthSchedule] error:", error);

  const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours + minutes / 60;
  };

  const nameColorMap = useMemo(() => {
    const countMap = {};
    if (!data?.entries) return {};
    data.entries.forEach((entry) => {
      const dur = parseTime(entry.endTime) - parseTime(entry.startTime);
      countMap[entry.name] = (countMap[entry.name] || 0) + dur;
    });
    return Object.entries(countMap).sort((a, b) => b[1] - a[1]).reduce((acc, [name], idx) => {
      acc[name] = colorPalette[idx % colorPalette.length];
      return acc;
    }, {});
  }, [data]);

  const getDates = (y, m) => {
    const raw = generateCalendarDates(y, m);
    const firstDay = new Date(y, m - 1, 1).getDay();
    return raw.map((item, i) => {
      let dateMonth = m;
      let dateYear = y;
      if (!item.isCurrentMonth) {
        if (i < firstDay) {
          dateMonth = m === 1 ? 12 : m - 1;
          dateYear = m === 1 ? y - 1 : y;
        } else {
          dateMonth = m === 12 ? 1 : m + 1;
          dateYear = m === 12 ? y + 1 : y;
        }
      }
      const fullDate = `${dateYear}-${String(dateMonth).padStart(2, '0')}-${String(item.day).padStart(2, '0')}`;
      return { ...item, fullDate };
    });
  };

  const getWorkByDate = (date) => data?.entries?.filter((e) => e.date === date) || [];

  const renderCalendar = (year, month) => {
    const dates = getDates(year, month);
    return (
      <div className="w-full">
        <div className="grid grid-cols-7 font-medium text-center mb-2 text-xs">
          {["일", "월", "화", "수", "목", "금", "토"].map((d, i) => (
            <div key={d} className={`${i % 2 === 0 ? 'bg-green-200' : 'bg-green-100'}`}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {dates.map(({ day, isCurrentMonth, fullDate }) => {
            const works = getWorkByDate(fullDate);
            const visible = works.slice(0, 2);
            const hiddenCount = works.length > 2 ? works.length - 2 : 0;
            return (
              <div key={fullDate} className="aspect-square border-b border-gray-200 p-1 text-sm">
                <div className={isCurrentMonth ? 'text-black' : 'text-gray-300'}>{day}</div>
                {visible.map(({ name }, idx) => (
                  <div
                    key={idx}
                    className={`rounded-full ${nameColorMap[name] || 'bg-gray-200'} text-gray-800 text-[0.6rem] text-center truncate px-1 py-[2px] ${isCurrentMonth ? '' : 'opacity-40'}`}
                  >
                    {name}
                  </div>
                ))}
                {hiddenCount > 0 && (
                  <div className={`text-[0.6rem] text-gray-500 text-center mt-[1px] ${isCurrentMonth ? '' : 'opacity-40'}`}>+ {hiddenCount} more</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className='relative w-full pl-4 pr-4'>
      <div className='w-full aspect-[10/1] flex justify-between items-center pt-3 pb-3'>
        <ChevronLeftIcon className='h-6 w-6 cursor-pointer'
          onClick={() => {
            if (swiperRef.current) swiperRef.current.slidePrev();
          }}
        />
        <div className='text-base text-lg'>{currentMonth}월 {currentYear}</div>
        <ChevronRightIcon className='h-6 w-6 cursor-pointer'
          onClick={() => {
            if (swiperRef.current) swiperRef.current.slideNext();
          }}
        />
      </div>
      <Swiper
        key={`${currentYear}-${currentMonth}`}
        initialSlide={1}
        allowTouchMove={true}
        slidesPerView={1}
        spaceBetween={0}
        onSlideChangeTransitionEnd={(swiper) => {
          const diff = swiper.activeIndex - 1;
          if (diff === 0) return;
          let newMonth = currentMonth + diff;
          let newYear = currentYear;
          if (newMonth < 1) {
            newMonth = 12;
            newYear -= 1;
          } else if (newMonth > 12) {
            newMonth = 1;
            newYear += 1;
          }
          setCurrentMonth(newMonth);
          setCurrentYear(newYear);
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        <SwiperSlide>{renderCalendar(
          currentMonth === 1 ? currentYear - 1 : currentYear,
          currentMonth === 1 ? 12 : currentMonth - 1
        )}</SwiperSlide>
        <SwiperSlide>{renderCalendar(currentYear, currentMonth)}</SwiperSlide>
        <SwiperSlide>{renderCalendar(
          currentMonth === 12 ? currentYear + 1 : currentYear,
          currentMonth === 12 ? 1 : currentMonth + 1
        )}</SwiperSlide>
      </Swiper>
    </div>
  );
}
