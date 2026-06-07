const TaskTable = ({
  tasks,
  onDelete,
  onCopy,
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
              <td className="p-3">{task.status}</td>
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

export default TaskTable;