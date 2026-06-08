import PropTypes from "prop-types";
import TaskTable from "./TaskTable";

const TodayTasks = ({
  tasks,
  onDelete,
  onCopy,
  onStatusChange,
}) => {

  const getTimeSlot = (time) => {

    const hour =
      Number(time.split(":")[0]);

    if (hour >= 5 && hour < 12) {
      return "morning";
    }

    if (hour >= 12 && hour < 17) {
      return "afternoon";
    }

    if (hour >= 17 && hour < 21) {
      return "evening";
    }

    return "night";
  };

  const morningTasks =
    tasks.filter(
      task =>
        getTimeSlot(
          task.dueTime
        ) === "morning"
    );

  const afternoonTasks =
    tasks.filter(
      task =>
        getTimeSlot(
          task.dueTime
        ) === "afternoon"
    );

  const eveningTasks =
    tasks.filter(
      task =>
        getTimeSlot(
          task.dueTime
        ) === "evening"
    );

  const nightTasks =
    tasks.filter(
      task =>
        getTimeSlot(
          task.dueTime
        ) === "night"
    );

  return (
    <div>

      {morningTasks.length > 0 && (
        <div className="mb-8">

          <h2 className="text-xl font-bold mb-3">
            Today - Morning Tasks
          </h2>

          <TaskTable
            tasks={morningTasks}
            onDelete={onDelete}
            onCopy={onCopy}
            onStatusChange={onStatusChange}
          />

        </div>
      )}

      {afternoonTasks.length > 0 && (
        <div className="mb-8">

          <h2 className="text-xl font-bold mb-3">
            Today - Afternoon Tasks
          </h2>

          <TaskTable
            tasks={afternoonTasks}
            onDelete={onDelete}
            onCopy={onCopy}
            onStatusChange={onStatusChange}
          />

        </div>
      )}

      {eveningTasks.length > 0 && (
        <div className="mb-8">

          <h2 className="text-xl font-bold mb-3">
            Today - Evening Tasks
          </h2>

          <TaskTable
            tasks={eveningTasks}
            onDelete={onDelete}
            onCopy={onCopy}
            onStatusChange={onStatusChange}
          />

        </div>
      )}

      {nightTasks.length > 0 && (
        <div className="mb-8">

          <h2 className="text-xl font-bold mb-3">
            Today - Night Tasks
          </h2>

          <TaskTable
            tasks={nightTasks}
            onDelete={onDelete}
            onCopy={onCopy}
            onStatusChange={onStatusChange}
          />

        </div>
      )}

    </div>
  );
};

TodayTasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func,
};

export default TodayTasks;