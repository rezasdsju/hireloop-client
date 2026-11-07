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
import { useState } from "react";


interface IUser {
  name: string,
  email: string,
  image?: string | null | undefined
}
interface IUserAvatar {
  user: IUser,
}
export default function UserAvatar({ user }: IUserAvatar) {
  const [isChevronUp, seIsChevronUp] = useState(false)
  return (
    <div onClick={() => seIsChevronUp(!isChevronUp)}>
      <Tooltip>
        <TooltipTrigger render={
          <button>
            <div className="flex items-center justify-center gap-2 rounded-3xl px-1 py-1 border border-border">
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
                isChevronUp ? <BiChevronDown className="rotate-180" /> : <BiChevronDown />
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
