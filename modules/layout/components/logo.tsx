import { Flame } from 'lucide-react'

const Logo = () => {
  return (
    <div className='flex justify-center items-center'>
      <Flame className='' size={40} />
      <div className='hidden md:block'>
        <h1 className='text-xl font-sans font-semibold tracking-[-0.3px]'>Hamster</h1>
        <h1 className='text-[12px] font-sans font-medium leading-3'>enforce virtual reality</h1>
      </div>
    </div>
  )
}

export default Logo