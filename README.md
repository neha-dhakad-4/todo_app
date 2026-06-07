# TODO App

A simple and efficient task management application built with Flask and SQLite. Users can create accounts, authenticate, and manage their daily tasks with ease.

## Features

- **User Authentication**: Secure login and registration system
- **Task Management**: Create, read, update, and delete tasks
- **Task Status Tracking**: Mark tasks as pending or completed
- **User-Specific Tasks**: Each user can manage their own task list
- **Responsive Design**: Clean and intuitive user interface

## Tech Stack

- **Backend**: Flask (Python web framework)
- **Database**: SQLite
- **Frontend**: HTML, CSS, JavaScript
- **ORM**: SQLAlchemy

## Project Structure

```
TODO_APP/
├── run.py                 # Application entry point
├── app/
│   ├── __init__.py       # Flask app factory and configuration
│   ├── models.py         # Database models (User, Task)
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py       # Authentication routes (login, register)
│   │   └── tasks.py      # Task management routes (CRUD operations)
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css # Application styling
│   │   └── js/
│   │       └── script.js # Client-side functionality
│   ├── templates/
│   │   ├── base.html     # Base template with navigation
│   │   ├── login.html    # Login page
│   │   ├── register.html # User registration page
│   │   ├── tasks.html    # Main task list page
│   │   └── update.html   # Task update/edit page
│   └── instance/         # Instance folder for database and config

```

## Installation

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)

### Setup Instructions

1. **Clone or navigate to the project directory:**
   ```bash
   cd TODO_APP
   ```

2. **Create a virtual environment (recommended):**
   ```bash
   python -m venv venv
   ```

3. **Activate the virtual environment:**
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. **Install required dependencies:**
   ```bash
   pip install flask flask-sqlalchemy
   ```

5. **Run the application:**
   ```bash
   python run.py
   ```

6. **Access the application:**
   Open your web browser and navigate to `http://localhost:5000`

## Database Models

### User Model
- `id`: Primary key
- `username`: Unique username
- `password`: Encrypted password

### Task Model
- `id`: Primary key
- `title`: Task title/description
- `status`: Task status (Pending/Completed)
- `user_id`: Foreign key linking to User

## Usage

1. **Register**: Create a new user account on the registration page
2. **Login**: Log in with your credentials
3. **Add Task**: Create a new task from the main dashboard
4. **View Tasks**: See all your tasks on the main page
5. **Update Task**: Edit or update task details
6. **Delete Task**: Remove tasks you no longer need

## Configuration

Update the following in `app/__init__.py` for production:

```python
app.config['SECRET_KEY'] = 'your_secure_secret_key'  # Change to a secure key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todo.db'  # Database location
```

## Future Enhancements

- Task deadlines and priority levels
- Task categories/tags
- Email notifications
- Dark mode toggle
- Export tasks to PDF/CSV
- Collaborative task sharing
- Mobile app version

## License

This project is open source and available for personal and educational use.

## Support

For issues or questions, please check the code comments or refer to the Flask and SQLAlchemy documentation.
