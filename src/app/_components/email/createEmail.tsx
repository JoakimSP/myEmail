'use client'

import { api } from "~/trpc/react";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";

interface Ilist {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

type createEmailProps = {
    lists: Ilist[] | undefined
}


const CreateEmail: React.FC<createEmailProps> = ({ lists }) => {
    const router = useRouter()

    const createEmail = api.contacts.create.useMutation({
        onSuccess: () => {
            toast.success("successfully added new email")
            router.refresh()
        },
        onError: () => {
            toast.success("Could not add new email")
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
            emailList: formData.get('listOption') as string
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
                <button type='submit' className="btn btn-active btn-primary">Add +</button>
            </form>
        </>
    )
}

export default CreateEmail