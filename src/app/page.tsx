import { api } from "~/trpc/server";
import SendEmails from "./_components/send/sendEmails";
import { env } from "~/env";
import { auth } from '@clerk/nextjs/server';

export default async function Home() {
  const { sessionClaims } = auth()
  if(sessionClaims?.metadata.role != "admin"){
    return (<div>Not Authorized</div>)
  }
  const lists = await api.lists.readAll()

  const serviceId: string = env.EMAILJS_SERVICE_ID
  const templateId: string = env.EMAILJS_TEMPLATE_ID
  const publicKey: string = env.EMAILJS_PUBLIC_KEY

  return (
    <main>
      <SendEmails lists={lists} serviceId={serviceId} templateId={templateId} publicKey={publicKey} />
    </main>
  );
}
