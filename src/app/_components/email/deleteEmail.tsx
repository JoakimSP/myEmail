'use client'

import { api } from "~/trpc/react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

type Props = { id: number }

export default function DeleteEmail({ id }: Props) {
    const router = useRouter()
    const deleteEmail = api.contacts.delete.useMutation({
        onSuccess: () => {
            toast.success("Email successfully deleted")
            router.refresh()
        },
        onError : () => {
            toast.error("Not able to delete email")
        }
    })

    const HandleDeleteEmail = (id: number) : void => {
        deleteEmail.mutate(id)
    }
    return (
        <div className="flex flex-col items-center gap-3 p-4">
            <button className="btn btn-square btn-outline" onClick={() => HandleDeleteEmail(id)}>
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
        </div>
    )
}