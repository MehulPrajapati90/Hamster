import { Button } from "@/components/ui/button";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Github, LayoutDashboard } from "lucide-react";
import Link from "next/link";


const Actions = async () => {
    const user = await currentUser();
    return (
        <div className="items-center justify-end gap-x-2 lg:ml-0">
            {!user && (
                <SignInButton>
                    <Button size="sm" className="font-sans bg-red-500/25 rounded-[30px] font-medium text-white px-5 tracking-tight hover:bg-red-400/30">
                        Login
                    </Button>
                </SignInButton>
            )}
            {!!user && (
                <div className="flex items-center gap-x-4">
                    <div className="justify-center items-center gap-2 hidden sm:flex">
                        <Button variant={"ghost"} className=" hover:text-primary text-[#d9d9d9] font-sans bg-[#1e1e1e] py-3 px-6 lg:rounded-[30px] rounded-full lg:w-40 h-10 w-24 tracking-[-0.3px] justify-center items-center hidden lg:flex">
                            <Link href={`/u/${user.username}`} className="flex justify-center items-center p-2 lg:p-1.5 px-4 lg:px-3 rounded-[30px] bg-[#101114]">
                                <LayoutDashboard className="h-5 w-5 lg:mr-2 lg:hidden block" />
                                <span className="hidden lg:block">
                                    Dashboard
                                </span>
                            </Link>
                            <a href={`https://www.notion.so/Hamster-29346f5bd6b880019228cea107805e33`} target="_blank" className="flex justify-center items-center lg:px-2 px-1">
                                <LayoutDashboard className="h-5 w-5 lg:mr-2 lg:hidden block" />
                                <span className="hidden lg:block">
                                    Docs
                                </span>
                            </a>
                        </Button>
                        <Button variant={"ghost"} className="text-muted-foreground h-10 w-10 bg-[#1e1e1e] hover:text-primary rounded-full hidden md:flex">
                            <a href={`https://github.com/MehulPrajapati90/Hamster`} target="_blank">
                                <div className="block">
                                    <Github className="text-yellow-400" />
                                </div>
                            </a>
                        </Button>
                    </div>
                    <UserButton />
                </div>
            )}
        </div>
    )
}

export default Actions;