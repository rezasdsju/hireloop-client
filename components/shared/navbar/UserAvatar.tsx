import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
interface IUser {
  name: string,
  email: string,
  image?: string | null | undefined
}
interface IUserAvatar {
  user: IUser,
}
export default function UserAvatar({ user }: IUserAvatar) {
  return (
    <Avatar>
      {
        user.image ? <AvatarImage
          src={user.image}
          alt={user.name}
          className="grayscale"
        /> : <AvatarFallback>{user.name.charAt(0).toLocaleUpperCase()}</AvatarFallback>
      }

    </Avatar>
  )
}
