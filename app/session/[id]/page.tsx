import React from "react";
import type { Metadata } from "next";
import MessageList from "@/components/ui/session-layout/message-list";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: params.id,
  };
}

const Page: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;

  return <MessageList sessionId={id} />;
};

export default Page;
