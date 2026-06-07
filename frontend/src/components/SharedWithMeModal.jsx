import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const SharedWithMeModal = ({
  showSharedModal,
  setShowSharedModal,
}) => {

  const [sharedLists,
    setSharedLists] =
    useState([]);

  const currentUser =
    JSON.parse(
      localStorage.getItem(
        "user"
      )
    );

  

  const fetchSharedLists =
    async () => {

      try {

        const response =
          await axios.get(
            `http://localhost:5000/api/share/shared-with-me/${currentUser.username}`
          );

        setSharedLists(
          response.data
        );

      } catch (error) {

        console.log(error);

      }
    };
useEffect(() => {

    if (
      showSharedModal
    ) {

      fetchSharedLists();

    }

  }, [showSharedModal]);
  const handleDelete =
    async (id) => {

      try {

        await axios.delete(
          `http://localhost:5000/api/share/delete-shared-list/${id}`
        );

        fetchSharedLists();

      } catch (error) {

        console.log(error);

      }
    };

 
  if (!showSharedModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

      <div className="bg-white rounded-xl p-4 sm:p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">

        <div className="flex justify-between mb-5">

          <h2 className="text-2xl font-bold">Shared With Me</h2>

          <button
            onClick={() => setShowSharedModal(false)}
          >
            ✖
          </button>

        </div>

        {sharedLists.length === 0 ? (

          <p>No Shared Lists</p>

        ) : (

          sharedLists.map((list) => (

            <div
              key={list._id}
              className="border rounded-lg p-4 mb-4"
            >

              <div className="flex justify-between items-center mb-3">

                <h3 className="font-bold text-lg">Shared By : {list.sharedBy}</h3>

                <button
                  onClick={() => handleDelete(list._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="p-2 text-left">Task Name</th>
                    <th className="p-2 text-left">Due Date</th>
                    <th className="p-2 text-left">Due Time</th>
                    <th className="p-2 text-left">Status</th>

                  </tr>

                </thead>

                <tbody>

                  {list.tasks.map((task, index) => (

                    <tr key={index}>

                      <td className="p-2">{task.taskName}</td>

                      <td className="p-2">{task.dueDate}</td>

                      <td className="p-2">{task.dueTime}</td>

                      <td className="p-2">{task.status}</td>

                    </tr>

                  ))}

                </tbody>

                </table>
              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default SharedWithMeModal;