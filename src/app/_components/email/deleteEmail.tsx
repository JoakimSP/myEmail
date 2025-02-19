'use client'

import { api } from "~/trpc/react"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { SetEmailsContext } from "../lists/listDetailUI"

interface Props {
    id: string,
}

export default function DeleteEmail({ id }: Props) {
    const setEmail = useContext(SetEmailsContext)
    const router = useRouter()
    const deleteEmail = api.contacts.delete.useMutation({
        onSuccess: (data) => {
            toast.success("Email successfully deleted")
            if (setEmail) {
                setEmail((prev) => {
                    if (prev) {
                        return prev.filter((email) => email.id !== data.id);
                    }
                    return prev;
                });
            }
            router.refresh()
        },
        onError: () => {
            toast.error("Not able to delete email")
        }
    })

    const HandleDeleteEmail = (id: string): void => {
        const userConfirmed = window.confirm("Are you sure you want to delete this email? This cannot be reversed")
        if (userConfirmed) {
            deleteEmail.mutate(id)
        }
        else {
            return
        }
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