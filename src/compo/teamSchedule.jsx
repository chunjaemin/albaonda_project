import { useEffect, useState } from 'react';
import '../App.css';
import TeamMonthSchedule from './teamMonthSchedule.jsx';
import TeamWeekSchedule from './teamWeekSchedule.jsx';
import { getCurrentStartOfWeek } from '../js/scheduleDate.js';
import { AnimatePresence, motion } from 'framer-motion'; // 추가된 부분
import dummyUsers from '../js/dummyUsers.js';

import { useCurrentTeamIdStore } from '../js/store';
import { dummyTeamSchedule1, dummyTeamSchedule2 } from '../js/dummyTeamData';

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

  const transformEntriesToWeeklyMap = (entries) => {
    const weeklyMap = {};

    entries.forEach((entry) => {
      const date = new Date(entry.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay()); // Sunday 기준
      const weekKey = `${weekStart.getFullYear()}-${String(weekStart.getMonth() + 1).padStart(2, '0')}-${String(weekStart.getDate()).padStart(2, '0')}`;

      const dayIndex = date.getDay(); // 0 = 일, 6 = 토
      const block = `0-${dayIndex}`; // 예시. 실제로는 시간 블록으로 쪼개도 됨

      if (!weeklyMap[weekKey]) weeklyMap[weekKey] = {};
      if (!weeklyMap[weekKey][entry.name]) weeklyMap[weekKey][entry.name] = new Set();

      weeklyMap[weekKey][entry.name].add(block);
    });

    return weeklyMap;
  };

  function parseScheduleDataFromLocalStorage(jsonString) {
    const parsed = JSON.parse(jsonString);
    for (const week in parsed) {
      for (const user in parsed[week]) {
        parsed[week][user] = new Set(parsed[week][user]); // 배열 → Set 복원
      }
    }
    return parsed;
  }

  const saveScheduleToLocalStorage = () => {
    const localKey = `team-schedule-${teamId}`;
    const serializableData = {};

    for (const week in scheduleData) {
      serializableData[week] = {};
      for (const user in scheduleData[week]) {
        serializableData[week][user] = Array.from(scheduleData[week][user]); // Set → Array
      }
    }

    localStorage.setItem(localKey, JSON.stringify(serializableData));
  };

  const teamId = useCurrentTeamIdStore(state => state.id);

  useEffect(() => {
    const localKey = `team-schedule-${teamId}`;
    const storedData = localStorage.getItem(localKey);

    if (storedData) {
      try {
        const parsed = parseScheduleDataFromLocalStorage(storedData);
        setScheduleData(parsed);
      } catch (e) {
        console.error("❌ 로컬 저장소 파싱 실패:", e);
        const fallback = transformEntriesToWeeklyMap(dummyTeamSchedule1.entries);
        setScheduleData(fallback);
        localStorage.setItem(localKey, JSON.stringify(fallback));
      }
    } else {
      const baseData =
        teamId === 'team001'
          ? transformEntriesToWeeklyMap(dummyTeamSchedule1.entries)
          : transformEntriesToWeeklyMap(dummyTeamSchedule2.entries);

      setScheduleData(baseData);
      localStorage.setItem(localKey, JSON.stringify(baseData));
    }
  }, [teamId]);

  const users = dummyUsers;
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
              onClick={() => {
                saveScheduleToLocalStorage(); // ✅ 저장 호출
                setIsEditing(false);
              }}
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
          {['관리자', '직원', '알바'].map((role) => {
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
