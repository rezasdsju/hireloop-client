import Link from "next/link"
import { Briefcase, Building2, Tag } from "lucide-react"
import { GiHamburgerMenu } from "react-icons/gi"

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { IUser } from "@/types/userTypes"
import UserAvatar from "./UserAvatar"
import { useState } from "react"

const navLinks = [
    { label: "Browse Jobs", href: "/jobs", icon: Briefcase },
    { label: "Company", href: "/company", icon: Building2 },
    { label: "Pricing", href: "/pricing", icon: Tag },
]

export function ProfileMenu({ user }: { user: IUser }) {
    const [open, setOpen] = useState(false)
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={
                <Button variant="ghost" size="icon" />

            }>
                <UserAvatar user={user} isOpen = {open}/>
            </SheetTrigger>

            <SheetContent className="gap-0 p-0">
                <SheetHeader className="gap-1 border-b p-5 pr-12">
                    <SheetTitle className="text-lg font-bold tracking-tight">
                        {user.name}
                    </SheetTitle>
                    <SheetDescription>
                        {user.email}
                    </SheetDescription>
                </SheetHeader>

                <nav aria-label="Main" className="flex-1 overflow-y-auto p-3">
                    <ul className="flex flex-col gap-1">
                        {navLinks.map(({ label, href, icon: Icon }) => (
                            <li key={href}>
                                <SheetClose
                                    nativeButton={false}
                                    render={
                                        <Link
                                            href={href}
                                            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                        />
                                    }
                                >
                                    <Icon className="size-4 shrink-0" />
                                    {label}
                                </SheetClose>
                            </li>
                        ))}
                    </ul>
                </nav>

                <SheetFooter className="gap-2 border-t p-4">
                    <SheetClose
                        nativeButton={false}
                        render={
                            <Link
                                href="/sign-in"
                                className={cn(
                                    buttonVariants({ variant: "outline" }),
                                    "h-10 w-full cursor-pointer"
                                )}
                            />
                        }
                    >
                        Sign Out
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
