import Logo from '@/modules/layout/components/logo';
import Actions from './dashboard-actions';
import ActionsNavigation from '@/modules/layout/components/dashboard-actions';
import Search from "@/modules/layout/components/search"

const Navbar = () => {
    return (
        <nav className='fixed top-0 w-full h-20 z-49 bg-transparent backdrop-blur-2xl border-b border-[#282828] px-2 lg:px-4 flex justify-between items-center shadow-sm'>
            <Logo />
            <div className="flex justify-center items-center lg:gap-4">
                <Search />
                <ActionsNavigation />
            </div>
        </nav>
    )
}

export default Navbar;