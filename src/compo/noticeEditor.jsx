import { useState, useEffect } from "react";
import { BookmarkIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function NoticeEditor({
  onClose,
  onSubmit,
  type = "공지사항",
  editingItem = null,
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title);
      setContent(editingItem.content);
      setPinned(editingItem.pinned || false);
    }
  }, [editingItem]);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    const data = {
      title,
      content,
      pinned: type === "공지사항" ? pinned : false,
      id: editingItem?.id || Date.now(),
    };
    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[90%] max-w-sm p-5 shadow-xl relative">
        <XMarkIcon
          className="w-6 h-6 absolute top-3 right-3 text-gray-500 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-lg font-bold mb-4">{type} 작성</h2>

        {/* 제목 */}
        <div className="mb-3">
          <label className="block text-sm font-medium">제목</label>
          <div className="flex items-center gap-2 mt-1">
            {type === "공지사항" && (
              <button onClick={() => setPinned(!pinned)}>
                <BookmarkIcon
                  className={`h-5 w-5 transition-colors ${
                    pinned ? "text-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            )}
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="제목을 입력하세요"
            />
          </div>
        </div>

        {/* 내용 */}
        <div className="mb-4">
          <label className="block text-sm font-medium">내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="내용을 입력하세요"
          ></textarea>
        </div>

        {/* 저장 버튼 */}
        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="text-blue-500 font-semibold text-sm cursor-pointer"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
