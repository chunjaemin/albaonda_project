import { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function UserDetail({ user, onClose, onSave }) {
  const [memo, setMemo] = useState(user.memo || '');

  useEffect(() => {
    setMemo(user.memo || '');
  }, [user]);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      memo,
    };
    onSave(updatedUser); // 상위 컴포넌트에 저장 요청
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[90%] max-w-md p-6 shadow-lg relative">
        {/* 완료 버튼 */}
        <div className="absolute top-4 right-4">
          <button
            onClick={handleSave}
            className="text-blue-600 font-semibold text-sm cursor-pointer"
          >
            완료
          </button>
        </div>

        {/* 제목 */}
        <h2 className="text-lg font-bold mb-4">사용자 정보</h2>

        <div className="space-y-2 text-sm">
          <div><strong>이름:</strong> {user.name}</div>
          <div><strong>역할:</strong> {user.role}</div>
          <div><strong>시급:</strong> {user.hourPrice.toLocaleString()}원</div>
          <div><strong>생년월일:</strong> {user.birthDate}</div>
          <div><strong>전화번호:</strong> {user.phoneNumber}</div>
          <div><strong>주소:</strong> {user.address}</div>
        </div>

        {/* 메모 영역 */}
        <div className="mt-4">
          <label className="block text-sm font-semibold mb-1">메모사항</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            className="w-full border rounded px-2 py-1 text-sm min-h-[80px]"
            placeholder="메모를 입력하세요"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
