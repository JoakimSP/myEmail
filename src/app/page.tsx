import Link from "next/link";
import { api } from "~/trpc/server";
import SendEmails from "./_components/send/sendEmails";
import { env } from "~/env";

export default async function Home() {
  const lists = await api.lists.readAll()
  const serviceId : string = env.EMAILJS_SERVICE_ID
  const templateId : string = env.EMAILJS_TEMPLATE_ID
  const publicKey : string = env.EMAILJS_PUBLIC_KEY
  return (
    <main>
      <SendEmails lists={lists} serviceId={serviceId} templateId={templateId} publicKey={publicKey}/>
    </main>
  );
}
