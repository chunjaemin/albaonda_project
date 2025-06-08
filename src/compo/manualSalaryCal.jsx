import { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import '../App.css';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const weekdays = ['월', '화', '수', '목', '금', '토', '일'];
const hours = Array.from({ length: 25 }, (_, i) => i);
const minutes = [0, 30];

const taxText = {
  '4대 보험 포함': '4대 보험 (9.32%)',
  '소득세 포함': '소득세 (3.3%)',
  '안할래요': '세금 없음'
}

export default function ManualSalaryCal() {
  const [payType, setPayType] = useState('시급');
  const [wage, setWage] = useState('');
  const [workHour, setWorkHour] = useState('0');
  const [workMinute, setWorkMinute] = useState('0');
  const [overtimeHour, setOvertimeHour] = useState('0');
  const [overtimeMinute, setOvertimeMinute] = useState('0');
  const [workingDays, setWorkingDays] = useState([]);
  const [holidayApplied, setHolidayApplied] = useState(null);
  const [taxType, setTaxType] = useState('');
  const [result, setResult] = useState(null);
  const [expanded, setExpanded] = useState({});

  const toggleDay = (day) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const resetForm = () => {
    setPayType('시급');
    setWage('');
    setWorkHour('0');
    setWorkMinute('0');
    setOvertimeHour('0');
    setOvertimeMinute('0');
    setWorkingDays([]);
    setHolidayApplied(null);
    setTaxType('');
    setResult(null);
    setExpanded({});
  };

  const toggleSection = (type) => {
    setExpanded(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleSubmit = async () => {
    const payload = {
      workingDays,
      workHour: Number(workHour || 0),
      workMinute: Number(workMinute || 0),
      overtimeHour: Number(overtimeHour || 0),
      overtimeMinute: Number(overtimeMinute || 0),
      nightWork: false,
      payType,
      payAmount: Number(wage || 0),
      includeWeeklyAllowance: holidayApplied,
      taxOption: taxType === '4대 보험 포함'
        ? 'insurance'
        : taxType === '소득세 포함'
          ? 'income'
          : 'none'
    };

    try {
      const res = await axios.post("http://localhost:8000/manual-calculate", payload);
      setResult(res.data);
    } catch (err) {
      console.error("❌ 오류 발생:", err);
      alert("급여 계산 중 오류가 발생했습니다.");
    }
  };

  const renderResultBox = (type, label) => {
    if (!result?.byType?.[type]) return null;
    const data = result.byType[type];
    const isOpen = expanded[type];

    return (
      <div className="border border-gray-200 rounded-xl overflow-hidden shadow-xs my-4 transition-all">
        <button
          className="w-full flex justify-between items-center px-5 py-4 bg-green-50 hover:bg-green-100 text-base font-medium text-gray-800"
          onClick={() => toggleSection(type)}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm">{label}</span>
          </div>
          <div className="text-gray-500">
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </button>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              layout
              key="content"
              initial={{ opacity: 0}}
              animate={{ opacity: 1}}
              exit={{ opacity: 0}}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="px-6 pb-5 pt-2 bg-gray-50 text-sm text-gray-700 space-y-1"
            >
              <div>💼 {label} (세금 미포함): {data.base.toLocaleString()}원</div>
              <div>⏱️ 연장수당: {data.overtime.toLocaleString()}원</div>
              <div>📅 주휴수당: {data.weeklyAllowance.toLocaleString()}원</div>
              <div>🧾 {taxText[taxType]}: -{data.tax.toLocaleString()}원</div>
              <div className='w-full h-2 border-b border-gray-400 border-dashed'></div>
              <div className="font-semibold text-green-700">💰 합계{type ==='hourly' ? " (연장수당 미포함)" : ''} : {data.net.toLocaleString()}원</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="p-8 w-full mx-auto bg-white">
      <label className="block mb-2 font-semibold">급여 <span className='text-red-400'>*</span></label>
      <div className="flex gap-2 mb-2">
        <select
          className="border border-gray-300 rounded p-2"
          value={payType}
          onChange={(e) => setPayType(e.target.value)}
        >
          <option value="시급">시급</option>
          <option value="일급">일급</option>
          <option value="월급">월급</option>
        </select>
        <NumericFormat
          value={wage}
          onValueChange={({ value }) => setWage(value)}
          thousandSeparator
          suffix=" 원"
          allowNegative={false}
          className="w-full border border-gray-300 px-3 py-2 rounded"
          placeholder="금액 입력"
        />
      </div>
      <div className="flex items-center gap-2 mb-[10%]">
        <button className="text-xs bg-green-500 text-white px-2 py-1 rounded" onClick={() => setWage('10030')}>
          최저 10,030원
        </button>
        {[100, 1000, 10000].map((v) => (
          <button
            key={v}
            className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
            onClick={() => setWage((prev) => `${Number(prev || 0) + v}`)}
          >
            +{v.toLocaleString()}원
          </button>
        ))}
      </div>

      <label className="block mb-2 font-semibold">하루 근무시간</label>
      <div className="flex gap-2 mb-[10%]">
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={workHour}
          onChange={(e) => setWorkHour(e.target.value)}
        >
          {hours.map((h) => (
            <option key={h} value={h}>{h}시간</option>
          ))}
        </select>
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={workMinute}
          onChange={(e) => setWorkMinute(e.target.value)}
        >
          {minutes.map((m) => (
            <option key={m} value={m}>{m}분</option>
          ))}
        </select>
      </div>

      <label className="block mb-2 font-semibold">근무일 <span className='text-red-400'>*</span></label>
      <div className="grid grid-cols-7 gap-1 mb-[10%]">
        {weekdays.map((day) => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`py-2 px-1 rounded border ${workingDays.includes(day)
              ? 'bg-green-500 text-white border-none'
              : 'bg-white hover:bg-gray-200 border-gray-300'}`}
          >
            {day}
          </button>
        ))}
      </div>

      <label className="block mb-2 font-semibold">하루 연장 근무시간 <span title="연장근무는 8시간 초과분입니다">ⓘ</span></label>
      <div className="flex gap-2 mb-[10%]">
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={overtimeHour}
          onChange={(e) => setOvertimeHour(e.target.value)}
        >
          {hours.map((h) => (
            <option key={h} value={h}>{h}시간</option>
          ))}
        </select>
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={overtimeMinute}
          onChange={(e) => setOvertimeMinute(e.target.value)}
        >
          {minutes.map((m) => (
            <option key={m} value={m}>{m}분</option>
          ))}
        </select>
      </div>

      <label className="block mb-2 font-semibold">주휴수당 적용</label>
      <div className="flex gap-2 mb-[10%]">
        <button
          onClick={() => setHolidayApplied(false)}
          className={`flex-1 px-3 py-2 rounded border border-gray-300 ${holidayApplied === false ? 'bg-green-400 border-none text-white' : 'bg-white hover:bg-gray-300'}`}
        >
          미적용
        </button>
        <button
          onClick={() => setHolidayApplied(true)}
          className={`flex-1 px-3 py-2 rounded border border-gray-300 ${holidayApplied === true ? 'bg-green-400 border-none text-white' : 'bg-white hover:bg-gray-300'}`}
        >
          적용
        </button>
      </div>

      <label className="block mb-2 font-semibold">세금 적용</label>
      <div className="flex gap-2 mb-[10%]">
        {['안할래요', '4대 보험 포함', '소득세 포함'].map((type) => (
          <button
            key={type}
            onClick={() => setTaxType(type)}
            className={`flex-1 px-3 py-2 rounded border border-gray-300 ${taxType === type ? 'bg-green-400 border-none text-white' : 'bg-white hover:bg-gray-300'}`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="flex gap-2 mt-6">
        <button
          onClick={resetForm}
          className="flex-1 bg-gray-200 hover:bg-gray-400 text-black py-2 rounded"
        >
          초기화
        </button>
        <button
          onClick={handleSubmit}
          className="flex-1 bg-green-400 hover:bg-green-500 text-white py-2 rounded"
        >
          계산
        </button>
      </div>

      {/* 결과 표시 */}
      {result && (
        <div className="mt-10">
          {renderResultBox('hourly', '시급')}
          {renderResultBox('daily', '일급')}
          {renderResultBox('weekly', '주급')}
          {renderResultBox('monthly', '월급')}
        </div>
      )}
    </div>
  );
}