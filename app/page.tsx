import Image from "next/image";
import { createSession } from "@/lib/data/session";

export default async function Home() {
  const newSession = await createSession(
    "dsp209@scarletmail.rutgers.edu",
    "session-1",
  );

  console.log(`Session created: ${JSON.stringify(newSession, null, 2)}`);

  return (
    <div className="flex flex-col space-y-10 w-screen h-screen items-center bg-primary-gray p-10">
      <Image
        src="/images/hackathon-logo-white.png"
        width={300}
        height={300}
        alt="Picture of the author"
      />
      <div className="flex flex-col space-y-10">AskAnon</div>
    </div>
  );
}
