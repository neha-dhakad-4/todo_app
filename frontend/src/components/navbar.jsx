
const Navbar = ({ user, setShowModal, handleLogout, setShowSharedModal }) => {
  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 sm:px-8 py-3">
        <div className="max-w-screen-xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">

        <div className="flex-1 flex items-center gap-3 min-w-0">
          <div className="flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-semibold truncate">Hello, {user?.username} 👋</h2>
          </div>

          <div className="flex flex-1 justify-center sm:justify-start flex-wrap gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-4 sm:px-5 py-2 rounded-lg"
            >
              + Create Task
            </button>

            <button
              onClick={() => setShowSharedModal(true)}
              className="bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg"
            >
              Shared With Me
            </button>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 sm:px-5 py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>

        </div>
      </nav>
    </div>
  )
}

export default Navbar
