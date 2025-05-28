// ✅ WeekSchedule 전체 코드: 시간표 UI + 드래그 + 선택 기능 완전 통합
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
  const hours = Array.from({ length: 48 }, (_, i) => `${String(Math.floor(i / 2)).padStart(2, '0')}:${i % 2 === 0 ? '00' : '30'}`);

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

  const handleSaveSelectedCells = () => {
    if (!selectedCard || selectedCells.length === 0) return;
    const groupedByDate = selectedCells.reduce((acc, { date, hour }) => {
      if (!acc[date]) acc[date] = [];
      acc[date].push(hour);
      return acc;
    }, {});
    const newEntries = [];
    Object.entries(groupedByDate).forEach(([date, hourList]) => {
      const sorted = hourList.map(h => parseTime(h)).sort((a, b) => a - b);
      let start = sorted[0], prev = sorted[0];
      for (let i = 1; i <= sorted.length; i++) {
        const cur = sorted[i];
        if (cur !== prev + 30) {
          const newEntry = {
            id: `entry-${Date.now()}-${Math.random()}`,
            name: selectedCard.name,
            date,
            startTime: formatTime(start),
            endTime: formatTime(prev + 30),
            ...selectedCard.payInfo
          };
          const overlap = entries.some(e =>
            e.date === date &&
            parseTime(e.startTime) < parseTime(newEntry.endTime) &&
            parseTime(e.endTime) > parseTime(newEntry.startTime)
          );
          if (!overlap) newEntries.push(newEntry);
          start = cur;
        }
        prev = cur;
      }
    });
    setEntries(prev => [...prev, ...newEntries]);
    setSelectedCells([]);
  };

  const toggleCell = (dateObj, hour) => {
    const dateStr = `${dateObj.year}-${String(dateObj.month).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')}`;
    const key = `${dateStr}-${hour}`;
    setSelectedCells(prev =>
      prev.some(c => c.key === key)
        ? prev.filter(c => c.key !== key)
        : [...prev, { key, date: dateStr, hour }]
    );
  };
  const toggleCellByDrag = (dateObj, hour) => {
    const dateStr = `${dateObj.year}-${String(dateObj.month).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')}`;
    const key = `${dateStr}-${hour}`;
    setSelectedCells(prev =>
      prev.find(c => c.key === key)
        ? prev
        : [...prev, { key, date: dateStr, hour }]
    );
  };

  const handleMouseEnter = (dateObj, hour) => {
    if (!isModify) return;
    if (draggingEntryId) setHoverTarget({ dateObj, hour });
    else if (isDraggingEmptyBlock) toggleCellByDrag(dateObj, hour);
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
              ? { ...entry, date: newDate, startTime: formatTime(newStart), endTime: formatTime(newEnd) }
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
    return entries.find(entry => {
      if (entry.date !== dateStr) return false;
      const startTotal = parseTime(entry.startTime);
      const endTotal = parseTime(entry.endTime);
      const cellTotal = parseTime(hour);
      return cellTotal >= startTotal && cellTotal < endTotal;
    });
  };

  const renderPreview = (rowIndex, colIndex) => {
    if (!isModify || !draggingEntryId || !hoverTarget) return false;
    const targetTime = parseTime(hoverTarget.hour);
    const draggingEntry = entries.find(e => e.id === draggingEntryId);
    const duration = parseTime(draggingEntry.endTime) - parseTime(draggingEntry.startTime);
    const previewStart = targetTime, previewEnd = targetTime + duration;
    const hour = rowIndex * 30;
    const isTargetCell =
      dates[colIndex].year === hoverTarget.dateObj.year &&
      dates[colIndex].month === hoverTarget.dateObj.month &&
      dates[colIndex].day === hoverTarget.dateObj.day &&
      hour >= previewStart && hour < previewEnd;
    if (!isTargetCell) return false;
    const newDate = `${hoverTarget.dateObj.year}-${String(hoverTarget.dateObj.month).padStart(2, '0')}-${String(hoverTarget.dateObj.day).padStart(2, '0')}`;
    const overlap = entries.some(e => {
      if (e.id === draggingEntryId || e.date !== newDate) return false;
      const existingStart = parseTime(e.startTime);
      const existingEnd = parseTime(e.endTime);
      return previewStart < existingEnd && previewEnd > existingStart;
    });
    return { overlap };
  };

  const draggingEntry = entries.find(e => e.id === draggingEntryId);
  const draggingLabel = draggingEntry ? `${draggingEntry.name} (${draggingEntry.startTime}~${draggingEntry.endTime})` : '';
  const dragColor = draggingEntry ? nameColorMap[draggingEntry.name] : '';

  return (
    <div className="p-4 mb-4 relative select-none" onMouseUp={handleMouseUp}>
      {isModify && draggingEntry && (
        <div className={`fixed pointer-events-none z-50 px-2 py-1 text-xs rounded shadow-lg ${dragColor}`} style={{ top: mousePos.y + 10, left: mousePos.x + 10 }}>
          {draggingLabel}
        </div>
      )}
      <div className="w-full aspect-[10/1] flex justify-between items-center border-b border-gray-400 py-3">
        <ChevronLeftIcon className="h-6 w-6 cursor-pointer" onClick={() => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() - 7)))} />
        <div>{dates[0].month}월 {dates[0].day}일 - {dates[6].month}월 {dates[6].day}일, {dates[0].year}년</div>
        <ChevronRightIcon className="h-6 w-6 cursor-pointer" onClick={() => setCurrentDate(prev => new Date(prev.setDate(prev.getDate() + 7)))} />
      </div>
      <div className="grid grid-cols-8 text-center">
        <div className="py-2 font-bold">시간</div>
        {days.map((day, i) => (
          <div key={day} className="py-2">
            <div className="font-bold">{day}</div>
            <div className="text-sm text-gray-500">{dates[i].day}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-8">
        {hours.map((hour, rowIndex) => (
          <div key={`row-${rowIndex}`} className="contents">
            <div className="text-[11px] flex items-center justify-center border border-gray-300">
              {rowIndex % 2 === 0 ? `${parseInt(hour.split(':')[0])}:00` : ''}
            </div>
            {dates.map((dateObj, colIndex) => {
              const entry = findEntryForCell(dateObj, hour);
              const dateStr = `${dateObj.year}-${String(dateObj.month).padStart(2, '0')}-${String(dateObj.day).padStart(2, '0')}`;
              const key = `${dateStr}-${hour}`;
              const isSelected = selectedCells.some(c => c.key === key);
              const preview = renderPreview(rowIndex, colIndex);
              const isPreview = !!preview;
              const isOverlap = preview?.overlap;
              const showText = entry && entry.startTime === hour;

              const isFirstRow = rowIndex === 0;
              const isFirstCol = colIndex === 0;

              let borderClass = "";
              if (entry && draggingEntryId && entry.id === draggingEntryId) {
                const current = parseTime(hour);
                const start = parseTime(entry.startTime);
                const end = parseTime(entry.endTime);

                if (current === start) {
                  borderClass = "border-t-2 border-l-2 border-r-2 border-red-300 border-dashed animate-wiggle";
                } else if (current === end - 30) {
                  borderClass = "border-b-2 border-l-2 border-r-2 border-red-300 border-dashed animate-wiggle";
                } else if (current > start && current < end) {
                  borderClass = "border-l-2 border-r-2 border-red-300 border-dashed animate-wiggle";
                }
              } else {
                // ✅ 내부 셀은 border-right & border-bottom만 적용, 첫 열/행은 left/top 추가
                borderClass = `
            ${isFirstRow ? 'border-t' : ''}
            ${isFirstCol ? 'border-l' : ''}
            border-r border-b
            border-gray-300
          `;
              }

              return (
                <div
                  key={`cell-${rowIndex}-${colIndex}`}
                  onMouseEnter={() => handleMouseEnter(dateObj, hour)}
                  onMouseDown={() => {
                    if (!isModify) return;
                    if (entry) {
                      const timer = setTimeout(() => {
                        setDraggingEntryId(entry.id);
                        setLongPressEntryId(entry.id);
                      }, 600);
                      setPressTimer(timer);
                    } else {
                      toggleCell(dateObj, hour);
                      setIsDraggingEmptyBlock(true);
                    }
                  }}
                  onMouseUp={() => clearTimeout(pressTimer)}
                  onMouseLeave={() => clearTimeout(pressTimer)}

                  className={`relative aspect-[2/1] flex items-center justify-center text-[11px]  
              ${entry ? `${nameColorMap[entry.name]} text-gray-700 font-semibold border-b-0 border-t-0` : ''}
              ${isSelected && !entry ? 'bg-blue-200/70' : ''}
              ${isOverlap ? 'bg-red-200 opacity-70' : ''}
              ${borderClass}
            `}
                >
                  {showText && <span>{entry.name}</span>}
                  {isModify && isPreview && !isOverlap && (
                    <div className={`absolute inset-0 ${dragColor} opacity-60 z-10 rounded-md scale-95 animate-pulse`} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {isModify && (
        <div className="flex justify-end mt-4">
          <button onClick={handleSaveSelectedCells} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            선택 일정 저장
          </button>
        </div>
      )}
    </div>
  );
}