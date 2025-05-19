import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'

function LogoutBtn() {
    async function logoutHandler() {
        console.log("logout");

    }
    return (
        <Button type="button" variant='outline' onClick={logoutHandler} className={'shadow-xl'}>
            {
                false ? <Loader2 className='size-7 animate-spin' /> :
                    <>
                        <LogOutIcon />
                        <span>Logout</span>
                    </>
            }
        </Button>
    )
}

export default LogoutBtn
