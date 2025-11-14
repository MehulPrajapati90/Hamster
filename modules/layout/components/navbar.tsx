import Search from "@/modules/layout/components/search"
import Actions from './dashboard-actions';
import Logo from "./logo";
import MobileSettings from "./mobile-settings";

const Navbar = () => {
    return (
        <nav className='fixed top-0 w-full h-20 z-49 bg-transparent backdrop-blur-2xl border-b border-[#282828] px-2 lg:px-4 flex justify-between items-center shadow-sm'>
            <Logo />
            <div className="flex justify-center items-center gap-2 lg:gap-4">
                <Search />
                <MobileSettings />
                <Actions />
            </div>
        </nav>
    )
}

export default Navbar;