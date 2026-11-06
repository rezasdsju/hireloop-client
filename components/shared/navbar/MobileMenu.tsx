import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GiHamburgerMenu } from "react-icons/gi";
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

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger render={
        <button><GiHamburgerMenu /></button>
        } />
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <ol>
                <li>Browse Jobs</li>
                <li>Company</li>
                <li>Pricing</li>
            </ol>
        </div>
        <SheetFooter>
          <Button >Sign In</Button>
          <SheetClose render={<Button variant="outline">Close</Button>} />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
