'use client'
import DeleteEmail from "../email/deleteEmail";
import { useState, createContext, SetStateAction } from "react";

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

type props = {
    contacts: contactsType,
    listName: string | undefined,
    listCount: number | undefined
}

export const SetEmailsContext = createContext<React.Dispatch<SetStateAction<contactsType>> | null>(null)
export default function ListDetailUI({ contacts, listName, listCount }: props) {
    const [emails, setEmails] = useState<contactsType>(contacts)


    const handleSearchEmails = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const query = formData.get('query') as string;

        if (query) {
            const filteredEmails = contacts?.filter((contact) => contact.email.includes(query));
            setEmails(filteredEmails);
        } else {
            setEmails(contacts);
        }
    }

    return (
        <>
            <SetEmailsContext.Provider value={setEmails}>
                <h1 className='text-5xl font-extrabold dark:text-white'>{listName}</h1>
                <h4>Total email count: {listCount}</h4>
                <div>
                    <h4> Search Email</h4>
                    <form className="flex flex-col items-center justify-center gap-2" onSubmit={handleSearchEmails}>
                        <label className="input input-bordered flex items-center gap-2">
                            <input name="query" type="text" className="grow" placeholder="Search" />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                fill="currentColor"
                                className="h-4 w-4 opacity-70">
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd" />
                            </svg>
                        </label>
                        <div>
                            <button typeof="submit" className="btn btn-active btn-primary">Search</button>
                        </div>
                    </form>
                </div>
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

                            {emails?.map((contact, index) => {
                                return (
                                    <tr key={contact.id}>
                                        <th>{index}</th>
                                        <td>{contact.name}</td>
                                        <td>{contact.email}</td>
                                        <td>
                                            <DeleteEmail id={contact.id} />
                                        </td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </SetEmailsContext.Provider>
        </>
    )
}