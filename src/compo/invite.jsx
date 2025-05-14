// ✅ InviteModal.jsx
import { useState } from 'react';

export default function Invite({ role, onClose, onInvite }) {
  const [email, setEmail] = useState('');

  const handleInvite = () => {
    if (!email.trim()) return;
    onInvite(email);
    setEmail('');
  };

  const handleDone = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div className="bg-white rounded-xl w-[90%] max-w-sm p-6 shadow-xl relative">
        {/* 완료 버튼 (오른쪽 상단) */}
        <button
          onClick={handleDone}
          className="absolute top-4 right-4 text-blue-600 font-semibold text-sm cursor-pointer hover:underline"
        >
          완료
        </button>

        <h2 className="text-lg font-bold mb-6">{role} 초대하기</h2>

        <label className="block text-sm font-medium mb-1">이메일 주소</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="example@email.com"
          className="w-full border px-3 py-2 rounded text-sm mb-8"
        />

        {/* 초대 버튼 (오른쪽 하단) */}
        <div className="absolute bottom-4 right-4">
          <button
            onClick={handleInvite}
            className="bg-blue-500 text-white text-sm px-4 py-1 rounded cursor-pointer hover:bg-blue-600"
          >
            초대
          </button>
        </div>
      </div>
    </div>
  );
}