import { useState } from 'react';
import UserDetail from './userDetail';
import Invite from './invite';
import { PlusIcon } from '@heroicons/react/24/outline';
import '../App.css';
import '../index.css';

// ✅ 외부 dummyTeam 데이터 import
import { dummyTeam } from '../js/dummyTeam';

export default function UserInfo() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [inviteRole, setInviteRole] = useState(null);
  const [users, setUsers] = useState(dummyTeam.members);

  const roleClass = {
    '관리자': 'manager-box',
    '직원': 'staff-box',
    '알바': 'parttimer-box',
  };

  const grouped = {
    관리자: users.filter((u) => u.role === '관리자'),
    직원: users.filter((u) => u.role === '직원'),
    알바: users.filter((u) => u.role === '알바'),
  };

  const handleInvite = (email) => {
    const newUser = {
      id: Date.now().toString(),
      teamId: dummyTeam.id,
      name: '초대됨',
      role: inviteRole,
      phoneNumber: '',
      address: '',
      birthDate: '',
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
        {['관리자', '직원', '알바'].map((role) => (
          <div key={role}>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-base font-semibold">{role}</h2>
              {role !== '관리자' && (
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
                    {user.role === '관리자' && '👨‍💼'}
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
              prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
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
