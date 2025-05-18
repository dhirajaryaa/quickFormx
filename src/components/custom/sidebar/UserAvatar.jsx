import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

function UserAvatar() {
  return (
   <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback className={'capitalize'}>DA</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
