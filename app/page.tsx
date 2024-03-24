import Image from "next/image";
import { Input } from "@/components/ui/input";
import CreateSessionButton from "@/components/create_session_button";

export default async function Page() {
  return (
    <div className="flex flex-col space-y-10 w-screen h-screen items-center bg-primary-gray p-10">
      <Image src="/images/hackathon-logo-white.png" width={300} height={300} alt="Picture of the author" />
      <div className="flex flex-col items-center space-y-10">
        <Input className="bg-white" placeholder="Enter session code..."></Input>
        <CreateSessionButton />
      </div>
    </div>
  );
}
