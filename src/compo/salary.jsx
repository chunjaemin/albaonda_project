import { useState } from 'react'
import '../App.css'

import AutoSalaryCal from './autoSalaryCal.jsx'
import ManualSalaryCal from './manualSalaryCal.jsx'

export default function Salary() {
  const [type, setType] = useState('manual') // 'auto' or 'manual'
  return (
    <>
      {/* 상단 탭 */}
      <div className="flex border-gray-300 mb-4 mt-12 m-4">
        <button
          onClick={() => setType('manual')}
          className={`flex-1 text-center py-2 font-medium ${
            type=== 'manual' ? 'text-black border-b-4 border-blue-500' : 'text-gray-500 border-gray-300 border-b-4'
          }`}
        >
          급여 간편 계산
        </button>
        <button
          onClick={() => setType('auto')}
          className={`flex-1 text-center py-2 font-medium ${
            type === 'auto' ? 'text-black border-b-4 border-blue-500' : 'text-gray-500 border-gray-300 border-b-4'
          }`}
        >
          급여 자동 계산
        </button>
      </div>
      {
        type === 'manual' ? (
          <div className="flex flex-col gap-4">
            <ManualSalaryCal />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <AutoSalaryCal />
          </div>
        ) 
      }
    </>
  )
}