import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
import AddNotesModal from './add';
import EditNotesModal from './edit/[id]';

const inter = "font-family: 'Inter', sans-serif;";
const LayoutComponent = dynamic(() => import('@/layout'), { ssr: true });

export default function Notes({ notes }) {
  const router = useRouter();
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [isAddNotesModalOpen, setAddNotesModalOpen] = useState(false);
  const [isEditNotesModalOpen, setEditNotesModalOpen] = useState(false);

  const handleDelete = async (id) => {
    // Set selectedNoteId to prompt confirmation modal
    setSelectedNoteId(id);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${selectedNoteId}`, {
        method: 'DELETE',
      });
      const result = await response.json();
      if (result?.success) {
        // Reset selectedNoteId and reload
        setSelectedNoteId(null);
        router.reload();
      }
      console.log('result => ', result);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const cancelDelete = () => {
    // Reset selectedNoteId when cancel is clicked
    setSelectedNoteId(null);
  };

  const openAddNotesModal = () => {
    setAddNotesModalOpen(true);
  };

  const closeAddNotesModal = () => {
    setAddNotesModalOpen(false);
  };

  const openEditNotesModal = (id) => {
    // Set selectedNoteId to the id of the note to be edited
    setSelectedNoteId(id);
    // Open the edit modal
    setEditNotesModalOpen(true);
  };

  const closeEditNotesModal = () => {
    // Reset selectedNoteId when the edit modal is closed
    setSelectedNoteId(null);
    // Close the edit modal
    setEditNotesModalOpen(false);
  };

  return (
    <>
      <LayoutComponent metaTitle="Notes">
        <div className="container mx-auto font-sans relative">
          <div className="p-5">
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={openAddNotesModal}>
                Add Notes
              </button>
            </div>
            <div className="flex">
              <div className="grid grid-cols-3 gap-5">
                {notes?.data.map((item) => (
                  <div key={item.id} className="bg-white p-4 shadow-md">
                    <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                    <p className="text-gray-700">{item.description}</p>
                    <div className="flex justify-between mt-4">
                      <button
                        className="flex-1 bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                        onClick={() => openEditNotesModal(item.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="flex-1 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </LayoutComponent>

      {/* Modal for Confirmation */}
      {selectedNoteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded shadow-md">
            <p className="mb-5">Are you sure you want to delete this note?</p>
            <div className="flex justify-end">
              <button className="bg-red-500 text-white py-2 px-4 rounded mr-2" onClick={confirmDelete}>
                Yes
              </button>
              <button className="bg-gray-500 text-white py-2 px-4 rounded" onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Notes Modal */}
      {isAddNotesModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AddNotesModal onClose={closeAddNotesModal} />
        </div>
      )}

      {/* Edit Notes Modal */}
      {isEditNotesModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <EditNotesModal
            noteId={selectedNoteId}
            onClose={closeEditNotesModal}
          />
        </div>
      )}
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
    const notes = await response.json();

    return {
      props: { notes },
    };
  } catch (error) {
    console.error('Error fetching notes:', error);
    return {
      props: {
        notes: null,
      },
    };
  }
}
