// ✅ userinfo.jsx
import { useState } from 'react';
import UserDetail from './userDetail';
import Invite from './invite';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import '../App.css';
import '../index.css';

import dummyUsers from '../js/dummyUsers.js'; // 상대 경로에 맞게 수정
import { motion } from 'framer-motion';

export default function UserInfo() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [inviteRole, setInviteRole] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true); // 관리자 여부 설정

  const [users, setUsers] = useState(dummyUsers);

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
      <motion.div
        className="user-info-section space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
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
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(user.id);
                      }}
                      className="absolute top-1/2 right-7 -translate-y-1/2 text-red-500 hover:text-red-700"
                      title="삭제"
                    >
                      <TrashIcon className="w-6 h-6" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </motion.div>

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
