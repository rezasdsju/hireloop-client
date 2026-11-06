
import logo from '@/app/images/logo.png'
import Image from 'next/image';
import { GiHamburgerMenu } from "react-icons/gi";
import { MobileMenu } from './MobileMenu';

const Navbar = () => {
    return (
        <nav className='sticky top-0 z-50 py-5 my-3 border border-border rounded-2xl mx-5 bg-background text-foreground'>
            <div className='flex items-center justify-between px-5'>
                <div>
                    <Image src={logo} alt='hireloop' width={100} height={50}></Image>
                </div>

                <div className='hidden md:flex items-center justify-end gap-5'>
                    <ol className='flex items-center justify-center gap-5'>
                        <li>Browse Jobs</li>
                        <li>Company</li>
                        <li>Pricing</li>
                    </ol>
                    <span className='h-6 w-px bg-foreground/20'></span>
                    <div className='flex items-center justify-center gap-5'>
                        <button className='text-indigo-600'>Sign In</button>
                        <button className='bg-indigo-600 rounded-md px-4 py-2'>Get Started</button>
                    </div>
                </div>

                <div className='flex md:hidden'>
                    <MobileMenu/>
                </div>
            </div>

        </nav>
    );
};

export default Navbar;