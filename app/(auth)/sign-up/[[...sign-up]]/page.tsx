import { SignUp } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CheckCheck, Flame } from 'lucide-react'
import Image from 'next/image'


export default function Page() {
  return (
    <div className='w-full min-h-screen flex lg:flex-row flex-col justify-between items-center'>
      <div className='w-full lg:w-[50%] min-h-screen flex items-center justify-center overflow-hidden relative rounded-[10px]'>
        <Image
          src="/auth.jpg"
          alt="Login background"
          fill
          unoptimized
          className="object-cover"
          priority
        />
        <div className='absolute w-full h-full flex items-center justify-center  backdrop-blur-[10px]  backdrop-contrast-200 backdrop-opacity-50'>
          <SignUp />
        </div>
      </div>

      <div className='w-full lg:w-[50%] flex-col items-center justify-center gap-7 min-h-screen auth-gradient lg:flex hidden'>
        <div className='flex justify-center items-center'>
          <Flame className='' size={40} />
          <div className=''>
            <h1 className='text-xl font-sans font-semibold tracking-[-0.3px]'>Hamster</h1>
            <h1 className='text-[12px] font-sans font-medium leading-3'>enforce virtual reality</h1>
          </div>
        </div>

        <div className='w-[45%]'>
          <Separator />
        </div>

        <div className='flex flex-col items-center text-center gap-3'>
          <h3 className='font-sans font-medium tracking-tight text-3xl'>Get Started with Us</h3>
          <p className='font-sans font-medium tracking-tight text-[12px] text-zinc-400 w-[80%] leading-4'>Get this easy steps done to get register your account</p>
        </div>

        <div className='flex flex-col text-[#f3f3f3] gap-2.5'>
          <Button className='rounded-[5px] font-sans text-[13px] tracking-[-0.3px] font-medium flex justify-between items-center gap-3'>
            <div className='p-[4px] bg-[#101114] rounded-full'>
              <CheckCheck className='text-[#f3f3f3] size-3' />
            </div>
            <span>Fill your details</span>
          </Button>

          <Button variant={"ghost"} className='rounded-[5px] font-sans text-[13px] tracking-[-0.3px] font-medium flex justify-between items-center gap-3 bg-transparent hover:bg-zinc-800 border border-zinc-800 bg-zinc-800'>
            <div className='p-[4px] bg-[#101114] rounded-full'>
              <CheckCheck className='text-zinc-200 size-3' />
            </div>
            <span className='text-white'>Click on Regsiter</span>
          </Button>

          <Button variant={"ghost"} className='rounded-[5px] font-sans text-[13px] tracking-[-0.3px] font-medium flex justify-between items-center gap-3 bg-transparent hover:bg-zinc-800 border border-zinc-800 bg-zinc-800'>
            <div className='p-[4px] bg-[#101114] rounded-full'>
              <CheckCheck className='text-zinc-200 size-3' />
            </div>
            <span className='text-white'>Choose your username</span>
          </Button>
        </div>
      </div>
    </div>
  )
}