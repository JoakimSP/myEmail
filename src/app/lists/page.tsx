import CreateList from "../_components/lists/createList"
import { api } from "~/trpc/server"
import Link from "next/link"
import DeleteList from "../_components/lists/deleteList"
import { auth } from "@clerk/nextjs/server"


export default async function page() {
    const { sessionClaims } = auth()
  if(sessionClaims?.metadata?.role != "admin"){
    return (<div>Not Authorized</div>)
  }
    const lists = await api.lists.readAll()

    return (
        <>
            <CreateList />
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>delete</th>
                            <th>view</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {lists?.map((key, index) => {
                            return (
                                <tr className="bg-base-200" key={index}>
                                    <th>{key.id}</th>
                                    <td>{key.name}</td>
                                    <td>
                                        <DeleteList id={key.id} />
                                    </td>
                                    <td>
                                        <Link href={`/lists/${key.id}`} className="btn btn-outline btn-info" >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                                            </svg>
                                        </Link>
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