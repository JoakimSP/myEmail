//create slug page for viewing lists
import { api } from "~/trpc/server"
import DeleteEmail from "~/app/_components/email/deleteEmail"



type Props = {
  params: { listId: string }
}


export default async function Page({ params }: Props) {
  const listData = await api.lists.getById(parseInt(params.listId))

  return (
    <div className="flex flex-col items-center gap-3 p-4">
      <h1 className='text-5xl font-extrabold dark:text-white'>{listData?.name}</h1>
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
    </div>
  )
}