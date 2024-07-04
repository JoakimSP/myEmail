'use client'

import { toast } from "react-toastify"
import { api } from "~/trpc/react"
import readXlsxFile from 'read-excel-file'

interface Ilist {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

type createEmailProps = {
  lists: Ilist[] | undefined
}

const AddEmailsFromList: React.FC<createEmailProps> = ({ lists }) => {

  const createEmail = api.contacts.createMany.useMutation({
    onSuccess: () => {
      toast.success("successfully added new email")
    },
    onError: () => {
      toast.error("Could not add new email")
    }
  })

  const handleAddEmails = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('fileInput') as HTMLInputElement;
    const select = form.elements.namedItem('listOption') as HTMLSelectElement;
    const file = input?.files?.[0];
    const selectedList = Number(select.value);

    if (file) {
      const rows = await readXlsxFile(file);
      const emailArray: { name: string, email: string, address: string, phoneNumber: number, emailList: number }[] = [];
      rows.forEach(row => {
        row.forEach(cell => {
          if (typeof cell === 'string' && cell.includes('@')) { // Add cell to email array if it contains '@'
            emailArray.push({
              name: "Unknown",
              email: cell,
              address: "",
              phoneNumber: 0,
              emailList: selectedList
            }); 
          }
        });
      });

      createEmail.mutate(emailArray);
    }
  }

  return (
    <>
      <h1 className='text-5xl font-extrabold dark:text-white text-center'>Add multiple Emails from Excel</h1>
      <form onSubmit={handleAddEmails} className="flex flex-col items-center justify-center gap-2">
        <input type="file" name="fileInput" className="file-input file-input-bordered w-full max-w-xs" accept=".xlsx, .xls" />
        <select name="listOption" className="select select-primary w-full max-w-xs">
          {lists?.map((list, index) => (
            <option key={index} value={list.id}>{list.name}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  )
}

export default AddEmailsFromList
