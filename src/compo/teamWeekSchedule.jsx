import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getWeekDates } from '../js/scheduleDate.js';
import { getUserColor } from '../js/colorUtils';

export default function teamWeekSchedule({
  isEditing,
  selectedUser,
  scheduleData,
  setScheduleData,
  currentWeekStart,
  setCurrentWeekStart
}) {
  const isValidWeekStart = currentWeekStart &&
    typeof currentWeekStart === 'object' &&
    'year' in currentWeekStart &&
    'month' in currentWeekStart &&
    'day' in currentWeekStart;

  const [dates, setDates] = useState([]);
  const [openDetailBlock, setOpenDetailBlock] = useState(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragMode, setDragMode] = useState(null); // 'add' or 'remove'
  const [startCell, setStartCell] = useState(null);
  const [endCell, setEndCell] = useState(null);
  const [previewBlocks, setPreviewBlocks] = useState(new Set());

  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const hours = Array.from({ length: 48 }, (_, i) => {
    const hour = String(Math.floor(i / 2)).padStart(2, '0');
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour}:${minute}`;
  });

  useEffect(() => {
    if (isValidWeekStart) {
      const { year, month, day } = currentWeekStart;
      setDates(getWeekDates(year, month, day));
    }
  }, [currentWeekStart]);

    useEffect(() => {
    const handleWindowMouseUp = () => {
      if (startCell && endCell && isEditing && selectedUser) {
        const newSet = new Set(scheduleData[weekKey]?.[selectedUser] || []);
        const [startRow, startCol] = startCell.split('-').map(Number);
        const [endRow, endCol] = endCell.split('-').map(Number);

        const rowMin = Math.min(startRow, endRow);
        const rowMax = Math.max(startRow, endRow);
        const colMin = Math.min(startCol, endCol);
        const colMax = Math.max(startCol, endCol);

        for (let row = rowMin; row <= rowMax; row++) {
          for (let col = colMin; col <= colMax; col++) {
            const key = `${row}-${col}`;
            if (dragMode === 'add') newSet.add(key);
            else newSet.delete(key);
          }
        }

        setScheduleData(prev => ({
          ...prev,
          [weekKey]: {
            ...prev[weekKey],
            [selectedUser]: newSet
          }
        }));
      }

      setIsMouseDown(false);
      setDragMode(null);
      setStartCell(null);
      setEndCell(null);
      setPreviewBlocks(new Set());
    };

    window.addEventListener('mouseup', handleWindowMouseUp);
    return () => window.removeEventListener('mouseup', handleWindowMouseUp);
  }, [startCell, endCell, isEditing, selectedUser, dragMode, scheduleData]);

  const handleMouseDown = (row, col) => {
    if (!isEditing || !selectedUser) return;
    const key = `${row}-${col}`;
    const isActive = scheduleData[weekKey]?.[selectedUser]?.has(key);
    setIsMouseDown(true);
    setDragMode(isActive ? 'remove' : 'add');
    setStartCell(key);
    setEndCell(key);
    setPreviewBlocks(new Set([key]));
  };

  const handleMouseEnter = (row, col) => {
    if (!isMouseDown || !startCell) return;
    const newEnd = `${row}-${col}`;
    setEndCell(newEnd);

    const [startRow, startCol] = startCell.split('-').map(Number);
    const [endRow, endCol] = [row, col];

    const rowMin = Math.min(startRow, endRow);
    const rowMax = Math.max(startRow, endRow);
    const colMin = Math.min(startCol, endCol);
    const colMax = Math.max(startCol, endCol);

    const newPreview = new Set();
    for (let r = rowMin; r <= rowMax; r++) {
      for (let c = colMin; c <= colMax; c++) {
        newPreview.add(`${r}-${c}`);
      }
    }
    setPreviewBlocks(newPreview);
  };

  if (!isValidWeekStart) {
    return <div className="p-4">날짜 정보를 불러오는 중입니다...</div>;
  }

  const handlePrevWeek = () => {
    const date = new Date(currentWeekStart.year, currentWeekStart.month - 1, currentWeekStart.day);
    date.setDate(date.getDate() - 7);
    setCurrentWeekStart({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  };

  const handleNextWeek = () => {
    const date = new Date(currentWeekStart.year, currentWeekStart.month - 1, currentWeekStart.day);
    date.setDate(date.getDate() + 7);
    setCurrentWeekStart({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  };

  const weekKey = `${currentWeekStart.year}-${String(currentWeekStart.month).padStart(2, '0')}-${String(currentWeekStart.day).padStart(2, '0')}`;
  const currentWeekUsers = scheduleData[weekKey] || {};

    return (
    <div className="p-4 mb-4">
      <div className="w-full aspect-[10/1] flex justify-between items-center border-b border-gray-400 pt-3 pb-3">
        <ChevronLeftIcon className="h-[100%] aspect-[1/1] cursor-pointer" onClick={handlePrevWeek} />
        <div>
          {dates[0]?.month}월 {dates[0]?.day}일 - {dates[6]?.month}월 {dates[6]?.day}일, {dates[0]?.year}년
        </div>
        <ChevronRightIcon className="h-[100%] aspect-[1/1] cursor-pointer" onClick={handleNextWeek} />
      </div>

      <div className="grid grid-cols-8 text-center">
        <div className="border-b py-2 font-bold border-gray-400"><br />시간</div>
        {days.map((day, i) => (
          <div key={day} className="border-b py-2 border-gray-400">
            <div className="font-bold">{day}</div>
            <div className="text-sm text-gray-500">{dates[i]?.day}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8">
        {Array.from({ length: 48 }, (_, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            <div className="text-xs flex items-center justify-center border-b border-l border-r border-gray-400 h-8">
              {rowIndex % 2 === 0 ? hours[rowIndex] : ''}
            </div>
            {days.map((_, colIndex) => {
              const blockKey = `${rowIndex}-${colIndex}`;
              const isEditable = isEditing && selectedUser;
              const isSelectedUserActive = isEditable && scheduleData[weekKey]?.[selectedUser]?.has(blockKey);
              const isPreview = previewBlocks.has(blockKey);
              const blockUsers = Object.entries(currentWeekUsers)
                .filter(([_, blocks]) => blocks?.has?.(blockKey))
                .map(([user]) => user);
              const visibleUsers = blockUsers.slice(0, 2);
              const hasMore = blockUsers.length > 2;
              const isDetailOpen = openDetailBlock === blockKey;

              return (
                <div
                  key={blockKey}
                  className={`relative h-8 border border-gray-300 transition duration-100 ${
                    isEditable ? 'hover:border-blue-400 hover:cursor-pointer' : ''
                  }`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleMouseDown(rowIndex, colIndex);
                  }}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  onClick={() =>
                    !isEditing && setOpenDetailBlock(prev => (prev === blockKey ? null : blockKey))
                  }
                  style={{
                    backgroundColor: isSelectedUserActive
                      ? getUserColor(selectedUser)
                      : isPreview
                      ? 'rgba(0, 0, 255, 0.2)'
                      : 'transparent',
                    cursor: isEditable ? 'pointer' : 'default',
                  }}
                >
                  {!isEditing && blockUsers.length > 0 && (
                    <div className="absolute left-1 top-1 flex gap-[2px] items-center group">
                      {visibleUsers.map(user => (
                        <div
                          key={user}
                          className="w-4 h-4 text-[10px] rounded-full text-white flex items-center justify-center"
                          style={{ backgroundColor: getUserColor(user) }}
                          title={user}
                        >
                          {user[0]}
                        </div>
                      ))}
                      {hasMore && (
                        <>
                          <span className="text-[10px]">...</span>
                          <div className="absolute top-full left-0 mt-1 p-2 bg-white border rounded shadow-md z-50 hidden group-hover:block">
                            {blockUsers
                              .sort((a, b) => a.localeCompare(b))
                              .map(user => (
                                <div key={user} className="flex items-center gap-1 text-xs whitespace-nowrap">
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: getUserColor(user) }}
                                  ></div>
                                  {user}
                                </div>
                              ))}
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

