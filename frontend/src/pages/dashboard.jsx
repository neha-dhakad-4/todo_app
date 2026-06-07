import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateTaskModal from "../components/CreateTaskModal";
import TaskList from "../components/TaskList";
import CopyTaskModal from "../components/CopyTaskModal";
import Navbar from "../components/navbar";
import SharedWithMeModal from "../components/SharedWithMeModal";
import axios from "axios";
const Dashboard = () => {
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [showSharedModal,setShowSharedModal] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showCopyModal, setShowCopyModal] =useState(false);
  const [selectedTask, setSelectedTask] =useState(null);
  const loadTasks = async (username) => {
    if (!username) return;

    try {
      const response = await axios.get(
        `http://localhost:5000/api/tasks/assigned-tasks/${username}`
      );

      setTasks(response.data);
    } catch (error) {
      console.error("Fetch tasks failed:", error);
    }
  };

  const fetchTasks = async () => {
    await loadTasks(user?.username);
  };

  useEffect(() => {
    if (!user) return;

    const load = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tasks/assigned-tasks/${user.username}`
        );

        setTasks(response.data);
      } catch (error) {
        console.error("Fetch tasks failed:", error);
      }
    };

    load();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  const handleDelete = async (task) => {
    const taskId = task._id || task.taskId;

    if (!taskId) {
      console.error("Delete failed: missing task id", task);
      return;
    }

    if (
      !globalThis.confirm(
        `Delete ${task.taskName}?`
      )
    ) {
      return;
    }

    try {
      console.log("Deleting task id:", taskId);

      const response = await axios.delete(
        `http://localhost:5000/api/tasks/delete-task/${taskId}`
      );

      console.log(response.data.message);

      loadTasks(user?.username);

    } catch (error) {
      console.error("Delete request failed:", error);
    }
  };

  const handleCopy = (task) => {

  setSelectedTask(task);

  setShowCopyModal(true);
};

  const handleShare = () => {
    console.log("Share List");
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24">

      <Navbar
        user={user}
        setShowModal={setShowModal}
        handleLogout={handleLogout}
        setShowSharedModal={setShowSharedModal}
      />

      <CreateTaskModal
        showModal={showModal}
        setShowModal={setShowModal}
        onTaskCreated={() => loadTasks(user?.username)}
      />
      <CopyTaskModal
      showCopyModal={showCopyModal}
      setShowCopyModal={setShowCopyModal}
      selectedTask={selectedTask}
       refreshTasks={fetchTasks}
      />
      <SharedWithMeModal
  showSharedModal={
    showSharedModal
  }
  setShowSharedModal={
    setShowSharedModal
  }
/>
      {/* Main Content */}
      <div className="p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Manage your tasks here.
        </p>
      </div>

      <div className="flex justify-center w-full px-8 pb-8">
        <div className="w-full max-w-4xl ">
          <TaskList
            tasks={tasks}
            onDelete={handleDelete}
            onCopy={handleCopy}
            onShare={handleShare}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;