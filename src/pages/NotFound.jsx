import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

function NotFoundPage() {
    const navigate = useNavigate()
    return (
        <section className='flex items-center justify-center w-full h-screen flex-col text-center'>
            <h1 className='text-5xl sm:text-7xl md:text-9xl font-bold'>404</h1>
            <p className="mt-4 text-xl sm:text-2xl font-semibold">Oops! Page not found</p>
            <p className="mt-2 text-sm text-gray-600">
                The page you’re looking for doesn’t exist or has been moved.
            </p>
            <Button className='mt-4'
                onClick={() => navigate(-1)}>
                <ArrowLeft /> Go Back
            </Button>
        </section>
    )
}

export default NotFoundPage
