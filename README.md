# TODO_APP

A full-stack Todo application with React + Vite frontend and Flask backend, using MongoDB for persistence.

## App Overview

This project lets users register, login, create task assignments, copy tasks, share task lists with other users, and view lists shared with them. It uses a React dashboard with filters and modals for task creation, copying, and shared-list management.

## Key Features

- User registration and login
- Create tasks with:
  - task name
  - due date
  - due time
  - assigned by current user
  - assigned to any registered user
- List tasks assigned to the current user
- Filter tasks by `All`, `Today`, and `Tomorrow`
- Copy an existing task with a new due date
- Share a filtered task list with another user
- View and delete task lists shared with you
- Delete assigned tasks
- Protected dashboard route that requires sign-in

## Tech Stack

- Backend: Flask
- Database: MongoDB (via `pymongo`)
- Frontend: React + Vite
- Styling: Tailwind CSS
- HTTP client: Axios

## Project Structure

```
TODO_APP/
├── backend/
│   ├── app.py              # Flask application and blueprint registration
│   ├── db.py               # MongoDB client setup and collections
│   ├── requirements.txt    # Python dependencies
│   └── routes/
│       ├── auth.py         # Register, login, and user list APIs
│       ├── share.py        # Share list APIs and shared-list management
│       └── task.py         # Create, fetch, delete, and copy tasks
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── pages/          # Home, Login, Register, Dashboard
│       └── components/     # Task list, modals, navbar, shared list UI
└── README.md
```

## Backend Setup

1. Open a terminal and go to the backend folder:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file in `backend/` containing your MongoDB connection values:
   ```env
   MONGO_URI=mongodb://localhost:27017
   DB_NAME=todo_app
   ```

5. Start the Flask server:
   ```bash
   python app.py
   ```

The backend will run on `http://localhost:5000`.

## Frontend Setup

1. Open a second terminal and go to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`.

## Usage

1. Open the app in your browser at `http://localhost:5173`
2. Register a new account
3. Login using your account
4. Use the dashboard to create tasks and assign them to users
5. Filter tasks by `Today` or `Tomorrow`
6. Copy a task to reuse it with a new due date
7. Share your current task list with another user
8. View lists that others have shared with you

## API Endpoints

### Authentication
- `POST /api/auth/register` — register new user
- `POST /api/auth/login` — login user
- `GET /api/auth/users` — list registered users

### Tasks
- `POST /api/tasks/create-task` — create a task
- `GET /api/tasks/assigned-tasks/<username>` — fetch tasks assigned to a user
- `DELETE /api/tasks/delete-task/<task_id>` — delete a task
- `POST /api/tasks/copy-task/<task_id>` — copy a task with a new due date

### Sharing
- `POST /api/share/share-list` — share current task list with another user
- `GET /api/share/shared-with-me/<username>` — get lists shared with a user
- `DELETE /api/share/delete-shared-list/<id>` — delete a shared list

## Notes

- Passwords are currently stored in plain text in MongoDB. For production use, implement password hashing.
- Authentication is client-driven via `localStorage`; there is no JWT/session token handling yet.
- The `status` field is initialized as `pending` when tasks are created.

## Improvement Ideas

- Add task completion and status updates
- Add authentication tokens or sessions
- Hash passwords before saving
- Add task editing and priority tags
- Add due-date reminders or notifications
- Improve shared list collaboration with comments

## License

This project is available for personal and educational use.
