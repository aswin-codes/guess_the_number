import React from 'react'
import logo from '../assets/logo.png'

const NavBar = () => {
  return (
    <>
    <nav className='px-4 py-2 flex justify-between items-center'>
        <div>
            <img src={logo} className='md:w-35'/>
        </div>
        <div>
            <h1 className='text-white text-md md:text-3xl font-semibold'>Club Expo 2023</h1>
        </div>
    </nav>
    </>
  )
}

export default NavBar