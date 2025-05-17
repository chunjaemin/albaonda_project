import { useState } from 'react';

export default function MyInfoDetail({ onClose }) {
  const [salary, setSalary] = useState('3000000'); // 예시 값

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-[500px] rounded-2xl shadow-lg p-6 relative">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* 제목 */}
        <h2 className="text-xl font-bold mb-4">내 정보</h2>

        {/* 사용자 정보 항목들 */}
        <div className="space-y-4">
          <div>
            <span className="font-semibold">이름: </span>
            <span>홍길동</span>
          </div>
          <div>
            <span className="font-semibold">생년월일: </span>
            <span>1990-01-01</span>
          </div>
          <div>
            <span className="font-semibold">성별: </span>
            <span>남</span>
          </div>
          <div>
            <span className="font-semibold">이메일: </span>
            <span>hong@example.com</span>
          </div>
          <div className="flex items-center">
            <span className="font-semibold">월급: </span>
            <input
              className="ml-2 border rounded px-2 py-1 w-32"
              type="text"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </div>
          <div>
            <span className="font-semibold">계좌번호: </span>
            <span>123-456-789</span>
          </div>
          <div>
            <span className="font-semibold">비상 연락망: </span>
            <span>010-1234-5678</span>
          </div>
          <div>
            <span className="font-semibold">메모사항: </span>
            <span>특이사항 없음</span>
          </div>
        </div>

        {/* 저장 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
