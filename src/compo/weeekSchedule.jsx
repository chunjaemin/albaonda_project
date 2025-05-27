// ✅ 기존 import 및 함수 정의 위쪽 생략 없이 유지
import { useState, useMemo, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getWeekDates, getCurrentStartOfWeek } from '../js/scheduleDate.js';

export default function WeekSchedule({ isModify, entries, setEntries, selectedCard }) {
  const [currentDate, setCurrentDate] = useState(getCurrentStartOfWeek());
  const [draggingEntryId, setDraggingEntryId] = useState(null);
  const [hoverTarget, setHoverTarget] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedCells, setSelectedCells] = useState([]);
  const [isDraggingEmptyBlock, setIsDraggingEmptyBlock] = useState(false);
  const [longPressEntryId, setLongPressEntryId] = useState(null);
  const [pressTimer, setPressTimer] = useState(null);

  const parseTime = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${String(h).padStart(2, '0')}:${m === 0 ? '00' : '30'}`;
  };

  useEffect(() => {
    if (!isModify) return;
    const handleMouseMove = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isModify]);

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dates = getWeekDates(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
  const colorPalette = ['bg-rose-100', 'bg-amber-100', 'bg-lime-100', 'bg-sky-100', 'bg-pink-100', 'bg-purple-100', 'bg-indigo-100'];

  const nameColorMap = useMemo(() => {
    const countMap = {};
    entries.forEach(entry => {
      const start = parseTime(entry.startTime);
      const end = parseTime(entry.endTime);
      countMap[entry.name] = (countMap[entry.name] || 0) + (end - start);
    });
    return Object.entries(countMap).sort((a, b) => b[1] - a[1]).reduce((acc, [name], i) => {
      acc[name] = colorPalette[i % colorPalette.length];
      return acc;
    }, {});
  }, [entries]);

  const hours = Array.from({ length: 48 }, (_, i) => `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`);

  const renderPreview = (rowIndex, colIndex) => {
    if (!isModify || !draggingEntryId || !hoverTarget) return null;
    const targetTime = parseTime(hoverTarget.hour);
    const draggingEntry = entries.find(e => e.id === draggingEntryId);
    if (!draggingEntry) return null;
    const duration = parseTime(draggingEntry.endTime) - parseTime(draggingEntry.startTime);
    const previewStart = targetTime;
    const previewEnd = targetTime + duration;
    const hour = rowIndex * 30;
    const isTargetCell =
      dates[colIndex].year === hoverTarget.dateObj.year &&
      dates[colIndex].month === hoverTarget.dateObj.month &&
      dates[colIndex].day === hoverTarget.dateObj.day &&
      hour >= previewStart && hour < previewEnd;

    if (!isTargetCell) return null;

    const newDate = `${hoverTarget.dateObj.year}-${String(hoverTarget.dateObj.month).padStart(2, '0')}-${String(hoverTarget.dateObj.day).padStart(2, '0')}`;
    const overlap = entries.some(e => {
      if (e.id === draggingEntryId || e.date !== newDate) return false;
      const existingStart = parseTime(e.startTime);
      const existingEnd = parseTime(e.endTime);
      return previewStart < existingEnd && previewEnd > existingStart;
    });

    return { overlap };
  };

  const handleMouseUp = () => {
    if (isDraggingEmptyBlock || draggingEntryId) {
      const draggingEntry = entries.find(e => e.id === draggingEntryId);
      if (draggingEntry && hoverTarget) {
        const duration = parseTime(draggingEntry.endTime) - parseTime(draggingEntry.startTime);
        const newStart = parseTime(hoverTarget.hour);
        const newEnd = newStart + duration;
        const newDate = `${hoverTarget.dateObj.year}-${String(hoverTarget.dateObj.month).padStart(2, '0')}-${String(hoverTarget.dateObj.day).padStart(2, '0')}`;

        const overlap = entries.some(e => {
          if (e.id === draggingEntryId || e.date !== newDate) return false;
          const existingStart = parseTime(e.startTime);
          const existingEnd = parseTime(e.endTime);
          return newStart < existingEnd && newEnd > existingStart;
        });

        if (!overlap) {
          const updated = entries.map((entry) =>
            entry.id === draggingEntryId
              ? {
                  ...entry,
                  date: newDate,
                  startTime: formatTime(newStart),
                  endTime: formatTime(newEnd),
                }
              : entry
          );
          setEntries(updated);
        }
      }
    }
    setIsDraggingEmptyBlock(false);
    setDraggingEntryId(null);
    setHoverTarget(null);
    setLongPressEntryId(null);
    clearTimeout(pressTimer);
  };

  const findEntryForCell = (dateObj, hour) => {
    const dateStr = `${dateObj.year}-${String(dateObj.month).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')}`;
    return entries.find((entry) => {
      if (entry.date !== dateStr) return false;
      const startTotal = parseTime(entry.startTime);
      const endTotal = parseTime(entry.endTime);
      const [cellHour, cellMin] = hour.split(':').map(Number);
      const cellTotal = cellHour * 60 + cellMin;
      return cellTotal >= startTotal && cellTotal < endTotal;
    });
  };

  const renderCellClass = (entry) => {
    return `${entry ? `${nameColorMap[entry.name]} text-gray-700 font-semibold border-b-0` : ''} ` +
      `${entry?.id === longPressEntryId ? 'animate-wiggle scale-105 ring-2 ring-blue-400' : ''}`;
  };

  const draggingEntry = entries.find(e => e.id === draggingEntryId);
  const draggingLabel = draggingEntry ? `${draggingEntry.name} (${draggingEntry.startTime}~${draggingEntry.endTime})` : '';
  const dragColor = draggingEntry ? nameColorMap[draggingEntry.name] : '';

  return (
    <div className="p-4 mb-4 relative select-none" onMouseUp={handleMouseUp}>
      {isModify && draggingEntry && (
        <div className={`fixed pointer-events-none z-50 px-2 py-1 text-xs rounded shadow-lg transition-transform duration-75 ${dragColor}`} style={{ top: mousePos.y + 10, left: mousePos.x + 10, opacity: 0.85 }}>
          {draggingLabel}
        </div>
      )}

      <div className={`w-full aspect-[10/1] flex justify-between items-center border-b border-gray-400 pt-3 pb-3`}>
        <ChevronLeftIcon className='h-[100%] aspect-[1/1] cursor-pointer' onClick={() => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() - 7)))} />
        <div>{dates[0].month}월 {dates[0].day}일 - {dates[6].month}월 {dates[6].day}일, {dates[0].year}년</div>
        <ChevronRightIcon className='h-[100%] aspect-[1/1] cursor-pointer' onClick={() => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() + 7)))} />
      </div>

      <div className="grid grid-cols-8">
        {hours.map((hour, rowIndex) => (
          <div key={`row-${rowIndex}`} className="contents">
            <div className="text-[11px] flex items-center justify-center border-b border-l border-r border-gray-400">
              {rowIndex % 2 === 0 ? `${parseInt(hour.split(':')[0])}:00` : ''}
            </div>
            {dates.map((dateObj, colIndex) => {
              const entry = findEntryForCell(dateObj, hour);
              const preview = renderPreview(rowIndex, colIndex);
              const isPreview = !!preview;
              const isOverlap = preview?.overlap;
              const dragColor = draggingEntryId ? nameColorMap[entries.find(e => e.id === draggingEntryId)?.name] : '';
              const dateStr = `${dateObj.year}-${String(dateObj.month).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')}`;
              const key = `${dateStr}-${hour}`;

              return (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  onMouseEnter={() => {
                    if (!isModify) return;
                    if (draggingEntryId) {
                      setHoverTarget({ dateObj, hour });
                    }
                  }}
                  onMouseDown={() => {
                    if (!isModify) return;
                    if (entry) {
                      const timer = setTimeout(() => {
                        setDraggingEntryId(entry.id);
                        setLongPressEntryId(entry.id);
                      }, 600);
                      setPressTimer(timer);
                    }
                  }}
                  onMouseUp={() => clearTimeout(pressTimer)}
                  onMouseLeave={() => clearTimeout(pressTimer)}
                  className={`relative aspect-[2/1] flex items-center justify-center text-[11px] border-b border-gray-400 border-r border-gray-400 ${renderCellClass(entry)} ${isOverlap ? 'bg-red-200 opacity-70' : ''}`}
                >
                  {entry?.startTime === hour && <span>{entry.name}</span>}
                  {isModify && isPreview && !isOverlap && (
                    <div className={`absolute inset-0 ${dragColor} opacity-60 z-10 rounded-md scale-95 animate-pulse`} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
