import { use, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FlipNumbers from 'react-flip-numbers';
import '../App.css';
import SalaryBreakdown from './salaryBreakdown';

export default function CalResult() {
  const { result, name, workDays } = useLocation().state;
  const [isAnimating, setIsAnimating] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const {
    total: {
      base_pay,
      net_pay,
      night_bonus,
      overtime_bonus,
      tax,
      total_amount,
      weekly_allowance
    }
  } = result;


  const navigate = useNavigate();
  const [animatedTotal, setAnimatedTotal] = useState(0);
  const [animatedNet, setAnimatedNet] = useState(0);

  useEffect(() => {
    let start = null;
    const duration = 1000;

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setAnimatedTotal(Math.floor(eased * total_amount));
      setAnimatedNet(Math.floor(eased * net_pay));

      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [total_amount, net_pay]);

  useEffect(() => {
    setIsAnimating(true);  
    setTimeout(() => {
      setIsAnimating(false);
      setIsResult(true);
    }, 2000); // 애니메이션 지속 시간
  },[]);

  const items = [
    { label: '기본급', value: base_pay },
    { label: '야간수당', value: night_bonus },
    { label: '연장수당', value: overtime_bonus },
    { label: '주휴수당', value: weekly_allowance },
    { label: '세금', value: tax, color: 'text-red-500' }
  ];

  return (

    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      {isAnimating && (
        <div className="absolute inset-0 z-50 bg-white bg-opacity-80 flex flex-col items-center justify-center perspective">
          <div className="flex text-5xl font-bold mb-4">
            {'Albaonda'.split('').map((char, idx) => (
              <div key={idx} className="flip-container">
                <div className={`flipper delay-${idx}`}>
                  <div className="front">{char}</div>
                  <div className="back">{char}</div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ 추가: 로딩 바 */}
          <div className="w-[60%] aspect-[25/1] bg-gray-300 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 animate-loadingBar"></div>
          </div>
        </div>
      )}
      <div className="w-full max-w-3xl">
        {isResult && <SalaryBreakdown result={result} userName={name} workDays={workDays} />}
        <div className="text-center mt-4">
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition mb-15"
            onClick={() => navigate('/home')}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
