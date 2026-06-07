import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const CopyTaskModal = ({
  showCopyModal,
  setShowCopyModal,
  selectedTask,
  refreshTasks,
}) => {

  const [copyDate, setCopyDate] =
    useState("");

  const handleCopy = async () => {
    if (!selectedTask?._id) {
      console.error("No task selected to copy");
      return;
    }

    try {

      await axios.post(
        `http://localhost:5000/api/tasks/copy-task/${selectedTask._id}`,
        {
          dueDate: copyDate,
        }
      );

      console.log("Task copied successfully");

      refreshTasks();

      setShowCopyModal(false);

    } catch (error) {
      console.log(error);
    }
  };

  if (!showCopyModal || !selectedTask) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">

      <div className="bg-white p-4 rounded-xl w-full max-w-xs sm:max-w-md">

        <h2 className="text-2xl font-bold mb-4">
          Copy Task
        </h2>

        <p className="mb-4">
          {selectedTask.taskName}
        </p>

        <input
          type="date"
          value={copyDate}
          onChange={(e) =>
            setCopyDate(
              e.target.value
            )
          }
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end gap-3 mt-5">

          <button
            onClick={() =>
              setShowCopyModal(false)
            }
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Copy
          </button>

        </div>

      </div>

    </div>
  );
};

CopyTaskModal.propTypes = {
  showCopyModal: PropTypes.bool.isRequired,
  setShowCopyModal: PropTypes.func.isRequired,
  selectedTask: PropTypes.shape({
    _id: PropTypes.string,
    taskName: PropTypes.string,
  }).isRequired,
  refreshTasks: PropTypes.func.isRequired,
};

export default CopyTaskModal;