# TrackIt - CLI Task Tracker

A modern command-line task management application built with Node.js. Organize and track your tasks with an intuitive CLI interface featuring colored output and formatted tables.

## Features

- **Create Tasks** - Add new tasks with descriptions
- **Update Tasks** - Modify task descriptions and status
- **Delete Tasks** - Remove completed or unwanted tasks
- **Status Management** - Organize tasks by status: `todo`, `in-progress`, `done`
- **List & Filter** - View all tasks or filter by specific status
- **Colored Output** - Beautiful terminal output with colors and tables
- **Persistent Storage** - Tasks saved in JSON format

## Prerequisites

- Node.js (v14 or higher)
- npm

## Installation

1. Download or clone the project
2. Navigate to the `app` directory:
   ```bash
   cd cli-task-tracker/app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Usage

Start the application:
```bash
node main.js
```

Enter commands at the prompt:

### Available Commands

| Command | Example | Description |
|---------|---------|-------------|
| `add` | `add Buy groceries` | Add a new task |
| `update` | `update 1 Buy milk and bread` | Update task description |
| `delete` | `delete 1` | Remove a task |
| `mark-in-progress` | `mark-in-progress 1` | Set task status to in-progress |
| `mark-done` | `mark-done 1` | Set task status to done |
| `list` | `list` | Show all tasks |
| `list {status}` | `list done` | Filter tasks by status (todo, in-progress, done) |
| `help` | `help` | Display all commands |
| `exit` | `exit` | Close application |

### Example Workflow

```
> add Complete project documentation
✔ Task added successfully (ID: 1)

> add Review pull requests
✔ Task added successfully (ID: 2)

> list
[Table showing all tasks]

> mark-in-progress 1
✔ Task 1 updated successfully

> list in-progress
[Table showing only in-progress tasks]

> update 1 Complete project documentation and tests
✔ Task 1 updated successfully

> mark-done 1
✔ Task 1 updated successfully

> delete 2
✔ Task 2 deleted

> exit
```

## Project Structure

```
cli-task-tracker/
├── app/
│   ├── main.js              # CLI entry point & command handler
│   ├── taskService.js       # Business logic for task operations
│   ├── storage.js           # File I/O for task persistence
│   ├── tasks.json           # Task database (auto-generated)
│   └── package.json         # Project dependencies
├── README.md                # This file
└── LICENSE                  # ISC License
```

## Architecture

### **main.js**
- CLI interface using `readline-sync`
- Command parsing and routing
- User input handling with error management
- Colored output with `chalk`

### **taskService.js**
- Core business logic for all task operations
- Task creation, update, deletion, and retrieval
- Status filtering and management
- Table-formatted output using `cli-table3`

### **storage.js**
- Async file I/O operations
- JSON file persistence
- Task data reading and writing

## Task Data Model

Each task contains:
```json
{
  "id": 1,
  "description": "Task description here",
  "status": "todo",
  "createdAt": "14/03/2026 10:30",
  "updatedAt": "14/03/2026 11:45"
}
```

### Status Options
- **todo** - Not started (red)
- **in-progress** - Currently being worked on (yellow)
- **done** - Completed (green)

## Dependencies

- **readline-sync** - Synchronous command-line input
- **date-fns** - Date formatting and manipulation
- **chalk** - Terminal string styling (colors)
- **cli-table3** - ASCII table formatting for task display

## Data Storage

Tasks are persisted in `tasks.json` located in the `app` directory. The file is automatically created and updated as you manage tasks. Format:
```json
[
  {
    "id": 1,
    "description": "First task",
    "status": "todo",
    "createdAt": "14/03/2026 10:30",
    "updatedAt": "14/03/2026 10:30"
  }
]
```

## Features Highlights

### ✨ Colored Output
- Error messages in red
- Success messages in green
- Information in yellow
- Column headers in cyan

### Formatted Tables
Tasks are displayed in a formatted table with columns:
- ID
- Description
- Status (color-coded)
- Created Date & Time
- Updated Date & Time

### Error Handling
- Task not found errors
- Invalid input validation
- Clear error messages
- Graceful exception handling

## Future Enhancements

- [ ] Task priority levels (low, medium, high)
- [ ] Due date tracking and reminders
- [ ] Task categories/tags
- [ ] Search functionality
- [ ] Export to CSV/PDF
- [ ] Database integration (MongoDB, PostgreSQL)
- [ ] Web UI interface
- [ ] Collaborative features
- [ ] Task duration/time tracking
- [ ] Recurring tasks

## Notes

- Task IDs are auto-generated and based on the highest ID + 1
- The app uses local time in DD/MM/YYYY HH:MM format
- All changes are immediately saved to `tasks.json`
- Empty descriptions are not allowed

## Contributing

Feel free to fork and contribute improvements to the project!

## icense

ISC

---

**Happy Task Tracking!**
