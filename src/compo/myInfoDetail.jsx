import { useState, useEffect } from 'react';

export default function MyInfoDetail({ isOpen, onClose }) {
  const [isEditing, setIsEditing] = useState(false);

  const [info, setInfo] = useState({
    name: '홍길동',
    birth: '1990-01-01',
    gender: '남',
    email: 'hong@example.com',
    salary: '3000000',
    account: '123-456-789',
    phone1: '010',
    phone2: '1234',
    phone3: '5678',
    emergency1: '010',
    emergency2: '8765',
    emergency3: '4321',
  });

  const [editValues, setEditValues] = useState(info);

  useEffect(() => {
    if (isOpen) {
      setEditValues(info);
    }
  }, [isOpen]);

  const handleChange = (field, value) => {
    setEditValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setInfo(editValues);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center">
      <div
        className="bg-white w-[90%] max-w-[500px] rounded-2xl shadow-lg p-6 relative"
        onKeyDown={handleKeyDown}
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>

        {/* 편집 버튼 */}
        {!isEditing && (
          <button
            className="absolute top-3 left-3 text-blue-500 text-sm font-semibold hover:underline"
            onClick={() => setIsEditing(true)}
          >
            ✎ 편집
          </button>
        )}

        <h2 className="text-xl font-bold mb-4 text-center">내 정보</h2>

        <div className="space-y-4 text-sm">
          {/* 이름 */}
          <InfoRow
            label="이름"
            isEditing={isEditing}
            value={editValues.name}
            display={info.name}
            onChange={(v) => handleChange('name', v)}
          />

          {/* 성별 */}
          <div className="flex items-center">
            <span className="w-28 font-semibold">성별:</span>
            {isEditing ? (
              <select
                value={editValues.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="border rounded px-2 py-1 flex-1"
              >
                <option value="남">남</option>
                <option value="여">여</option>
              </select>
            ) : (
              <span>{info.gender}</span>
            )}
          </div>

          {/* 생년월일 */}
          <InfoRow
            label="생년월일"
            isEditing={isEditing}
            value={editValues.birth}
            display={info.birth}
            type="date"
            onChange={(v) => handleChange('birth', v)}
          />

          {/* 전화번호 */}
          <PhoneRow
            label="전화번호"
            isEditing={isEditing}
            values={[editValues.phone1, editValues.phone2, editValues.phone3]}
            display={`${info.phone1}-${info.phone2}-${info.phone3}`}
            onChange={[
              (v) => handleChange('phone1', v),
              (v) => handleChange('phone2', v),
              (v) => handleChange('phone3', v),
            ]}
          />

          {/* 이메일 */}
          <InfoRow
            label="이메일"
            isEditing={isEditing}
            value={editValues.email}
            display={info.email}
            onChange={(v) => handleChange('email', v)}
            type="email"
          />


          {/* 계좌번호 */}
          <InfoRow
            label="계좌번호"
            isEditing={isEditing}
            value={editValues.account}
            display={info.account}
            onChange={(v) => handleChange('account', v)}
          />

          {/* 비상 연락망 */}
          <PhoneRow
            label="비상연락망"
            isEditing={isEditing}
            values={[editValues.emergency1, editValues.emergency2, editValues.emergency3]}
            display={`${info.emergency1}-${info.emergency2}-${info.emergency3}`}
            onChange={[
              (v) => handleChange('emergency1', v),
              (v) => handleChange('emergency2', v),
              (v) => handleChange('emergency3', v),
            ]}
          />
        </div>

        {/* 저장 / 닫기 버튼 */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={isEditing ? handleSave : onClose}
          >
            {isEditing ? '저장' : '닫기'}
          </button>
        </div>
      </div>
    </div>
  );
}

// 재사용 가능한 일반 항목
function InfoRow({ label, isEditing, value, display, onChange, type = 'text' }) {
  return (
    <div className="flex items-center">
      <span className="w-28 font-semibold">{label}:</span>
      {isEditing ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border rounded px-2 py-1 flex-1"
        />
      ) : (
        <span>{display}</span>
      )}
    </div>
  );
}

// 전화번호용 항목 (3분할)
function PhoneRow({ label, isEditing, values, display, onChange }) {
  return (
    <div className="flex items-center">
      <span className="w-28 font-semibold">{label}:</span>
      {isEditing ? (
        <div className="flex gap-2 flex-1">
          <input
            type="text"
            value={values[0]}
            onChange={(e) => onChange[0](e.target.value)}
            maxLength={3}
            className="border rounded px-2 py-1 w-16"
          />
          <input
            type="text"
            value={values[1]}
            onChange={(e) => onChange[1](e.target.value)}
            maxLength={4}
            className="border rounded px-2 py-1 w-20"
          />
          <input
            type="text"
            value={values[2]}
            onChange={(e) => onChange[2](e.target.value)}
            maxLength={4}
            className="border rounded px-2 py-1 w-20"
          />
        </div>
      ) : (
        <span>{display}</span>
      )}
    </div>
  );
}
