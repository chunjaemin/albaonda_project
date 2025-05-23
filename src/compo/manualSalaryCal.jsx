import { useState } from 'react';
import { NumericFormat } from 'react-number-format';

import '../App.css';

export default function ManualSalaryCal() {
  const [wage, setWage] = useState('');
  const [startHour, setStartHour] = useState('');
  const [endHour, setEndHour] = useState('');
  const [workingDays, setWorkingDays] = useState('');
  const [holidayApplied, setHolidayApplied] = useState(null);
  const [taxType, setTaxType] = useState('');

  const resetForm = () => {
    setWage('');
    setStartHour('');
    setEndHour('');
    setWorkingDays('');
    setHolidayApplied(null);
    setTaxType('');
  };

  const handleSubmit = () => {
    alert('계산 버튼이 눌렸습니다.');
  };

  return (
    <div className="p-8 w-full mx-auto bg-white shadow rounded-md">
      <label className="block mb-2 font-semibold">시급</label>
      <input
        type="number"
        value={wage}
        onChange={(e) => setWage(e.target.value)}
        className="w-full border border-gray-400 px-3 py-2 rounded mb-2"
        placeholder="시급 입력"
      />
      <p className="text-xs text-gray-500 mb-[10%] ml-3">최저 10,030원</p>

      <label className="block mb-2 font-semibold">하루 근무 시간</label>
      <div className="flex gap-2 mb-[10%]">
        <NumericFormat
          thousandSeparator
          suffix=" 시간"
          allowNegative={false}
          placeholder="시간 입력 (예: 8)"
          className="w-full border border-gray-400 rounded p-2 pr-10"
          isAllowed={({ value }) => {
            const num = Number(value);
            return value === '' || (num >= 0 && num <= 24);
          }}
          onValueChange={(values) => {
            // console.log('입력된 실제 숫자:', values.value); // 예: "12000"
          }}
        />
        <select
          className="w-full border border-gray-400 rounded p-2"
          defaultValue=""
          onChange={(e) => onChange(Number(e.target.value))}
        >
          <option value="" disabled hidden>분 입력 (예: 30)</option>
          <option value="0">0 분</option>
          <option value="30">30 분</option>
        </select>
      </div>

      <label className="block mb-2 font-semibold">근무 일수</label>
      <input
        type="number"
        value={workingDays}
        onChange={(e) => setWorkingDays(e.target.value)}
        className="w-full border border-gray-400 px-3 py-2 mb-[10%] rounded"
        placeholder="근무 일수 입력"
      />

      <label className="block mb-2 font-semibold">주휴수당 적용</label>
      <div className="flex gap-2 mb-[10%]">
        <button
          onClick={() => setHolidayApplied(false)}
          className={`flex-1 px-3 py-2 rounded border border-gray-400 ${
            holidayApplied === false ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
        >
          미적용
        </button>
        <button
          onClick={() => setHolidayApplied(true)}
          className={`flex-1 px-3 py-2 rounded border border-gray-400 ${
            holidayApplied === true ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
        >
          적용
        </button>
      </div>

      <label className="block mb-2 font-semibold">세금 적용</label>
      <div className="flex gap-2 mb-[10%]">
        {['미적용', '4대 보험', '소득세'].map((type) => (
          <button
            key={type}
            onClick={() => setTaxType(type)}
            className={`flex-1 px-3 py-2 rounded border border-gray-400 ${
              taxType === type ? 'bg-blue-500 text-white' : 'bg-white'
            }`}
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
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          계산하기
        </button>
      </div>

      <div className="w-full h-[400px]"></div>
    </div>
  );
}
