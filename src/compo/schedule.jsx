import { useState, useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { postPersonalScheduleEntries, fetchWeekSchedule, deletePersonalScheduleEntries } from '../js/api/schedule';
import '../App.css';

import MonthSchedule from './monthSchedule.jsx';
import WeekSchedule from './weeekSchedule.jsx';
import ScheduleCardInfoModal from './scheduleCardInfoModal.jsx';

import { NumericFormat } from 'react-number-format';
import { AnimatePresence, motion } from 'framer-motion';

import { useAuthStore } from '../js/store.js';

export default function Schedule() {
  const [scheduleType, setScheduleType] = useState('month');
  const [isModify, setIsModify] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCardInfoModal, setSelectedCardInfoModal] = useState(null);
  const [editingCard, setEditingCard] = useState(null); // 현재 수정 중인 카드
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [localEntries, setLocalEntries] = useState([]);
  const [deletedEntryIds, setDeletedEntryIds] = useState([]); // 🆕 삭제된 일정 ID 저장

  const weekRef = useRef(null); // ✅ ref 추가

  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("entries");
    return saved ? JSON.parse(saved) : dummySchedule.entries;
  });
  const [originalEntries, setOriginalEntries] = useState(null); // 🔁 롤백용 백업

  const user = useAuthStore((s) => s.user);

  const [scheduleItems, setScheduleItems] = useState(() => {
    const saved = localStorage.getItem("scheduleItems");
    return saved ? JSON.parse(saved) : [
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
    ];
  });

  const [newItemName, setNewItemName] = useState('');
  const [newItemWage, setNewItemWage] = useState('');
  const [allowances, setAllowances] = useState({
    주휴수당: true,
    야근수당: false,
    초과수당: false,
    휴일근무수당: false
  });

  const today = dayjs().format('YYYY-MM-DD');
  const queryClient = useQueryClient();

  const {
    data: entries = [],
    isLoading,
    isError
  } = useQuery({
    queryKey: ['weekSchedule', user.id, today],
    queryFn: () => fetchWeekSchedule(user.id, today),
    enabled: !!user?.id,
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

    const updated = [...scheduleItems, newCard];
    setScheduleItems(updated);
    localStorage.setItem("scheduleItems", JSON.stringify(updated));

    setNewItemName('');
    setNewItemWage('');
    setShowModal(false);
  };



  // 저장 버튼 로직 handleSaveToServer 에서 삭제 반영
  const handleSaveToServer = async () => {
    const tempEntries = weekRef.current?.getTemporaryEntries?.();
    const hasNew = tempEntries && tempEntries.length > 0;
    const hasDelete = deletedEntryIds && deletedEntryIds.length > 0;

    if (!hasNew && !hasDelete) {
      alert("저장할 내용이 없습니다.");
      return;
    }

    try {
      let result = { success: true };
      if (hasNew) {
        result = await postPersonalScheduleEntries(user.id, tempEntries);
      }

      let deleteResult = { success: true };
      if (hasDelete) {
        deleteResult = await deletePersonalScheduleEntries(user.id, deletedEntryIds);
      }

      if (result.success && deleteResult.success) {
        setLocalEntries(prev => prev.filter(e => !e.isTemporary));
        weekRef.current.clearTemporaryEntries?.();
        setDeletedEntryIds([]);
        queryClient.invalidateQueries(['weekSchedule', user.id, today]);
        setIsModify(false);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert("저장 실패");
      }
    } catch (e) {
      alert("저장 중 오류 발생: " + e.message);
    }
  };

  const handleDeleteEntry = (entryId) => {
    if (!isModify) return;

    // 삭제 ID 기록
    setDeletedEntryIds(prev => [...prev, entryId]);

    // 화면에서 바로 안 보이게 필터링
    setLocalEntries(prev => prev.filter(e => e.id !== entryId));
  };

  const month_blue = scheduleType === 'month' ? 'text-blue-400 font-bold' : 'text-gray-400';
  const week_blue = scheduleType === 'week' ? 'text-blue-400 font-bold' : 'text-gray-400';

  return (
    <>
      <div className='w-full'>
        {saveSuccess && (
          <div className="fixed top-3 left-1/2 -translate-x-1/2 bg-green-200 text-green-800 px-4 py-2 rounded shadow z-50">
            ✅ 일정이 저장되었습니다!
          </div>
        )}
        <div className='w-full flex justify-between'>
          <div className="relative ml-4 w-36 h-10 flex items-center rounded-full shadow shadow-sm bg-white mt-5 overflow-hidden">
            <motion.div
              layout
              transition={{ type: '', stiffness: 100, damping: 12 }}
              className="absolute top-0 w-1/2 h-full bg-green-400 rounded-full z-0"
              style={{ left: scheduleType === "month" ? 0 : "50%" }}
            />
            <div className="relative z-10 flex w-full h-full">
              <div
                className="w-1/2 flex justify-center items-center cursor-pointer text-sm"
                onClick={() => { setScheduleType("month"); setIsModify(false); }}
              >
                <span className={scheduleType === "month" ? "text-white" : "text-gray-500"}>월</span>
              </div>
              <div
                className="w-1/2 flex justify-center items-center cursor-pointer text-sm"
                onClick={() => setScheduleType("week")}
              >
                <span className={scheduleType === "week" ? "text-white" : "text-gray-500"}>주</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-end gap-4 mt-8 mr-4 min-w-[160px]">
            <AnimatePresence>
              {isModify && (
                <motion.div
                  key="cancel-wrapper"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
                  className="inline-block"
                >
                  <button
                    onClick={() => {
                      if (originalEntries) {
                        setEntries(originalEntries);         // 🔁 복원
                        setOriginalEntries(null);            // 백업 제거
                      }
                      setIsModify(false);                    // 수정 모드 종료
                      setSelectedCard(null);                // 카드 선택 해제
                    }}
                    className="px-4 py-2 text-sm font-semibold text-green-500 bg-green-100 hover:bg-green-200 active:scale-95 transition-all rounded-xl shadow"
                  >
                    취소
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              onClick={() => {
                if (isModify) {
                  // ✅ 저장 시에만 localStorage 갱신
                  localStorage.setItem("entries", JSON.stringify(entries));
                  localStorage.setItem("scheduleItems", JSON.stringify(scheduleItems));
                  setOriginalEntries(null);
                  setIsModify(false);
                } else {
                  setOriginalEntries(JSON.parse(JSON.stringify(entries))); // 깊은 복사
                  setIsModify(true);
                  setScheduleType('week');
                }
              }}
              className="px-4 py-2 text-sm font-semibold text-white bg-green-400 hover:bg-green-500 active:scale-95 transition-all rounded-full shadow"
            >
              {isModify ? '저장' : '수정'}
            </motion.button>
          </div>
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
                ref={weekRef}
                isModify={isModify}
                selectedCard={selectedCard}
                entries={[...(entries ?? []), ...(localEntries ?? [])]}
                // entries={[]}
                setEntries={setLocalEntries}
                onDeleteEntry={handleDeleteEntry} // ✅ 추가
                deletedEntryIds={deletedEntryIds} // ✅ 추가
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
                onClick={() => {
                  if (isModify) {
                    setSelectedCard(
                      selectedCard?.name === item.name ? null : item
                    );
                  } else {
                    setSelectedCardInfoModal(item); // 💡 모달 열기
                  }
                }}
                className={`flex justify-between items-center p-4 rounded-xl shadow hover:shadow-md cursor-pointer ml-4 mr-4 transition-all 
                  ${selectedCard?.name === item.name ? 'bg-blue-100' : 'bg-white'}
                `}
              >
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500 mt-1">시급: {item.payInfo.hourPrice.toLocaleString()}원</p>
                </div>
                {isModify && (
                  <button
                    className="text-xs text-blue-600 hover:underline"
                    onClick={() => setEditingCard(item)} // ✨ 클릭 시 해당 카드 수정 모드
                  >
                    수정
                  </button>
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

      {/* 하단 스케쥴 카드뷰 디테일 창 */}
      {selectedCardInfoModal && (
        <ScheduleCardInfoModal
          card={selectedCardInfoModal}
          onClose={() => setSelectedCardInfoModal(null)}
        />
      )}

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
                  className={`rounded p-2 text-center border ${value ? 'bg-green-400 text-white' : 'bg-gray-100 text-gray-400 border-gray-200'}`}
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
                className="w-[48%] py-2 bg-green-400 text-white rounded"
                onClick={handleAddCard}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 카드뷰 수정모달 */}
      {editingCard && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50" onClick={() => setEditingCard(null)}>
          <div
            className="bg-white w-[90%] max-w-sm rounded-xl p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-center text-lg font-bold mb-4">일정 수정</h2>

            <input
              type="text"
              value={editingCard.name}
              onChange={(e) =>
                setEditingCard({ ...editingCard, name: e.target.value })
              }
              className="w-full border border-gray-300 rounded p-2 mb-3"
            />

            <NumericFormat
              thousandSeparator
              suffix=" 원"
              allowNegative={false}
              placeholder="시급 입력"
              className="w-full border border-gray-300 rounded p-2 mb-3"
              value={editingCard.payInfo.hourPrice}
              onValueChange={(values) =>
                setEditingCard({
                  ...editingCard,
                  payInfo: {
                    ...editingCard.payInfo,
                    hourPrice: parseInt(values.value || "0"),
                  },
                })
              }
            />

            <div className="grid grid-cols-2 gap-2 text-sm mb-4">
              {["주휴수당", "야근수당", "초과수당", "휴일근무수당"].map((label) => {
                const keyMap = {
                  주휴수당: "wHoliday",
                  야근수당: "night",
                  초과수당: "overtime",
                  휴일근무수당: "Holiday",
                };
                const key = keyMap[label];
                const current = editingCard.payInfo[key];
                return (
                  <button
                    key={label}
                    onClick={() =>
                      setEditingCard({
                        ...editingCard,
                        payInfo: {
                          ...editingCard.payInfo,
                          [key]: !current,
                        },
                      })
                    }
                    className={`rounded p-2 cursor-pointer ${current ? "bg-green-400 text-white hover:bg-green-500 " : "bg-gray-100 text-gray-400 hover:bg-gray-200 "
                      }`}
                  >
                    {label} {current ? "O" : "X"}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between">
              <button
                className="w-[48%] py-2 bg-gray-300 text-white rounded cursor-pointer hover:bg-gray-400"
                onClick={() => setEditingCard(null)}
              >
                취소
              </button>
              <button
                className="w-[48%] py-2 bg-green-400 text-white rounded cursor-pointer hover:bg-green-500"
                onClick={() => {
                  const updated = scheduleItems.map((item) =>
                    item.name === editingCard.name ? editingCard : item
                  );
                  setScheduleItems(updated);

                  // ✅ 저장 버튼 눌렀을 때만 로컬 저장
                  localStorage.setItem("scheduleItems", JSON.stringify(updated));

                  setEditingCard(null);
                }}
              >
                저장
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
