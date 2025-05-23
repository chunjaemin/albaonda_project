// ✅ noticeBoard.jsx
import { useState } from "react";
import NoticeEditor from "./noticeEditor";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/solid";

export default function NoticeBoard() {

  const [showEditor, setShowEditor] = useState(false);
  const [editorType, setEditorType] = useState("공지사항");
  const [editingItem, setEditingItem] = useState(null);

  const [notices, setNotices] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const openEditor = (type, item = null) => {
    setEditorType(type);
    setEditingItem(item);
    setShowEditor(true);
  };

  const handleSubmit = (newItem) => {
    const list = editorType === "공지사항" ? notices : suggestions;
    const setter = editorType === "공지사항" ? setNotices : setSuggestions;

    const updated = list.some((i) => i.id === newItem.id)
      ? list.map((i) => (i.id === newItem.id ? newItem : i))
      : [...list, newItem];

    setter(updated);
  };

  const handleDelete = (type, id) => {
    const setter = type === "공지사항" ? setNotices : setSuggestions;
    const list = type === "공지사항" ? notices : suggestions;
    setter(list.filter((item) => item.id !== id));
  };

  const sortItems = (items) => [
    ...items.filter((item) => item.pinned),
    ...items.filter((item) => !item.pinned),
  ];

  return (
    <>
      <div className="p-4 space-y-6">
        {/* 공지사항 */}
        <div className="box notice-box">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">📢 공지사항</h2>
            <PlusIcon
              className="h-6 w-6 text-gray-600 cursor-pointer"
              onClick={() => openEditor("공지사항")}
            />
          </div>
          <ul className="item-list">
            {sortItems(notices).map((item) => (
              <li
                key={item.id}
                className="item-box group text-sm flex justify-between items-start"
              >
                <div>
                  {item.pinned && (
                    <BookmarkIcon className="h-4 w-4 inline-block text-red-500 mr-1" />
                  )}
                  <strong>{item.title}</strong>
                  <p className="text-xs text-gray-600">{item.content}</p>
                </div>
                <div className="flex items-center gap-2 ml-2 hidden group-hover:flex">
                  <PencilIcon
                    className="h-4 w-4 text-gray-500 cursor-pointer"
                    onClick={() => openEditor("공지사항", item)}
                  />
                  <TrashIcon
                    className="h-4 w-4 text-red-400 cursor-pointer"
                    onClick={() => handleDelete("공지사항", item.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 건의사항 */}
        <div className="box suggestion-box">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">💡 건의사항</h2>
            <PlusIcon
              className="h-6 w-6 text-gray-600 cursor-pointer"
              onClick={() => openEditor("건의사항")}
            />
          </div>
          <ul className="item-list">
            {suggestions.map((item) => (
              <li
                key={item.id}
                className="item-box group text-sm flex justify-between items-start"
              >
                <div>
                  <strong>{item.title}</strong>
                  <p className="text-xs text-gray-600">{item.content}</p>
                </div>
                <div className="flex items-center gap-2 ml-2 hidden group-hover:flex">
                  <PencilIcon
                    className="h-4 w-4 text-gray-500 cursor-pointer"
                    onClick={() => openEditor("건의사항", item)}
                  />
                  <TrashIcon
                    className="h-4 w-4 text-red-400 cursor-pointer"
                    onClick={() => handleDelete("건의사항", item.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 작성 모달 */}
        {showEditor && (
          <NoticeEditor
            type={editorType}
            onClose={() => setShowEditor(false)}
            onSubmit={handleSubmit}
            editingItem={editingItem}
          />
        )}
      </div>
    </>
  );
}