import CreateEmail from "../_components/email/createEmail"
import { api } from "~/trpc/server"

type Props = {}

export default async function Page({ }: Props) {
    const lists = await api.lists.readAll()
    return (
        <CreateEmail lists={lists} />
    )
}
