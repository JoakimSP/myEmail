'use client'

import React, { useState } from 'react'
import { api } from "~/trpc/react";



type statusType = "successfully added new email" | "could not add new email" | "pending";

interface Ilist {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

type createEmailProps = {
    lists: Ilist[] | undefined
}


const CreateEmail: React.FC<createEmailProps> = ({ lists }) => {
    const [status, setStatus] = useState<statusType | null>(null)

    const createEmail = api.contacts.create.useMutation({
        onSuccess: () => {
            setStatus('successfully added new email')
            setTimeout(() => {
                setStatus(null);
            }, 3000);
        },
        onError: () => {
            setStatus('could not add new email');
            setTimeout(() => {
                setStatus(null);
            }, 3000);
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const data = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            address: formData.get('address') as string,
            phoneNumber: Number(formData.get('phonenumber')),
            emailList: Number(formData.get('listOption'))
        };

        createEmail.mutate(data)

    };

    return (
        <>
            <form className='flex flex-col items-center gap-3 p-4' onSubmit={handleSubmit}>
                <h1 className='text-5xl font-extrabold dark:text-white'>Add Email</h1>
                <input name='name' className="input input-bordered input-primary w-full max-w-xs" type="text" placeholder={'Name'} />
                <input name='email' className="input input-bordered input-primary w-full max-w-xs" type="text" placeholder={'Email'} />
                <input name='address' className="input input-bordered input-primary w-full max-w-xs" type="text" placeholder={'Adress'} />
                <input name='phonenumber' className="input input-bordered input-primary w-full max-w-xs" type="text" placeholder={'Phone number'} />
                <select name="listOption" className="select select-primary w-full max-w-xs">
                    {lists?.map((key, index) => {
                        return (
                            <option key={index} value={key.id}>{key.name}</option>
                        )
                    })}
                </select>
                <button type='submit' className="btn btn-active btn-primary">Primary</button>
            </form>

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
        </>
    )
}

export default CreateEmail