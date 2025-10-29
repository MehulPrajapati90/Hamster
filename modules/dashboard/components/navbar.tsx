import { MailQuestion } from 'lucide-react';
import Actions from './dashboard-actions';

const Navbar = () => {
    return (
        <nav className='fixed top-0 w-full h-20 z-49 bg-[#252731] px-10 lg:px-4 flex justify-between items-center shadow-sm'>
            <MailQuestion />
            <Actions />
        </nav>
    )
}

export default Navbar;