'use client'
import { useRouter } from "next/navigation"
import { api } from "~/trpc/react"
import { useState } from "react"

type Props = {}
type statusType = "successfully removed new list" | "could not remove new list" | "pending";

export default function ListUI({ }: Props) {
  const [status, setStatus] = useState<statusType | null>(null)
  const { data, isLoading } = api.lists.read.useQuery()
  const deleteListRouter = api.lists.delete.useMutation({
    onSuccess: () => {
      setStatus('successfully removed new list')
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    },
    onError: () => {
      setStatus('could not remove new list');
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }
  })
  const router = useRouter()

  if (isLoading) {
    return <div>is loading...</div>
  }

  const reloadPage = (): void => {
    router.refresh()
  }

  const deleteList = (id: number) => {
    deleteListRouter.mutate(id)
  }
  return (
    <div>
      <div>
        {status && (
          <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">{status}</span>
            </div>
          </div>
        )}
      </div>
      <button onClick={reloadPage} className="btn">Refresh list</button>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {data && data.map((key, index) => {
              return (
                <tr className="bg-base-200" key={index}>
                  <th>{key.id}</th>
                  <td>{key.name}</td>
                  <td>
                    <button className="btn btn-square btn-outline" onClick={() => deleteList(key.id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
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