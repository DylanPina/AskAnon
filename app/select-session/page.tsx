import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
    return (
        <div className="flex justify-center w-screen h-screen h-9/12">
            <div className="relative bottom-36 flex w-3/12 space-y-12 flex-col justify-center">
                <Image
                    className="mb-1"
                    src="/images/hackathon-logo-white.png"
                    width={300}
                    height={300}
                    alt="Picture of the author"
                />
                <div>
                    <div className="text-white">Join a session</div>
                    <Input className="bg-white" placeholder="Enter session code..."></Input>
                    <div className="flex justify-center relative top-10">
                        <Button className="bg-primary-gray w-9/12 border border-white hover:bg-white hover:text-primary-gray">
                            Create new session
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
