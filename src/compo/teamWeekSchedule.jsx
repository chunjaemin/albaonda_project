import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getWeekDates } from '../js/scheduleDate.js';
import { getUserColor } from '../js/colorUtils';

export default function TeamWeekSchedule({
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
  const [dragMode, setDragMode] = useState(null);
  const [startCell, setStartCell] = useState(null);
  const [endCell, setEndCell] = useState(null);
  const [previewBlocks, setPreviewBlocks] = useState(new Set());
  const [hoveredUsers, setHoveredUsers] = useState([]);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

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

  const weekKey = `${currentWeekStart.year}-${String(currentWeekStart.month).padStart(2, '0')}-${String(currentWeekStart.day).padStart(2, '0')}`;

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

  const handleMouseEnter = (row, col, e) => {
    if (!startCell || !isMouseDown) return;
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

  const handleHover = (blockUsers, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredUsers(blockUsers);
    setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top - 8 });
  };

  const handleLeave = () => {
    setHoveredUsers([]);
  };

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

  const currentWeekUsers = scheduleData[weekKey] || {};
  if (!isValidWeekStart) {
    return <div className="p-4">날짜 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className="p-4 mb-4 relative">
      <div className="w-full aspect-[10/1] flex justify-between items-center pt-3 pb-3">
        <ChevronLeftIcon className="w-6 h-6 cursor-pointer" onClick={handlePrevWeek} />
        <div>
          {dates[0]?.month}월 {dates[0]?.day}일 - {dates[6]?.month}월 {dates[6]?.day}일, {dates[0]?.year}년
        </div>
        <ChevronRightIcon className="w-6 h-6 cursor-pointer" onClick={handleNextWeek} />
      </div>

      <div className="grid grid-cols-8 text-center mb-1">
        <div className="font-bold"><br />시간</div>
        {days.map((day, i) => (
          <div key={day}>
            <div className="font-bold">{day}</div>
            <div className="text-sm text-gray-500">{dates[i]?.day}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8">
        {Array.from({ length: 48 }, (_, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            <div className={`text-xs flex items-center justify-center h-8 ${rowIndex % 2 === 0 ? 'bg-green-200' : 'bg-green-100'}`}>
              {rowIndex % 2 === 0 ? hours[rowIndex] : ''}
            </div>
            {days.map((_, colIndex) => {
              const blockKey = `${rowIndex}-${colIndex}`;
              const isEditable = isEditing && selectedUser;
              const isPreview = previewBlocks.has(blockKey);
              const blockUsers = Object.entries(currentWeekUsers)
                .filter(([_, blocks]) => blocks?.has?.(blockKey))
                .map(([user]) => user);

              if (isEditable && isPreview && selectedUser && !blockUsers.includes(selectedUser)) {
                blockUsers.push(selectedUser);
              }

              const visibleUsers = blockUsers.slice(0, 3);
              const hiddenCount = blockUsers.length - 3;

              return (
                <div
                  key={blockKey}
                  className={`
                    relative h-8 border-t border-r border-gray-300 transition duration-100 
                    ${rowIndex === 47 ? 'border-b' : ''}
                    ${isEditable ? 'hover:border-blue-400 hover:cursor-pointer' : ''}
                    ${isPreview ? 'border-2 border-blue-500 border-dashed animate-pulse bg-blue-100/30' : ''}
                  `}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleMouseDown(rowIndex, colIndex);
                  }}
                  onMouseEnter={(e) => {
                    handleMouseEnter(rowIndex, colIndex, e);
                    handleHover(blockUsers, e);
                  }}
                  onMouseLeave={handleLeave}
                >
                  {blockUsers.length > 0 && (
                    <div className="flex items-center relative h-full overflow-visible pl-[2px]">
                      {visibleUsers.map((user, idx) => (
                        <div
                          key={user}
                          className={`w-6 h-6 rounded-full text-[10px] text-white flex items-center justify-center border border-white ${idx > 0 ? '-ml-2' : ''}`}
                          style={{ backgroundColor: getUserColor(user) }}
                        >
                          {user[0]}
                        </div>
                      ))}
                      {hiddenCount > 0 && (
                        <div className={`w-6 h-6 rounded-full bg-gray-300 text-[10px] text-black flex items-center justify-center border border-white -ml-2`}>
                          +{hiddenCount}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredUsers.length > 0 && (
        <div
          className="fixed z-50 bg-white shadow-lg border border-gray-300 rounded-md p-2 text-sm"
          style={{ left: tooltipPosition.x, top: tooltipPosition.y, transform: 'translate(-50%, -100%)' }}
        >
          {hoveredUsers.map(user => (
            <div key={user} className="flex items-center space-x-2 mb-1 last:mb-0">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getUserColor(user) }}></div>
              <div>{user}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
