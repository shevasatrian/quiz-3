// AddNotesModal.js
import { useMutation } from '@/hooks/useMutation';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AddNotesModal = ({ onClose }) => {
  const router = useRouter();
  const { mutate } = useMutation()
  const [notes, setNotes] = useState({
    title: "",
    description: "",
  });

  const handleSumbit = async () => {
    // Lakukan logika submit atau panggil fungsi yang sesuai
    const response = await mutate({ 
      url: 'https://paace-f178cafcae7b.nevacloud.io/api/notes',
      payload: notes,
    })
    router.reload()

    // Setelah berhasil, tutup modal
    onClose();
  };

  return (
    <div className="bg-white p-5 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-5">Add Notes</h1>
      <div className="grid grid-cols-1 gap-5">
        <div>
          <label htmlFor="title" className="text-gray-600">Title</label>
          <input
            id="title"
            type="text"
            className="border border-gray-300 p-2 w-full"
            onChange={(event) => setNotes({ ...notes, title: event.target.value })}
          />
        </div>
        <div>
          <label htmlFor="description" className="text-gray-600">Description</label>
          <textarea
            id="description"
            type="text"
            className="border border-gray-300 p-2 w-full"
            onChange={(event) => setNotes({ ...notes, description: event.target.value })}
          />
        </div>
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => handleSumbit()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNotesModal;
