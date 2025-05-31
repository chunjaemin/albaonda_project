import { motion } from "framer-motion";

export default function ScheduleCardInfoModal({ card, onClose }) {
  if (!card) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white w-[90%] max-w-sm rounded-2xl p-6 shadow-xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-center text-gray-800 mb-6 border-b border-gray-200 pb-2">
          {card.name}
        </h2>

        <div className="space-y-5 text-sm text-gray-800">
          <div className="flex justify-between items-center">
            <span className="text-gray-500">💰 시급</span>
            <span className="font-semibold text-black-400">
              {card.payInfo.hourPrice.toLocaleString()}원
            </span>
          </div>

          <div className="space-y-2">
            {[
              ["✅ 주휴수당", card.payInfo.wHoliday],
              ["🌙 야근수당", card.payInfo.night],
              ["⏱ 초과수당", card.payInfo.overtime],
              ["📅 휴일근무수당", card.payInfo.Holiday],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-gray-500">{label}</span>
                <span
                  className={`px-2 py-0.5 rounded text-sm font-medium ${
                    value ? "bg-green-100 text-green-700" : "text-gray-400"
                  }`}
                >
                  {value ? "있음" : "없음"}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-3 mt-3 border-t border-dashed border-gray-300 flex justify-between items-center">
            <span className="text-gray-500">🛡 세금공제 종류</span>
            <span className="text-gray-700 font-medium">{card.payInfo.duty}</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition"
          aria-label="닫기"
        >
          ✕
        </button>
      </motion.div>
    </div>
  );
}