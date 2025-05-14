// ✅ userinfo.jsx
import { useState } from 'react';
import UserDetail from './userDetail';
import Invite from './invite';
import { PlusIcon } from '@heroicons/react/24/outline';
import '../App.css';
import '../index.css';
import SideBarTeamSpace from './sideBarTeamSpace.jsx';

export default function UserInfo() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [inviteRole, setInviteRole] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      role: '점장',
      name: '김점장',
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
    '점장': 'manager-box',
    '직원': 'staff-box',
    '알바': 'parttimer-box',
  };

  const grouped = {
    점장: users.filter((u) => u.role === '점장'),
    직원: users.filter((u) => u.role === '직원'),
    알바: users.filter((u) => u.role === '알바'),
  };

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

  return (
    <>
      <div className="user-info-section space-y-6">
        {['점장', '직원', '알바'].map((role) => (
          <div key={role}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-semibold">{role}</h2>
              {role !== '점장' && (
                <button
                  onClick={() => setInviteRole(role)}
                  className="flex items-center text-blue-600 text-sm cursor-pointer hover:underline"
                >
                  <PlusIcon className="w-4 h-4 mr-1" /> 초대하기
                </button>
              )}
            </div>
            <div className="space-y-2">
              {grouped[role].map((user) => (
                <div
                  key={user.id}
                  className={`user-card ${roleClass[user.role]} cursor-pointer`}
                  onClick={() => setSelectedUser(user)}
                >
                  <h3>
                    {user.role === '점장' && '👨‍💼'}
                    {user.role === '직원' && '👩‍💼'}
                    {user.role === '알바' && '🧑‍🍳'} {user.role}
                  </h3>
                  <p>이름: {user.name}</p>
                  <p>전화번호: {user.emergencyContact}</p>
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
            setSelectedUser(updatedUser);
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
