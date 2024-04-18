import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
    <>
      <header className='flex justify-between px-12 py-8 w-full'>
        <Image src="/logo-combo.png" alt="playgotchi logo" width={160} height={40} />
        <p>Let's play</p>
      </header>
    </>
  )
}

export default Header
