import Search from "@/modules/layout/components/search"
import Actions from './dashboard-actions';

const Navbar = () => {
    return (
        <nav className='fixed top-0 w-full h-20 z-49 bg-[#252731] px-2 lg:px-4 flex justify-center items-center shadow-sm'>
            {/* Logo */}
            <Search />
            <Actions />
        </nav>
    )
}

export default Navbar;