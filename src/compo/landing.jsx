import { useState } from 'react'
import '../App.css'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function Landing() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  const springTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 20,
    bounce: 0.4,
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start px-4 py-10 text-center">
      {/* 헤더 */}
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Albaonda</h1>

      {/* 메인 타이틀 */}
      <h2 className="text-3xl font-semibold mt-8">
        시간표 짜는 게 이렇게 <span className="text-green-500">쉬웠어?</span>
      </h2>
      <p className="text-sm text-gray-500 mt-2">드래그만 하면 끝! 알바생을 위한 꿀템 앱</p>

      {/* 버튼 */}
      <div className="flex gap-4 mt-6">
        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl shadow-sm hover:bg-gray-200 transition">
          간편 급여 계산
        </button>
        <button className="bg-green-400 text-white px-4 py-2 rounded-xl shadow hover:bg-green-500 transition">
          시간표 만들기
        </button>
      </div>

      {/* 💬 말풍선 카드 */}
      <div className="mt-10 flex flex-col md:flex-row gap-6 items-center justify-center px-4">
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-md w-72 transform -rotate-2">
          <p className="text-sm text-gray-700 leading-relaxed">
            문자, 카톡, 전화받을 필요 없는 시간표…<br />
            하나로 정리하고 싶어요
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-md w-72 transform rotate-1">
          <p className="text-sm text-gray-700 leading-relaxed">
            알바 일정이 자주 바뀌는데,<br />
            매번 엑셀이나 단톡방에 다시 적는 것도 일이에요
          </p>
        </div>
        <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-md w-72 transform -rotate-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            주휴, 야근수당에 4대보험까지…<br />
            시급 계산할 때마다 진짜 골치 아파요
          </p>
        </div>
      </div>

      {/* 설명 텍스트 */}
      <div className="mt-12 text-center">
        <h3 className="text-lg font-semibold text-gray-800">
          복잡한 일정과 시급 계산, 이 앱 하나면 간단해요
        </h3>
        <p className="text-sm text-gray-500 mt-1">알바생을 위한, 딱 필요한 기능만 담았어요</p>
      </div>

      {/* ✅ 애니메이션 카드 섹션 */}
      <div ref={ref} className="relative w-full flex justify-center mt-32 h-72">
        <motion.div
          className="absolute z-30 w-[30%] aspect-[1/1.3] bg-green-50 rounded-2xl shadow-md p-6 text-left"
          initial={{ x: 0, opacity: 0 }}
          animate={inView ? { x: -170,y: 20, opacity: 1, rotate: -15 } : {}}
          transition={{ ...springTransition}}
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
          animate={inView ? { scale: 1, opacity: 1} : {}}
          transition={{ ...springTransition}}
        >
          <span className="text-2xl mb-2 block">🧮</span>
          <h4 className="font-bold text-gray-800 mb-1">간편한 자동 급여 계산</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            주휴수당, 야간수당 등<br />
            자동으로 계산
          </p>
        </motion.div>

        <motion.div
          className="absolute z-10 w-[30%] aspect-[1/1.3] bg-green-50 rounded-2xl shadow-md p-6 text-left"
          initial={{ x: 0, opacity: 0, rotate: 0 }}
          animate={inView ? { x: 170, y: 20, opacity: 1, rotate: 15 } : {}}
          transition={{ ...springTransition}}
        >
          <span className="text-2xl mb-2 block">🤝</span>
          <h4 className="font-bold text-gray-800 mb-1">공유할 수 있는 팀 시간표</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            함께 일하는 사람들과<br />
            실시간으로 공유 가능
          </p>
        </motion.div>
      </div>
    </div>
  )
}
