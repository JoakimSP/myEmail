'use client'
import { useRouter } from "next/navigation"
import { api } from "~/trpc/react"
import { toast } from "react-toastify"

type Props = { id: number }

export default function DeleteList({ id }: Props) {
  const router = useRouter()
  const deleteListRouter = api.lists.delete.useMutation({
    onSuccess: () => {
      toast.success('successfully removed new list')
      router.refresh()
    },
    onError: () => {
      toast.error('could not remove new list')
    }
  })


  const deleteList = (id: number): void => {
    deleteListRouter.mutate(id)
  }
  return (
    <button className="btn btn-square btn-outline" onClick={() => deleteList(id)}>
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
  )
}