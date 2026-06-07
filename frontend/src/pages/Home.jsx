import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-blue-600">
          TodoFlow
        </h1>

        <div className="flex gap-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center h-[80vh] px-6">
        <h2 className="text-5xl font-bold text-gray-800 mb-6">
          Organize Your Work Smarter
        </h2>

        <p className="max-w-2xl text-lg text-gray-600 leading-8">
          Manage your daily tasks efficiently, collaborate with team members,
          and stay productive with shared task lists.
        </p>

        <p className="max-w-2xl text-lg text-gray-600 leading-8 mt-2">
          Assign tasks to others, track progress, and create multiple versions
          of your day to monitor productivity.
        </p>

        <p className="max-w-2xl text-lg text-gray-600 leading-8 mt-2">
          TodoFlow helps individuals and teams plan, organize, and achieve
          their goals with ease.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;