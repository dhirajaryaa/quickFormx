import { Link } from 'react-router';
import Logo_Img from "@/assets/logo.png"

function Logo() {
    return (
        <Link to="/" className='flex items-center justify-center gap-2'>
            <img src={Logo_Img} alt="Quick FormX" className='size-7' />
            <span className="text-xl font-bold capitalize">Quick Formx</span>
        </Link>
    )
}

export default Logo
