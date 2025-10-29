import { Check } from 'lucide-react';

const VerifiedMark = () => {
    return (
        <div className='p-0.5 flex items-center justify-center h-4 w-4 rounded-full bg-blue-600'>
            <Check className='h-2.5 w-2.5 text-primary stroke-[4px] mt-0.5 ml-0.5' />
        </div>
    )
}

export default VerifiedMark;