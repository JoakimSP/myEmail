import ListUI from "../_components/lists/emailListUI"
import CreateList from "../_components/lists/createList"

type Props = {}

export default async function page({}: Props) {

  return (
    <div>
        <CreateList/>
        <ListUI/>
    </div>
  )
}