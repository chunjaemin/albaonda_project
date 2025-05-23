import { useState } from 'react'
import { useSidebarStateStore } from '../js/store'
import '../App.css'

export default function TopBarTeamSpace() {
  const { doSwitch } = useSidebarStateStore();
  let space_name = "맘스터치 팀 공간";
  return (
    <>
      <div className="relative w-full aspect-[10/1] flex items-center border-b border-gray-300">
        <div className="relative w-[5%] ml-4 cursor-pointer" onClick={doSwitch}>
          <div className='w-full aspect-[8/1] bg-black'></div>
          <div className='w-full aspect-[8/1] bg-black mt-1'></div>
          <div className='w-full aspect-[8/1] bg-black mt-1'></div>
        </div>
        <div className="m-4">{space_name}</div>
      </div>
    </>
  )
}