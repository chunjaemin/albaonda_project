import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import '../App.css'

import AutoSalaryCal from './autoSalaryCal.jsx'
import ManualSalaryCal from './manualSalaryCal.jsx'

export default function Salary() {
  const [type, setType] = useState('manual')

  return (
    <>
      <div className="relative flex border-gray-300 mb-4 mt-12 m-4">
        <button
          onClick={() => setType('manual')}
          className={`flex-1 text-center py-2 font-medium ${type === 'manual' ? 'text-black' : 'text-gray-500'}`}
        >
          급여 간편 계산
        </button>
        <button
          onClick={() => setType('auto')}
          className={`flex-1 text-center py-2 font-medium ${type === 'auto' ? 'text-black' : 'text-gray-500'}`}
        >
          급여 자동 계산
        </button>

        {/* 움직이는 초록색 바 */}
        <div
          className={`absolute bottom-0 left-0 w-1/2 h-1 bg-green-400 transform transition-transform duration-300 ease-in-out ${type === 'manual' ? 'translate-x-0' : 'translate-x-full'}`}
        />
      </div>

      <div className="relative min-h-[200px]"> {/* 높이 고정 추천 */}
        <AnimatePresence mode="wait">
          {type === 'manual' ? (
            <motion.div
              key="manual"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="flex flex-col gap-4 m-2">
                <ManualSalaryCal />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="auto"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="flex flex-col gap-4 m-2">
                <AutoSalaryCal />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
