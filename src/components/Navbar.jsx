import React from 'react'

const Navbar = () => {
  return (
    <header>
     <nav className='flex w-full justify-center     items-center   shadow-sm  '>
        <ul className="w-full   h-[64px]  flex items-center  justify-center">
            <li className='ml-12'>Sentence Construction</li>
        </ul>
      
        <img className='flex w-[4px] mr-12' src="/dots.svg" alt="" />
    

      
     </nav>
    </header>
  )
}

export default Navbar
