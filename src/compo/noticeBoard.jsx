// ✅ noticeBoard.jsx
import { useState, useEffect } from "react";
import NoticeEditor from "./noticeEditor";
import {
  PlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { BookmarkIcon } from "@heroicons/react/24/solid";
import { useSidebarStateStore } from "../js/store.js";
import SideBarTeamSpace from "./sideBarTeamSpace.jsx";
import NoticeModal from "./noticeModal";
import { AnimatePresence, motion } from "framer-motion";

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
};

export default function NoticeBoard() {
  const { isSidebar, doSwitch } = useSidebarStateStore();

  const [isAdmin, setIsAdmin] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editorType, setEditorType] = useState("공지사항");
  const [editingItem, setEditingItem] = useState(null);

  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem("notices");
    return saved ? JSON.parse(saved) : [];
  });

  const [suggestions, setSuggestions] = useState(() => {
    const saved = localStorage.getItem("suggestions");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSuggestionItem, setSelectedSuggestionItem] = useState(null);

  const openEditor = (type, item = null) => {
    setEditorType(type);
    setEditingItem(item);
    setShowEditor(true);
  };

  const handleSubmit = (newItem) => {
    const list = editorType === "공지사항" ? notices : suggestions;
    const setter = editorType === "공지사항" ? setNotices : setSuggestions;

    const now = new Date();
    const formattedISO = now.toISOString();

    const itemWithTime = {
      ...newItem,
      createdAt: newItem.createdAt || formattedISO,
    };

    const updated = list.some((i) => i.id === newItem.id)
      ? list.map((i) => (i.id === newItem.id ? itemWithTime : i))
      : [...list, itemWithTime];

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

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return "날짜 오류";
    }
  };

  // ✅ localStorage에서 초기 데이터 불러오기
  useEffect(() => {
    const savedNotices = localStorage.getItem("notices");
    const savedSuggestions = localStorage.getItem("suggestions");

    if (savedNotices) setNotices(JSON.parse(savedNotices));
    if (savedSuggestions) setSuggestions(JSON.parse(savedSuggestions));
  }, []);

  // ✅ notices 변경 시 localStorage 저장
  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices));
  }, [notices]);

  // ✅ suggestions 변경 시 localStorage 저장
  useEffect(() => {
    localStorage.setItem("suggestions", JSON.stringify(suggestions));
  }, [suggestions]);

  return (
    <>
      {isSidebar && (
        <div
          className="fixed top-0 left-0 z-20 w-full h-full bg-black/30"
          onClick={doSwitch}
        ></div>
      )}
      <SideBarTeamSpace isOpen={isSidebar} onClose={doSwitch} />

      <motion.div
        className="p-4 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        <div className="box notice-box">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">공지사항</h2>
            {isAdmin && (
              <PlusIcon
                className="h-6 w-6 text-gray-600 cursor-pointer"
                onClick={() => openEditor("공지사항")}
              />
            )}
          </div>

          <motion.ul
            className="item-list"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {sortItems(notices).map((item) => (
                <motion.li
                  key={item.id}
                  className="item-box group text-sm flex justify-between items-center"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setSelectedItem(item)}
                >
                  <div>
                    {item.pinned && (
                      <BookmarkIcon className="h-4 w-4 inline-block text-red-500 mr-1" />
                    )}
                    <strong>{item.title}</strong>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>

                  {isAdmin && (
                    <div
                      className="flex items-center gap-2 ml-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <PencilIcon
                        className="h-4 w-4 text-gray-500 cursor-pointer"
                        onClick={() => openEditor("공지사항", item)}
                      />
                      <TrashIcon
                        className="h-4 w-4 text-red-400 cursor-pointer"
                        onClick={() => handleDelete("공지사항", item.id)}
                      />
                    </div>
                  )}
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>

        <div className="box suggestion-box">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">건의사항</h2>
            {isAdmin && (
              <PlusIcon
                className="h-6 w-6 text-gray-600 cursor-pointer"
                onClick={() => openEditor("건의사항")}
              />
            )}
          </div>
          <motion.ul
            className="item-list"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {sortItems(suggestions).map((item) => (
                <motion.li
                  key={item.id}
                  className="item-box group text-sm flex justify-between items-center"
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onClick={() => setSelectedSuggestionItem(item)}
                >
                  <div>
                    <strong>{item.title}</strong>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(item.createdAt)}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-2 ml-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <PencilIcon
                      className="h-4 w-4 text-gray-500 cursor-pointer"
                      onClick={() => openEditor("건의사항", item)}
                    />
                    <TrashIcon
                      className="h-4 w-4 text-red-400 cursor-pointer"
                      onClick={() => handleDelete("건의사항", item.id)}
                    />
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>

        <AnimatePresence>
          {showEditor && (
            <NoticeEditor
              type={editorType}
              onClose={() => setShowEditor(false)}
              onSubmit={handleSubmit}
              editingItem={editingItem}
            />
          )}
        </AnimatePresence>

        {selectedItem && (
          <NoticeModal
            isOpen={!!selectedItem}
            onClose={() => setSelectedItem(null)}
            title={selectedItem.title}
            content={selectedItem.content}
          />
        )}

        {selectedSuggestionItem && (
          <NoticeModal
            isOpen={!!selectedSuggestionItem}
            onClose={() => setSelectedSuggestionItem(null)}
            title={selectedSuggestionItem.title}
            content={selectedSuggestionItem.content}
          />
        )}
      </motion.div>
    </>
  );
}
