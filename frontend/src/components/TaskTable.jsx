import PropTypes from "prop-types";

const TaskTable = ({
  tasks,
  onDelete,
  onCopy,
  onStatusChange,
}) => {

  if (tasks.length === 0) {
    return <p className="text-gray-500">No tasks found</p>;
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full min-w-[640px]">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Task Name</th>
            <th className="p-3 text-left">Due Date</th>
            <th className="p-3 text-left">Due Time</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task._id} className="hover:bg-gray-50">
              <td className="p-3">{task.taskName}</td>
              <td className="p-3">{task.dueDate}</td>
              <td className="p-3">{task.dueTime}</td>
              <td className="p-3">
                {task.status === "done" ? (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    Done
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onStatusChange?.(task)}
                    className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-900 hover:bg-yellow-200"
                  >
                    Mark done
                  </button>
                )}
              </td>
              <td className="p-3">
                <div className="flex justify-center gap-2">
                  <button onClick={() => onCopy(task)} className="bg-blue-600 text-white px-3 py-1 rounded">
                    Copy
                  </button>
                  <button onClick={() => onDelete(task)} className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TaskTable.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    taskName: PropTypes.string,
    dueDate: PropTypes.string,
    dueTime: PropTypes.string,
    status: PropTypes.string,
  })).isRequired,
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func,
};

export default TaskTable;