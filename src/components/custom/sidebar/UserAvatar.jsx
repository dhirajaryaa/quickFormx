import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useStore from '@/store';

function UserAvatar() {
    const user = useStore(state=>state.user);
  return (
   <Avatar className={'border-2 border-sky-400'}>
      <AvatarImage src={user?.avatar?.url} alt={user?.name} />
      <AvatarFallback className={'uppercase'}>{user?.name?.slice(0,2)}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
