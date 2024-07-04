//create slug page for viewing lists
import { api } from "~/trpc/server"
import { auth } from "@clerk/nextjs/server"
import ListDetailUI from "~/app/_components/lists/listDetailUI"



type Props = {
  params: { listId: string }
}

interface Icontacts {
  id: string;
  name: string;
  email: string;
  address: string | null;
  phoneNumber: number | null;
  createdAt: Date;
  updatedAt: Date;
  emailListId: string | null;
}

type contactsType = Icontacts[] | undefined

export default async function Page({ params }: Props) {
  const { sessionClaims } = auth()
  if (sessionClaims?.metadata?.role != "admin") {
    return (<div>Not Authorized</div>)
  }
  const listData = await api.lists.getById(params.listId.toString())
  const contacts: contactsType = listData?.contacts



  return (
    <ListDetailUI contacts={contacts} listName={listData?.name} listCount={listData?.contacts.length}/>
  )
}