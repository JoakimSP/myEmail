import ListUI from "../_components/lists/emailListUI"
import CreateList from "../_components/lists/createList"
import { api } from "~/trpc/server"

type Props = {}

export default async function page({}: Props) {
    const listData = await api.lists.read()

    const data = listData.map((key, index) => {
        return (
            console.log(key)
        )
    })

  return (
    <div>
        <CreateList/>
        <ListUI/>
    </div>
  )
}