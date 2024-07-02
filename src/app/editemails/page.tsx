import CreateEmail from "../_components/email/createEmail"
import AddEmailsFromList from "../_components/email/addEmailsFromList"
import { api } from "~/trpc/server"

type Props = {}

export default async function Page({ }: Props) {
    const lists = await api.lists.readAll()
    return (
        <>
        <CreateEmail lists={lists} />
        <AddEmailsFromList lists={lists}/>
        </>
    )
}
