
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CreateTaskModal = ({
  showModal,
  setShowModal,
  onTaskCreated,
}) => {
  const currentUser = JSON.parse(
    localStorage.getItem("user")
  );

  const [users, setUsers] = useState([]);

  const [taskForm, setTaskForm] = useState({
    taskName: "",
    dueDate: "",
    dueTime: "",
    assignedTo: "",
  });

  const loadUsers = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/users"
      );

      const filteredUsers = response.data;

      Promise.resolve().then(() => setUsers(filteredUsers));
    } catch (error) {
      console.log(error);
    }
  }, [currentUser.username]);

  useEffect(() => {
    if (!showModal) return;

    loadUsers();
  }, [showModal, loadUsers]);

  

  const handleChange = (e) => {
    setTaskForm({
      ...taskForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...taskForm,
      assignedBy: currentUser.username,
    };

    console.log(payload);

    const response = await axios.post(
      "http://localhost:5000/api/tasks/create-task",
      payload
    );

    console.log(response.data.message);

    setShowModal(false);

    if (onTaskCreated) {
      onTaskCreated();
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

      <div className="bg-white p-4 sm:p-6 rounded-xl w-full max-w-md sm:max-w-lg">

        <h2 className="text-2xl font-bold mb-5">
          Create Task
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label htmlFor="taskName" className="block text-sm font-medium text-gray-700 mb-1">
              Task Name
            </label>
            <input
              id="taskName"
              type="text"
              name="taskName"
              placeholder="Task Name"
              value={taskForm.taskName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              id="dueDate"
              type="date"
              name="dueDate"
              value={taskForm.dueDate}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700 mb-1">
              Due Time
            </label>
            <input
              id="dueTime"
              type="time"
              name="dueTime"
              value={taskForm.dueTime}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label htmlFor="assignedBy" className="block text-sm font-medium text-gray-700 mb-1">
              Assigned By
            </label>
            <input
              id="assignedBy"
              type="text"
              value={currentUser.username}
              disabled
              className="w-full border rounded-lg px-3 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700 mb-1">
              Assign To
            </label>
            <select
              id="assignedTo"
              name="assignedTo"
              value={taskForm.assignedTo}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">
                Select User
              </option>

            {users.map((user) => (
              <option
                key={user.username}
                value={user.username}
              >
                {user.username}
              </option>
            ))}
          </select>
</div>
          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={() =>
                setShowModal(false)
              }
              className="px-4 py-2 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Save Task
            </button>

          </div>
        </form>

      </div>

    </div>
  );
};

CreateTaskModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  onTaskCreated: PropTypes.func,
};

export default CreateTaskModal;