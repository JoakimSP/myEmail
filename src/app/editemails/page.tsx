import CreateEmail from "../_components/email/createEmail"
import { api } from "~/trpc/server"

type Props = {}

export default async function Page({ }: Props) {
    const lists = await api.lists.readAll()
    return (
        <div className="m-4">
            <CreateEmail lists={lists}/>
        </div>
    )
}
