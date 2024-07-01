import React from 'react'

const AddPeople = () => {
  return (
    <div className="min-h-screen text-[#000000] flex items-center justify-center bg-white">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h1 className="text-2xl font-bold mb-6">Add Person</h1>
            <form className='flex flex-col gap-[40px]'>
            <div className="space-y-4">
                <input type="text" placeholder="Name" className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100" />
                <input type="text" placeholder="Age" className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100" />
                <input type="text" placeholder="Phone" className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100" />
                <input type="text" placeholder="Country" className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100" />
                <input type="text" placeholder="Occupation" className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100" />
                <input type="text" placeholder="Last Seen" className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100" />
                <input type="text" placeholder="Time Seen" className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100" />
                <textarea placeholder="Details" className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100 h-24"></textarea>
                <input type="text" placeholder="Contact 1" className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100" />
                <input type="text" placeholder="Alternative Contact (Optional)" className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100" />
                <input type="file" placeholder="Attach Image 1" className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100" />
                <input type="file" placeholder="Attach Image 2" className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100" />
                <input type="file" placeholder="Attach Image 3" className="w-full p-3 border rounded-lg bg-zinc-50 dark:bg-zinc-700 dark:text-zinc-100" />
            </div>
            <button type="submit" className="mt-6 w-full bg-black text-white p-3 rounded-lg hover:bg-zinc-800">Add</button>
            </form>
        </div>
    </div>
  )
}

export default AddPeople