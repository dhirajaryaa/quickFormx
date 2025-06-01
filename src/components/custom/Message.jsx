import { Link } from 'react-router'
import { Bug } from 'lucide-react'

function Message() {
    return (
        <div className="bg-yellow-100 border-t-4 border-yellow-500 text-yellow-700 p-4 text-xs rounded-md mt-8 mb-4 shadow-lg">
            <p className="font-bold text-sm">⚠️ QuickFormX – Under Development</p>
            <p>This app is currently in development. Only form submission and basic CRUD are functional.</p>
            <p>More features will be added soon. If you find any bugs, please report them. <span className='font-bold'>🙏Thank you!</span></p>
            <Link className='underline flex gap-1 mt-1' to={'/bug/report'}>
                <Bug className='size-4' />Report Bug
            </Link>
        </div>

    )
}

export default Message