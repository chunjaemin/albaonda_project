export default function NoticeModal({ isOpen, onClose, title, content }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-40 cursor-default" // 🔹 기본 커서
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-gray-700 whitespace-pre-wrap">{content}</p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1 text-sm text-white bg-blue-500 rounded cursor-default hover:cursor-pointer hover:bg-blue-600"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}