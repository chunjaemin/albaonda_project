import { useEffect, useState } from 'react';
import '../App.css';
import TeamMonthSchedule from './teamMonthSchedule.jsx';
import TeamWeekSchedule from './teamWeekSchedule.jsx';
import { getCurrentStartOfWeek } from '../js/scheduleDate.js';
import { AnimatePresence, motion } from 'framer-motion'; // 추가된 부분

export default function TeamSchedule() {
  const [scheduleType, setScheduleType] = useState('month');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [scheduleData, setScheduleData] = useState({});

  const rawDate = getCurrentStartOfWeek();
  const parsedDate = {
    year: rawDate.getFullYear(),
    month: rawDate.getMonth() + 1,
    day: rawDate.getDate(),
  };
  const [currentWeekStart, setCurrentWeekStart] = useState(parsedDate);

  const users = [
    { name: '김점장', role: '점장' },
    { name: '이직원', role: '직원' },
    { name: '박알바', role: '알바' },
  ];

  const handleTabClick = (type) => {
    if (type === 'month') setIsEditing(false);
    setScheduleType(type);
  };

  const handleToggleEdit = () => {
    if (!isEditing) setScheduleType('week');
    setIsEditing((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <div className="relative ml-4 w-36 h-10 flex items-center rounded-full shadow shadow-sm bg-white mt-5 overflow-hidden">
          <motion.div
            layout
            transition={{ type: '', stiffness: 100, damping: 12 }}
            className="absolute top-0 w-1/2 h-full bg-green-400 rounded-full z-0"
            style={{ left: scheduleType === 'month' ? 0 : '50%' }}
          />
          <div className="relative z-10 flex w-full h-full">
            <div
              className="w-1/2 flex justify-center items-center cursor-pointer text-sm"
              onClick={() => handleTabClick('month')}
            >
              <span className={scheduleType === 'month' ? 'text-white' : 'text-gray-500'}>월</span>
            </div>
            <div
              className="w-1/2 flex justify-center items-center cursor-pointer text-sm"
              onClick={() => handleTabClick('week')}
            >
              <span className={scheduleType === 'week' ? 'text-white' : 'text-gray-500'}>주</span>
            </div>
          </div>
        </div>

        {isEditing ? (
          <div className="flex justify-center items-center gap-4 mt-8 mr-4">
            <button
              onClick={() => {
                setIsEditing(false);
                setSelectedUser(null);
              }}
              className="px-4 py-2 text-sm font-semibold text-green-500 bg-green-100 hover:bg-green-200 rounded-xl shadow"
            >
              취소
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-semibold text-white bg-green-400 hover:bg-green-500 rounded-xl shadow"
            >
              저장
            </button>
          </div>
        ) : (
          <button
            onClick={handleToggleEdit}
            className="mt-8 mr-4 px-4 py-2 text-sm font-semibold text-white bg-green-400 hover:bg-green-500 rounded-full shadow"
          >
            수정
          </button>
        )}
      </div>

      {isEditing && (
        <div className="px-4 py-2 flex flex-col gap-2">
          {['점장', '직원', '알바'].map((role) => {
            const roleUsers = users.filter((user) => user.role === role);
            return (
              <div key={role} className="flex items-center gap-2">
                <div className="font-semibold w-[50px]">{role}:</div>
                <div className="flex gap-3">
                  {roleUsers.map((user) => (
                    <div
                      key={user.name}
                      className={`text-sm pb-1 hover:cursor-pointer hover:underline ${selectedUser === user.name ? 'text-blue-500 font-semibold' : ''
                        }`}
                      onClick={() => setSelectedUser(user.name)}
                    >
                      {user.name}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence mode="wait">
        {isEditing || scheduleType === 'week' ? (
          <motion.div
            key="week"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <TeamWeekSchedule
              isEditing={isEditing}
              selectedUser={selectedUser}
              scheduleData={scheduleData}
              setScheduleData={setScheduleData}
              currentWeekStart={currentWeekStart}
              setCurrentWeekStart={setCurrentWeekStart}
            />
          </motion.div>
        ) : (
          <motion.div
            key="month"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <TeamMonthSchedule
              isEditing={isEditing}
              scheduleData={scheduleData}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
