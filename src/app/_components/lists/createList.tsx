'use client'

import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

type props = Object

const CreateList: React.FC = () => {
    const router = useRouter();

    const createList = api.lists.create.useMutation({
        onSuccess: () => {
            toast.success("successfully added new list")
            router.refresh()
        },
        onError: () => {
            toast.error("could not add new list")
            router.refresh()
        }
    })


    const  handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        
        const data = {
            name: formData.get('name') as string,
        };

        createList.mutate(data)
        
    };

    return (
        <>
        <form className='flex flex-col items-center gap-3 p-4' onSubmit={handleSubmit}>
            <h1 className='text-5xl font-extrabold dark:text-white'>Add List</h1>
            <input name='name' className="input input-bordered input-primary w-full max-w-xs" type="text" placeholder={'Name'} />
            <button type='submit' className="btn btn-active btn-primary">Add list</button>
        </form>
        </>
    )
}

export default CreateList