export default function NoticeModal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-[90%] max-w-md max-h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>

        {/* 본문 (스크롤 처리) */}
        <div className="px-6 py-4 overflow-y-auto text-sm text-gray-700 whitespace-pre-wrap flex-1">
          {content}
        </div>

        {/* 푸터 */}
        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
