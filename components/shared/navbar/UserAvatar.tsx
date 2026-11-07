'use client'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { BiChevronDown } from "react-icons/bi";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IUser } from "@/types/userTypes";



interface IUserAvatar {
  user: IUser,
  isOpen: boolean
}
export default function UserAvatar({ user,isOpen }: IUserAvatar) {

  return (
    <div>
      <Tooltip>
        <TooltipTrigger render={
          <button>
            <div className="flex items-center justify-center gap-2 rounded-3xl px-1 py-1 border border-border cursor-pointer">
              <Avatar>
                {
                  user.image ? <AvatarImage
                    src={user.image}
                    alt={user.name}
                    className="grayscale"
                  /> : <AvatarFallback>{user.name.charAt(0).toLocaleUpperCase()}</AvatarFallback>
                }

              </Avatar>

              {
                isOpen ? <BiChevronDown className="rotate-180" /> : <BiChevronDown />
              }
            </div>
          </button>
        } />
        <TooltipContent>
          <p>{user.name}</p>
        </TooltipContent>
      </Tooltip>
    </div>

  )
}
