//create slug page for viewing lists
import { api } from "~/trpc/server"
import DeleteEmail from "~/app/_components/email/deleteEmail"
import { auth } from "@clerk/nextjs/server"



type Props = {
  params: { listId: string }
}


export default async function Page({ params }: Props) {
  const { sessionClaims } = auth()
  if(sessionClaims?.metadata.role != "admin"){
    return (<div>Not Authorized</div>)
  }
  const listData = await api.lists.getById(parseInt(params.listId))

  return (
    <>
      <h1 className='text-5xl font-extrabold dark:text-white'>{listData?.name}</h1>
      <h4>Total email count: {listData?.contacts.length}</h4>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {listData?.contacts &&
              listData.contacts.map((contact) => {
                return (
                  <tr key={contact.id}>
                    <th>{contact.id}</th>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>
                      <DeleteEmail id={contact.id}/>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}