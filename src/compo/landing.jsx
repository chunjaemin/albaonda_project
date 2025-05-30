import { useState } from 'react'
import '../App.css'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const navigate = useNavigate()

  const springTransition = {
    type: 'spring',
    stiffness: 200,
    damping: 15,
    bounce: 1,
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start px-4 py-10 text-center bg-gradient-to-b from-white to-green-100">
      {/* 헤더 */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full sm:w-[600px] z-50 bg-white/60 backdrop-blur-md shadow-sm">
        <div className="flex justify-center py-3">
          <h1 className="text-2xl font-bold text-gray-800">Albaonda</h1>
        </div>
      </div>

      {/* 메인 타이틀 */}
      <h2 className="text-5xl font-semibold mt-30 text-center">
        시간표 <span className='text-4xl'>짜는 게</span> <br />
        <span className='text-4xl'>이렇게</span>{' '}
        <motion.span
          className="text-green-500 inline-block"
          animate={{ rotate: [0, -5, 5, -3, 3, 0, 0, 0, 0], y: [0, -4, -5, -4, 0, 0, 0]}}
          transition={{
            duration: 1,
            repeat: 1,
            repeatDelay: 3, // 3초마다 반복
            ease: 'easeInOut',
          }}
        >
          쉬웠어?
        </motion.span>
      </h2>
      <p className="text-sm text-gray-500 mt-2">드래그만 하면 끝! 알바생을 위한 꿀템 앱</p>

      {/* 버튼 */}
      <div className="flex gap-4 mt-8">
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-200 transition">
          간편 급여 계산
        </button>
        <button className="bg-green-400 text-white px-10 py-3 rounded-xl shadow hover:bg-green-500 transition" onClick={() => navigate('/home/schedule')}>
          시간표 만들기
        </button>
      </div>

      {/* 💬 말풍선 카드 (좌→우→좌 정렬) */}
      <div className="mt-50 flex flex-col gap-6 w-full max-w-md">
        {/* 왼쪽 정렬 */}
        <div className="w-full flex justify-start">
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-md w-72 transform -rotate-2 translate-y-[5px]">
            <p className="text-sm text-gray-700 leading-relaxed">
              문자, 카톡, 전화받을 필요 없는 시간표…<br />
              하나로 정리하고 싶어요
            </p>
          </div>
        </div>

        {/* 오른쪽 정렬 */}
        <div className="w-full flex justify-end">
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-md w-72 transform rotate-1">
            <p className="text-sm text-gray-700 leading-relaxed">
              알바 일정이 자주 바뀌는데,<br />
              매번 엑셀이나 단톡방에 다시 적는 것도 일이에요
            </p>
          </div>
        </div>

        {/* 왼쪽 정렬 */}
        <div className="w-full flex justify-start">
          <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-md w-72 transform -rotate-3 translate-y-[5px]">
            <p className="text-sm text-gray-700 leading-relaxed">
              주휴, 야근수당에 4대보험까지…<br />
              시급 계산할 때마다 진짜 골치 아파요
            </p>
          </div>
        </div>
      </div>

      {/* 설명 텍스트 */}
      <div className="mt-50 text-center">
        <h3 className="text-2xl font-semibold text-gray-800">
          복잡한 일정과 시급 계산, 이 앱 하나면 간단해요
        </h3>
        <p className="text-lg text-gray-500 mt-1">알바생을 위한, 딱 필요한 기능만 담았어요</p>
      </div>

      {/* ✅ 애니메이션 카드 섹션 */}
      <div ref={ref} className="relative w-full flex justify-center mt-20 h-72">
        <motion.div
          className="absolute z-30 w-[30%] aspect-[1/1.3] bg-green-50 rounded-2xl shadow-md p-6 text-left"
          initial={{ x: 0, opacity: 0 }}
          animate={inView ? { x: -170, y: 20, opacity: 1, rotate: -15 } : {}}
          transition={{ ...springTransition }}
        >
          <span className="text-2xl mb-2 block">📅</span>
          <h4 className="font-bold text-gray-800 mb-1">직관적인 캘린더 조작</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            드래그만으로도<br />
            일정 배치가 가능한 UI
          </p>
        </motion.div>

        <motion.div
          className="absolute z-20 w-[30%] aspect-[1/1.3]  bg-green-50 rounded-2xl shadow-md p-6 text-left"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ ...springTransition }}
        >
          <span className="text-2xl mb-2 block">🧮</span>
          <h4 className="font-bold text-gray-800 mb-1">간편한 자동 급여 계산</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            일정 추가시 <br />
            자동으로 급여 계산
          </p>
        </motion.div>

        <motion.div
          className="absolute z-10 w-[30%] aspect-[1/1.3] bg-green-50 rounded-2xl shadow-md p-6 text-left"
          initial={{ x: 0, opacity: 0, rotate: 0 }}
          animate={inView ? { x: 170, y: 20, opacity: 1, rotate: 15 } : {}}
          transition={{ ...springTransition }}
        >
          <span className="text-2xl mb-2 block">🤝</span>
          <h4 className="font-bold text-gray-800 mb-1">공유할 수 있는 팀 시간표</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            함께 일하는 사람들과<br />
            실시간으로 공유 가능
          </p>
        </motion.div>
      </div>

      {/* ✅ 좌우좌 카드 레이아웃 */}
      <div className="mt-32 w-full max-w-md flex flex-col gap-8 items-center px-4">
        {/* 설명 텍스트 */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-1">
            일정과 급여 계산, 따로 할 필요 없어요
          </h3>
          <p className="text-lg text-gray-500">
            팀 일정부터 개인 반영까지, 급여 계산까지 자동으로 연결돼요.
          </p>
        </div>

        {/* 카드 1 - 왼쪽 정렬 */}
        <div className="w-full flex justify-start">
          <div className="flex flex-col items-start">
            <div className="w-50 h-70 bg-gray-200 rounded-xl shadow-md" />
          </div>
        </div>

        {/* 카드 2 - 오른쪽 정렬 */}
        <div className="w-full flex justify-end">
          <div className="flex flex-col items-end">
            <div className="w-50 h-70 bg-gray-200 rounded-xl shadow-md" />
          </div>
        </div>

        {/* 카드 3 - 왼쪽 정렬 */}
        <div className="w-full flex justify-start">
          <div className="flex flex-col items-start">
            <div className="w-50 h-70 bg-gray-200 rounded-xl shadow-md" />
          </div>
        </div>

        {/* CTA 버튼 */}
        <div className="mt-10 text-center">
          <p className="text-md font-semibold text-gray-800">
            당신의 시간을 아껴주는 똑똑한 선택
          </p>
          <button
            className="mt-4 bg-green-400 text-white px-6 py-2 rounded-full hover:bg-green-500 transition"
            onClick={() => navigate('/home')}
          >
            지금 시작하기
          </button>
        </div>
      </div>

    </div>
  )
}
