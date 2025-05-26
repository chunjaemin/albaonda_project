// ✅ userinfo.jsx
import { useState } from 'react';
import UserDetail from './userDetail';
import Invite from './invite';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import '../App.css';
import '../index.css';
import SideBarTeamSpace from './sideBarTeamSpace.jsx';

export default function UserInfo() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [inviteRole, setInviteRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true); // 관리자 여부 설정

  const [users, setUsers] = useState([
    {
      id: 1,
      role: '관리자',
      name: '김점장',
      phone: '010-9876-5432',
      birth: '1980-01-01',
      gender: '남성',
      email: 'manager@example.com',
      salary: '400만원',
      account: '123-456-789',
      emergencyContact: '010-0000-0000',
      memo: '',
    },
    {
      id: 2,
      role: '직원',
      name: '이직원',
      phone: '010-1234-5678',
      birth: '1990-05-12',
      gender: '여성',
      email: 'staff@example.com',
      salary: '300만원',
      account: '987-654-321',
      emergencyContact: '010-0000-0000',
      memo: '',
    },
    {
      id: 3,
      role: '알바',
      name: '박알바',
      phone: '010-1111-2222',
      birth: '2000-10-10',
      gender: '남성',
      email: 'parttimer@example.com',
      salary: '시급 12,000원',
      account: '112-233-344',
      emergencyContact: '010-0000-0000',
      memo: '',
    },
  ]);

  const roleClass = {
    '관리자': 'bg-red-100 border-l-4 border-red-500 p-4 rounded-md shadow',
    '직원': 'bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md shadow',
    '알바': 'bg-blue-100 border-l-4 border-blue-500 p-4 rounded-md shadow',
  };

  const icons = {
    '관리자': '🧑‍💼',
    '직원': '👩‍💼',
    '알바': '🧑‍🍳',
  };

  const roleOrder = ['관리자', '직원', '알바'];

  const grouped = users.reduce((acc, user) => {
    if (!acc[user.role]) acc[user.role] = [];
    acc[user.role].push(user);
    return acc;
  }, {});

  const handleInvite = (email) => {
    const newUser = {
      id: Date.now(),
      role: inviteRole,
      name: '초대됨',
      birth: '',
      gender: '',
      email,
      salary: '',
      account: '',
      emergencyContact: '',
      memo: '',
    };
    setUsers((prev) => [...prev, newUser]);
    setInviteRole(null);
  };

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <>
      <div className="user-info-section space-y-6">
        {roleOrder.map((role) => (
          <div key={role}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-semibold">{role}</h2>
              {isAdmin && role !== '관리자' && (
                <button
                  onClick={() => setInviteRole(role)}
                  className="flex items-center text-blue-600 text-sm cursor-pointer hover:underline"
                >
                  <PlusIcon className="w-4 h-4 mr-1" /> 초대하기
                </button>
              )}
            </div>
            <div className="space-y-2">
              {(grouped[role] || []).map((user) => (
                <div
                  key={user.id}
                  className={`user-card ${roleClass[user.role] || ''} relative ${isAdmin ? 'cursor-pointer' : 'opacity-80 cursor-default'}`}
                  onClick={isAdmin ? () => setSelectedUser(user) : undefined}
                >
                  <div>
                    <h3>{icons[user.role]} {user.role}</h3>
                    <p>이름: {user.name}</p>
                    <p>전화번호: {user.emergencyContact}</p>
                  </div>
                  {isAdmin && user.role !== '관리자' && (
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="absolute top-1/2 right-2 -translate-y-1/2 text-red-500 hover:text-red-700"
                      title="삭제"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <UserDetail
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onSave={(updatedUser) => {
            setUsers((prev) =>
              prev.map((u) =>
                u.id === updatedUser.id ? updatedUser : u
              )
            );
            setSelectedUser(null);
          }}
        />
      )}

      {inviteRole && (
        <Invite
          role={inviteRole}
          onClose={() => setInviteRole(null)}
          onInvite={handleInvite}
        />
      )}
    </>
  );
}
