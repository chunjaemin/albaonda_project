import { useState } from 'react'
import { useSidebarStateStore, useCurrentSpaceNameStore } from '../js/store'
import '../App.css'

export default function TopBar() {
  const { doSwitch } = useSidebarStateStore();
  const { name } = useCurrentSpaceNameStore();
  let currentSpaceName = name;
  return (
    <>
      <div className="relative w-full aspect-[10/1] flex items-center bg-gray-100/70">
        <div className="relative w-5 ml-4 cursor-pointer flex flex-col justify-center gap-[4.5px]" onClick={doSwitch}>
          <div className="w-full h-[2px] bg-black "></div>
          <div className="w-full h-[2px] bg-black "></div>
          <div className="w-full h-[2px] bg-black "></div>
        </div>
        <div className="m-4 text-lg">{currentSpaceName}</div>
      </div>
    </>
  )
}