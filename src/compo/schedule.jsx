import { useState } from 'react';
import '../App.css';

import MonthSchedule from './monthSchedule.jsx';
import WeekSchedule from './weeekSchedule.jsx';
import { NumericFormat } from 'react-number-format';

export default function Schedule() {
  const [scheduleType, setScheduleType] = useState('month'); // 'month' or 'week'
  const [isModify, setIsModify] = useState(false); // 수정 모드 여부
  const [showModal, setShowModal] = useState(false); // 모달 표시 여부

  // 수당 상태
  const [allowances, setAllowances] = useState({
    주휴수당: true,
    야근수당: false,
    초과수당: false,
    휴일근무수당: false
  });

  const month_blue = scheduleType === 'month' ? 'text-blue-400 font-bold' : 'text-gray-400';
  const week_blue = scheduleType === 'week' ? 'text-blue-400 font-bold' : 'text-gray-400';

  const scheduleItems = [
    { name: "Mom's Touch", wage: 12000 },
    { name: "버거킹", wage: 9125 },
  ];

  // 수당 토글 핸들러
  const toggleAllowance = (key) => {
    setAllowances(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <>
      <div className='w-full'>
        {/* 월/주 + 수정 컨테이너 */}
        <div className='w-full flex justify-between'>
          <div className='ml-4 w-[20%] aspect-[10/3] flex border border-gray-300 rounded-[8px] mt-5'>
            <div className={`w-[50%] border-r border-gray-300 flex justify-center items-center ${month_blue} cursor-pointer`} onClick={() => setScheduleType("month")}>월</div>
            <div className={`w-[50%] border-r border-gray-300 flex justify-center items-center ${week_blue} cursor-pointer`} onClick={() => setScheduleType("week")}>주</div>
          </div>
          {
            isModify ? (
              <div className='flex justify-center items-center mr-4 mt-8'>
                <div className='mr-4 text-red-400 cursor-pointer' onClick={() => setIsModify(false)}>취소</div>
                <div className='text-blue-400 cursor-pointer' onClick={() => setIsModify(false)}>저장</div>
              </div>
            ) : (
              <div className='mr-4 mt-8 text-blue-400 cursor-pointer' onClick={() => {
                setIsModify(true);
                setScheduleType('week');
              }}>수정</div>
            )
          }
        </div>

        {/* 시간표 컴포넌트 */}
        {
          scheduleType === 'month' ? (
            <MonthSchedule />
          ) : (
            <WeekSchedule isModify={isModify} />
          )
        }

        {/* 일정 선택 섹션 */}
        <div className="mt-4 border-t border-gray-300 pt-4">
          <p className="text-center text-gray-500 mb-2">일정 선택</p>
          <div className="flex flex-col gap-4">
            {scheduleItems.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-white rounded-xl shadow-[0px_3px_4px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0px_3px_4px_rgba(0,0,0,0.20)] ml-4 mr-4"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1">시급: {item.wage.toLocaleString()}원</p>
                </div>
                {isModify && (
                  <button className="text-xs text-blue-600 hover:underline">수정</button>
                )}
              </div>
            ))}
            <button
              onClick={() => setShowModal(true)}
              className="py-6 text-center text-2xl text-gray-400 bg-gray-100 rounded-xl shadow-[0px_3px_4px_rgba(0,0,0,0.12)] hover:shadow-[0px_3px_4px_rgba(0,0,0,0.20)] transition-shadow ml-4 mr-4"
            >
              ＋
            </button>
          </div>
          <div className="w-full h-[300px]"></div>
        </div>
      </div>

      {/* 일정 등록 모달 */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div className="bg-white w-[90%] max-w-sm rounded-xl p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-lg font-bold mb-4">일정 등록</h2>
            <input
              type="text"
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
                onValueChange={(values) => {}}
              />
            </div>
            <p className="text-xs text-gray-500 mb-3">최저 10,030원</p>

            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              {Object.entries(allowances).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => toggleAllowance(key)}
                  className={`rounded p-2 text-center border ${
                    value
                      ? 'bg-blue-400 text-white'
                      : 'bg-gray-100 text-gray-400 border-gray-200'
                  }`}
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
              <button className="w-[48%] py-2 bg-blue-400 text-white rounded"
                onClick={() => setShowModal(false)}
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
