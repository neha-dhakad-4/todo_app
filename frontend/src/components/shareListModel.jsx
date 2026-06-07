import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const ShareListModal = ({
  showShareModal,
  setShowShareModal,
  tasks,
}) => {

  const [users, setUsers] =
    useState([]);

  const [selectedUser, setSelectedUser] =
    useState("");

  const currentUser =
    JSON.parse(
      localStorage.getItem("user")
    );

  useEffect(() => {

    if (showShareModal) {
      fetchUsers();
    }

  }, [showShareModal]);

  const fetchUsers = async () => {

    try {

      const response =
        await axios.get(
          "http://localhost:5000/api/auth/users"
        );

      const filteredUsers =
        response.data.filter(
          (user) =>
            user.username !==
            currentUser.username
        );

      setUsers(
        filteredUsers
      );

    } catch (error) {

      console.log(error);

    }
  };

  const handleShare = async () => {

    if (!selectedUser) {
      alert(
        "Please select a user"
      );
      return;
    }

    if (tasks.length === 0) {
      alert(
        "No tasks available to share"
      );
      return;
    }

    try {

      const response =
        await axios.post(
          "http://localhost:5000/api/share/share-list",
          {

            sharedBy:
              currentUser.username,

            sharedTo:
              selectedUser,

            tasks: tasks.map(
              (task) => ({
                taskName:
                  task.taskName,

                dueDate:
                  task.dueDate,

                dueTime:
                  task.dueTime,

                status:
                  task.status,
              })
            ),
          }
        );

      alert(
        response.data.message
      );

      setSelectedUser("");

      setShowShareModal(
        false
      );

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data
          ?.message ||
          "Failed to share list"
      );
    }
  };

  if (!showShareModal)
    return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">

      <div className="bg-white rounded-xl shadow-xl p-4 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-5">

          Share Todo List

        </h2>

        <div className="mb-4">

          <label className="block mb-2 font-medium">

            Select User

          </label>

          <select
            value={selectedUser}
            onChange={(e) =>
              setSelectedUser(
                e.target.value
              )
            }
            className="w-full border rounded-lg px-3 py-2"
          >

            <option value="">
              Select User
            </option>

            {users.map(
              (user) => (

                <option
                  key={
                    user.username
                  }
                  value={
                    user.username
                  }
                >
                  {
                    user.username
                  }
                </option>

              )
            )}

          </select>

        </div>

        <div className="mb-5">

          <p className="font-medium">

            Tasks to Share:
            {" "}
            {tasks.length}

          </p>

        </div>

        <div className="max-h-48 overflow-y-auto border rounded-lg p-3 mb-5">

          {tasks.map(
            (task, index) => (

              <div
                key={
                  task._id ||
                  index
                }
                className="mb-3 pb-2 border-b last:border-b-0"
              >

                <p>
                  <strong>
                    {
                      task.taskName
                    }
                  </strong>
                </p>

                <p className="text-sm text-gray-600">

                  Due:
                  {" "}
                  {
                    task.dueDate
                  }

                  {" | "}

                  {
                    task.dueTime
                  }

                </p>

              </div>

            )
          )}

        </div>

        <div className="flex justify-end gap-3">

          <button
            onClick={() =>
              setShowShareModal(
                false
              )
            }
            className="px-4 py-2 bg-gray-300 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={
              handleShare
            }
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Share
          </button>

        </div>

      </div>

    </div>
  );
};

ShareListModal.propTypes = {
  showShareModal:
    PropTypes.bool
      .isRequired,

  setShowShareModal:
    PropTypes.func
      .isRequired,

  tasks:
    PropTypes.array
      .isRequired,
};

export default ShareListModal;