import React, { useState } from "react";
import PropTypes from "prop-types";
import TaskTable from "./TaskTable";
import TodayTasks from "./TodayTasks";
import ShareListModal from "./shareListModel";

const TaskList = ({
  tasks,
  onDelete,
  onCopy,
  onStatusChange,
}) => {
  const [showShareModal, setShowShareModal] =
  useState(false);
  const [filter, setFilter] =
    useState("all");

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const tomorrowDate =
    new Date();

  tomorrowDate.setDate(
    tomorrowDate.getDate() + 1
  );

  const tomorrow =
    tomorrowDate
      .toISOString()
      .split("T")[0];

  const filteredTasks =
    tasks.filter((task) => {

      const taskDate =
        task.dueDate.split("T")[0];

      if (filter === "today") {
        return taskDate === today;
      }

      if (filter === "tomorrow") {
        return taskDate === tomorrow;
      }

      return true;
    });

  return (
    <React.Fragment>
      <div className="bg-white rounded-xl shadow p-4 sm:p-5 w-full">

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">

          <h2 className="text-2xl font-bold">Todo Tasks</h2>

          <div className="flex items-center gap-3 w-full sm:w-auto">

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full sm:w-auto"
            >
              <option value="all">All Tasks</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
            </select>

            <button
              onClick={() => setShowShareModal(true)}
              className="bg-green-600 text-white px-3 py-2 rounded-lg whitespace-nowrap"
            >
              Share List
            </button>

          </div>

        </div>

        <div className="mt-6 overflow-x-auto">

          {filter === "today" ? (
            <TodayTasks
              tasks={filteredTasks}
              onDelete={onDelete}
              onCopy={onCopy}
            />
          ) : (
            <TaskTable
              tasks={filteredTasks}
              onDelete={onDelete}
              onCopy={onCopy}
              onStatusChange={onStatusChange}
            />
          )}

        </div>

      </div>

      <ShareListModal
        showShareModal={showShareModal}
        setShowShareModal={setShowShareModal}
        tasks={filteredTasks}
      />
    </React.Fragment>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onCopy: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func,
};

export default TaskList;