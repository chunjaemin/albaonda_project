import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FlipNumbers from 'react-flip-numbers';
import '../App.css';

export default function CalResult() {
  const calData = useLocation().state;
  const workDays = calData.workDays;
  const name = calData.name;
  const salary = calData.salary;

  const navigate = useNavigate();
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    let start = null;
    const duration = 1000;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      // 감속 이징 적용 (ease-out quart)
      const eased = 1 - Math.pow(1 - progress, 5);
      const newValue = Math.floor(eased * salary);
      setDisplayed(newValue);

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [salary]);

  return (
    <div className="w-full h-full min-h-screen flex flex-col justify-center items-center px-6 text-center bg-white">
      <p className="text-2xl font-medium text-gray-800 mb-2">
        <span className="text-green-500">{workDays}일</span> 동안의 <span className="text-green-500">{name}</span>님의 급여는
      </p>
      <div className="flex items-center justify-center mb-6">
        <span className="text-green-400 font-semibold text-2xl mr-1">
          <FlipNumbers
            height={25}
            width={14}
            color="text-blue-400"
            background="transparent"
            play
            perspective={100}
            numbers={displayed.toLocaleString()}
            numberStyle={{
              fontSize: '15px',
              fontWeight: 500,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          />
        </span>
        <span className="text-2xl">원 입니다.</span>
      </div>
      <button
        className="bg-green-400 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        onClick={() => navigate('/home')}
      >
        확인
      </button>
    </div>
  );
}
