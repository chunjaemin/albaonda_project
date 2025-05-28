// ✅ UserDetail.jsx
import { useState, useEffect } from 'react';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function UserDetail({ user, onClose, onSave }) {
  const [salary, setSalary] = useState(user.salary || '');
  const [payType, setPayType] = useState(user.payType || '월급');
  const [editingSalary, setEditingSalary] = useState(false);
  const [memo, setMemo] = useState(user.memo || '');
  const [role, setRole] = useState(user.role || '직원');

  useEffect(() => {
    setSalary(user.salary || '');
    setMemo(user.memo || '');
    setPayType(user.payType || '월급');
    setRole(user.role || '직원');
  }, [user]);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      salary,
      memo,
      role,
      payType,
    };
    onSave(updatedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[90%] max-w-md p-6 shadow-lg relative">
        <div className="absolute top-4 right-4">
          <button
            onClick={handleSave}
            className="text-blue-600 font-semibold text-sm cursor-pointer"
          >
            완료
          </button>
        </div>

        <h2 className="text-lg font-bold mb-4">사용자 정보</h2>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-4">
            <div><strong>이름:</strong> {user.name}</div>
            <div className="flex items-center gap-2">
              <strong>직급:</strong>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border rounded px-2 py-0.5 text-sm"
              >
                <option value="관리자">관리자</option>
                <option value="직원">직원</option>
                <option value="알바">알바</option>
              </select>
            </div>
          </div>

          <div><strong>성별:</strong> {user.gender}</div>
          <div><strong>생년월일:</strong> {user.birth}</div>
          <div><strong>전화번호:</strong> {user.phone}</div>
          <div><strong>이메일:</strong> {user.email}</div>

          <div className="flex items-center gap-2">
            <strong>{payType}:</strong>
            {editingSalary ? (
              <input
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="border rounded px-2 py-0.5 text-sm w-32"
              />
            ) : (
              <span>{salary}</span>
            )}
            <PencilIcon
              className="h-4 w-4 text-gray-500 cursor-pointer"
              onClick={() => setEditingSalary(!editingSalary)}
            />

            <select
              value={payType}
              onChange={(e) => setPayType(e.target.value)}
              className="border rounded px-1 py-0.5 text-sm"
            >
              <option value="월급">월급</option>
              <option value="시급">시급</option>
            </select>
          </div>

          <div><strong>계좌번호:</strong> {user.account}</div>
          <div><strong>비상 연락망:</strong> {user.emergencyContact}</div>
        </div>

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
