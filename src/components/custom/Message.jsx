import React from 'react'

function Message() {
    return (
        <div className="bg-yellow-100 border-t-4 border-yellow-500 text-yellow-700 p-4 rounded-md mt-10 text-xs">
            <p className="font-bold text-sm">⚠️ QuickFormX – Under Development</p>
            <ul className='list-disc'>
                <li>This app is currently in development. Only form submission and basic CRUD are functional.</li>
                <li>More features will be added soon. If you find any bugs, please report them. Thank you!</li>
            </ul>
            <a target='_blank' aria-label='Report bug' href='https://github.com/dhirajaryaa/quickFormx/issues/new' className='underline font-bold cursor-pointer'>Report Bug 🐞</a>
        </div>
    )
}

export default Message