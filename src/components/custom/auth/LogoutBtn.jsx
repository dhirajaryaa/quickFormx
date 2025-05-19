import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth';
import useStore from '@/store';
import { LogOutIcon } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

function LogoutBtn() {
    const { logoutHandler: { mutateAsync, isPending } } = useAuth();
    const removeUser = useStore(state => state.removeUser)
    const navigate = useNavigate();

    async function logoutHandler() {
        const res = await mutateAsync()
        if (res.statusCode >= 400) { // error
            toast.error(res.message);
        } else { // success
            removeUser();
            toast.success("logout successful👍");
            navigate("/login");
        }

    }
    return (
        <Button type="button" variant='outline' onClick={logoutHandler} className={'shadow-xl'}>
            {
                isPending ? <Loader2 className='size-7 animate-spin' /> :
                    <>
                        <LogOutIcon />
                        <span>Logout</span>
                    </>
            }
        </Button>
    )
}

export default LogoutBtn
