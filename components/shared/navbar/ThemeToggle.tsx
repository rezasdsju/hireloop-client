'use client'
import { useTheme } from "next-themes";
import { GoMoon, GoSun } from "react-icons/go";
import { Button } from "@/components/ui/button";
const ThemeToggle = () => {
    const { resolvedTheme, setTheme } = useTheme()
    return (
        <Button
            variant={`ghost`}
            size={`icon`}
            aria-label="Toggle theme"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
        >
            < GoMoon className="size-5 dark:hidden" />
            < GoSun className='hidden size-5 dark:block' />

        </Button>
    );
};

export default ThemeToggle;