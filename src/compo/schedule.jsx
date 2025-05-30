import { useState } from 'react';
import '../App.css';

import MonthSchedule from './monthSchedule.jsx';
import WeekSchedule from './weeekSchedule.jsx';
import { NumericFormat } from 'react-number-format';
import { AnimatePresence, motion } from 'framer-motion';

import { useAuthStore } from '../js/store.js';
import dummySchedule from '../js/dummyData1.js';

export default function Schedule() {
  const [scheduleType, setScheduleType] = useState('month');
  const [isModify, setIsModify] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [entries, setEntries] = useState(dummySchedule.entries);
  const user = useAuthStore((s) => s.user);

  const [scheduleItems, setScheduleItems] = useState([
    {
      name: "Mom's Touch 알바",
      payInfo: {
        hourPrice: 12000,
        wHoliday: true,
        Holiday: false,
        overtime: false,
        night: false,
        duty: "4대보험"
      }
    },
    {
      name: "버거킹 알바",
      payInfo: {
        hourPrice: 9125,
        wHoliday: true,
        Holiday: false,
        overtime: false,
        night: false,
        duty: "4대보험"
      }
    }
  ]);

  const [newItemName, setNewItemName] = useState('');
  const [newItemWage, setNewItemWage] = useState('');
  const [allowances, setAllowances] = useState({
    주휴수당: true,
    야근수당: false,
    초과수당: false,
    휴일근무수당: false
  });

  const toggleAllowance = (key) => {
    setAllowances(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddCard = () => {
    if (!newItemName || !newItemWage) return;

    const newCard = {
      name: newItemName,
      payInfo: {
        hourPrice: parseInt(newItemWage),
        wHoliday: allowances["주휴수당"],
        night: allowances["야근수당"],
        overtime: allowances["초과수당"],
        Holiday: allowances["휴일근무수당"],
        duty: "4대보험"
      }
    };

    setScheduleItems(prev => [...prev, newCard]);
    setSelectedCard(newCard);
    setNewItemName('');
    setNewItemWage('');
    setShowModal(false);
  };

  const month_blue = scheduleType === 'month' ? 'text-blue-400 font-bold' : 'text-gray-400';
  const week_blue = scheduleType === 'week' ? 'text-blue-400 font-bold' : 'text-gray-400';

  return (
    <>
      <div className='w-full'>
        <div className='w-full flex justify-between'>
          <div className="relative ml-4 w-36 h-10 flex items-center rounded-full border border-gray-300 bg-white mt-5 overflow-hidden">
            {/* 🔵 움직이는 배경 */}
            <motion.div
              layout
              transition={{
                type: "",
                stiffness: 100,
                damping: 12,
              }}
              className="absolute top-0 w-1/2 h-full bg-green-400 rounded-full z-0"
              style={{
                left: scheduleType === "month" ? 0 : "50%",
              }}
            />

            {/* 버튼들 */}
            <div className="relative z-10 flex w-full h-full">
              <div
                className="w-1/2 flex justify-center items-center cursor-pointer text-sm"
                onClick={() => { setScheduleType("month"); setIsModify(false); }}
              >
                <span className={scheduleType === "month" ? "text-white" : "text-gray-500"}>
                  월
                </span>
              </div>
              <div
                className="w-1/2 flex justify-center items-center cursor-pointer text-sm"
                onClick={() => setScheduleType("week")}
              >
                <span className={scheduleType === "week" ? "text-white" : "text-gray-500"}>
                  주
                </span>
              </div>
            </div>
          </div>
          {isModify ? (
            <div className="flex justify-center items-center gap-4 mt-8 mr-4">
              <button
                onClick={() => {
                  setIsModify(false);
                  setSelectedCard(null);
                }}
                className="px-4 py-2 text-sm font-semibold text-green-500 bg-green-100 hover:bg-blue-200 active:scale-95 transition-all rounded-xl shadow"
              >
                취소
              </button>
              <button
                onClick={() => setIsModify(false)}
                className="px-4 py-2 text-sm font-semibold text-white bg-green-400 hover:bg-green-500 active:scale-95 transition-all rounded-xl shadow"
              >
                저장
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsModify(true);
                setScheduleType('week');
              }}
              className="mt-8 mr-4 px-4 py-2 text-sm font-semibold text-white bg-green-400 hover:bg-green-500 active:scale-95 transition-all rounded-full shadow"
            >
              수정
            </button>
          )}
        </div>

        <AnimatePresence mode="wait">
          {scheduleType === 'month' && (
            <motion.div
              key="month"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <MonthSchedule />
            </motion.div>
          )}
          {scheduleType === 'week' && (
            <motion.div
              key="week"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <WeekSchedule
                isModify={isModify}
                selectedCard={selectedCard}
                entries={entries}
                setEntries={setEntries}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 border-t border-gray-300 pt-4">
          <p className="text-center text-gray-500 mb-2">일정 선택</p>
          <div className="flex flex-col gap-4">
            {scheduleItems.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  setSelectedCard(
                    selectedCard?.name === item.name ? null : item
                  )
                }
                className={`flex justify-between items-center p-4 rounded-xl shadow hover:shadow-md cursor-pointer ml-4 mr-4 transition-all 
                  ${selectedCard?.name === item.name ? 'bg-blue-100' : 'bg-white'}
                `}
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1">시급: {item.payInfo.hourPrice.toLocaleString()}원</p>
                </div>
                {isModify && (
                  <button className="text-xs text-blue-600 hover:underline">수정</button>
                )}
              </div>
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="py-6 text-center text-2xl text-gray-400 bg-gray-100 rounded-xl shadow ml-4 mr-4 hover:bg-gray-200 cursor-pointer"
            >
              ＋
            </button>
          </div>
          <div className="w-full h-[300px]"></div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white w-[90%] max-w-sm rounded-xl p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-center text-lg font-bold mb-4">일정 등록</h2>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="이름을 지어주세요 (예: 알바이름)"
              className="w-full border border-gray-300 rounded p-2 mb-3"
            />
            <div className="relative w-full mb-3">
              <NumericFormat
                thousandSeparator
                suffix=" 원"
                allowNegative={false}
                placeholder="시급을 입력해주세요 (예: 12,000)"
                className="w-full border border-gray-300 rounded p-2 pr-10"
                value={newItemWage}
                onValueChange={(values) => setNewItemWage(values.value)}
              />
            </div>
            <p className="text-xs text-gray-500 mb-3">최저 10,030원</p>

            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              {Object.entries(allowances).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => toggleAllowance(key)}
                  className={`rounded p-2 text-center border ${value ? 'bg-blue-400 text-white' : 'bg-gray-100 text-gray-400 border-gray-200'}`}
                >
                  {key} {value ? 'O' : 'X'}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-10">
              <button
                className="w-[48%] py-2 bg-gray-300 text-white rounded"
                onClick={() => setShowModal(false)}
              >
                취소
              </button>
              <button
                className="w-[48%] py-2 bg-blue-400 text-white rounded"
                onClick={handleAddCard}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
