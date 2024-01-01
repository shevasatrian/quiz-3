// edit.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const EditNotesModal = ({ noteId, onClose }) => {
  const router = useRouter();
  const [notes, setNotes] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    // Fetch note details based on noteId when the component mounts
    async function fetchingData() {
      try {
        const res = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/${noteId}`);
        const listNotes = await res.json();
        console.log('list notes => ', listNotes?.data);
        setNotes(listNotes?.data);
      } catch (error) {
        console.error('Error fetching note details:', error);
      }
    }

    fetchingData();
  }, [noteId]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${noteId}`, {
        method: 'PATCH',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title: notes?.title, description: notes?.description }),
      });
      const result = await response.json();
      if (result?.success) {
        // Close the modal on successful update
        router.reload()
        onClose();
      }
      console.log('result => ', result);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  return (
    <div className="bg-white p-5 rounded shadow-md">
      <h1 className="text-2xl font-bold mb-5">Edit Notes</h1>
      <div className="grid grid-cols-1 gap-5">
        <div>
          <label htmlFor="title" className="text-gray-600">Title</label>
          <input
            id="title"
            type="text"
            className="border border-gray-300 p-2 w-full"
            value={notes?.title || ""}
            onChange={(event) => setNotes({ ...notes, title: event.target.value })}
          />
        </div>
        <div>
          <label htmlFor="description" className="text-gray-600">Description</label>
          <textarea
            id="description"
            type="text"
            className="border border-gray-300 p-2 w-full"
            value={notes?.description || ""}
            onChange={(event) => setNotes({ ...notes, description: event.target.value })}
          />
        </div>
        <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => handleUpdate()}
          >
            Submit
          </button>
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded ml-2"
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNotesModal;
