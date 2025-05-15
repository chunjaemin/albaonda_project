import { useState } from 'react';
import '../App.css';

import { useNavigate, useLocation } from 'react-router-dom';

export default function calResult() {
  // 예시 값 (props로 받아도 OK)
  const calData = useLocation().state;
  const workDays = calData.workDays;
  const name = calData.name;
  const salary = calData.salary;
  
  const navigate = useNavigate();

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-center items-center px-6 text-center">
      <p className="text-lg mb-2">
        <span className="font-bold">{workDays}일</span> 동안의 <span className="font-bold"> {name} </span>님의
      </p>
      <p className="text-lg mb-6">
        급여는 <span className="text-blue-500 font-semibold">{salary.toLocaleString()}</span>원 입니다.
      </p>
      <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600" onClick={()=>{
        navigate('/home');
      }}>
        확인
      </button>
    </div>
  );
}