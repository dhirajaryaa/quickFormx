import React from 'react'

function Logo() {
    return (
        <a href="/" className='flex items-center justify-center gap-2'>
            <img src="./logo.png" alt="Quick FormX" className='size-7' />
            <span className="text-xl font-bold capitalize">Quick Formx</span>
        </a>
    )
}

export default Logo
