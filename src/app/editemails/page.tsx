import CreateEmail from "../_components/email/createEmail"
import { api } from "~/trpc/server"

type Props = {}

export default async function Page({ }: Props) {
    const lists = await api.lists.read()
    return (
        <div className="m-4">
            <CreateEmail lists={lists}/>
        </div>
    )
}
