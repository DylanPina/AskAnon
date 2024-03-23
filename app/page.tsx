import Image from "next/image";

export default async function Home() {
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
