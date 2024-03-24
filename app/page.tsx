import SessionButtons from "@/components/session_buttons";
import Image from "next/image";

export default async function Page() {
  return (
    <div className="flex flex-col space-y-6 items-center bg-primary-gray p-20">
      <Image
        src="/images/hackathon-logo-white.png"
        width={300}
        height={300}
        alt="Picture of the author"
      />
      <SessionButtons />
    </div>
  );
}
