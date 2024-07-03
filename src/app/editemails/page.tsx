import CreateEmail from "../_components/email/createEmail"
import AddEmailsFromList from "../_components/email/addEmailsFromList"
import { api } from "~/trpc/server"
import { auth } from "@clerk/nextjs/server"

type Props = {}

export default async function Page({ }: Props) {
    const { sessionClaims } = auth()
  if(sessionClaims?.metadata.role != "admin"){
    return (<div>Not Authorized</div>)
  }
    const lists = await api.lists.readAll()
    return (
        <>
        <CreateEmail lists={lists} />
        <AddEmailsFromList lists={lists}/>
        </>
    )
}
