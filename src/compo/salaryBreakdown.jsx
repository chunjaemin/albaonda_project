import { motion } from 'framer-motion';
import { useState } from 'react';
import FlipNumbers from 'react-flip-numbers';

export default function SalaryBreakdown({ result, userName, workDays }) {
  const [expanded, setExpanded] = useState({});
  const byAlba = result.by_parttime;
  const total = result.total;

  const toggle = (key) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-gray-50 flex flex-col items-center px-4 py-10">
      <motion.div
        className="max-w-2xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-1 flex justify-center items-center gap-2">
            급여 계산 결과
          </h1>
          <p className="text-sm text-gray-500 mt-1">{userName}님, {workDays}일간의 급여 내역입니다.</p>
        </div>

        {/* 알바별 급여 상세 */}
        {Object.entries(byAlba).map(([albaName, pay], idx) => (
          <motion.div
            key={albaName}
            className="bg-white shadow rounded-lg mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.4 }}
          >
            <button
              onClick={() => toggle(albaName)}
              className="w-full flex justify-between items-center px-4 py-3 bg-green-100 hover:bg-green-200 transition rounded-t-lg"
            >
              <span className="text-green-800 font-medium">{albaName}</span>
              <span className="text-sm font-semibold text-green-700">
                실수령액: {pay.net_pay.toLocaleString()}원
              </span>
            </button>

            {expanded[albaName] && (
              <motion.div
                className="px-4 py-3 text-sm text-gray-700 border-t border-gray-200 space-y-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-md text-gray-800">기본급: {pay.base_pay.toLocaleString()}원</p>
                <hr className="border-t border-dashed border-gray-300 my-2" />
                <p>야간수당: {pay.night_bonus.toLocaleString()}원</p>
                <p>연장수당: {pay.overtime_bonus.toLocaleString()}원</p>
                <p>주휴수당: {pay.weekly_allowance.toLocaleString()}원</p>
                <p className="text-red-500 border-b border-dashed border-gray-300">세금: {pay.tax.toLocaleString()}원</p>
                <p className="text-md font-bold mt-2">실 수령액: {pay.net_pay.toLocaleString()}원</p>
              </motion.div>
            )}
          </motion.div>
        ))}

        {/* 전체 합계 */}
        <motion.div
          className="bg-white shadow-md rounded-xl p-6 mt-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-center text-xl font-bold mb-4 text-gray-800">📦 전체 합계</h2>
          <div className="border-gray-300 py-2 text-sm text-gray-700 space-y-1">
            <p className="text-md text-gray-800">기본급: {total.base_pay.toLocaleString()}원</p>
            <hr className="border-t border-dashed border-gray-300 my-2" />
            <p>야간수당: {total.night_bonus.toLocaleString()}원</p>
            <p>연장수당: {total.overtime_bonus.toLocaleString()}원</p>
            <p>주휴수당: {total.weekly_allowance.toLocaleString()}원</p>
            <p className="text-red-500 border-b border-dashed border-gray-300">세금: {total.tax.toLocaleString()}원</p>
            <p className="text-xl font-bold mt-2">실 수령액: <span className='text-blue-500'>{total.net_pay.toLocaleString()}원</span> </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
