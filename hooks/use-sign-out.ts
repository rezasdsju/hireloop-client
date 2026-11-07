'use client'

import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";


const useSignOut = () => {
    const [isSignedOut, setIsSignedOut] = useState(false)
    const router = useRouter()
    const handleSignOut = async () => {
        setIsSignedOut(true)
        const { data, error } = await authClient.signOut()

        if (error) {
            setIsSignedOut(false)
            toast.add({
                type: 'error',
                description: `${error.message}`,
                priority: 'high'
            })

        }
        if (data) {
            toast.add({
                type: 'success',
                description: 'You have signed out successfully',
                priority: 'high'
            })
            setIsSignedOut(true)
            setTimeout(() => {
                router.replace('/sign-in');
                router.refresh()
            }, 1500)
        }
    }
    return { handleSignOut, isSignedOut }
};

export default useSignOut;