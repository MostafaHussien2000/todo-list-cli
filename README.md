# Todo List CLI
### Overview
This is a TypeScript-based command-line Todo List application that allows users to manage their tasks with persistent storage using JSON files. This project was built as a learning exercise to understand the concepts of TypeScript, JSON file-based databases, and command-line interfaces.
### Technical Stack
- Language: TypeScript.
- Storage: LowDB (JSON file-based database).
- User Interface: Inquirer (command-line interface).
### Features
- Add new tasks to the list.
- Mark tasks as completed or incomplete.
- Show/hide completed tasks.
- Save and load tasks from a JSON file.
### Project Structure
The project is structured as follows:
``` filetree
src/
├── index.ts              # Main application entry point
├── todoItem.ts           # Todo item model
├── todoCollection.ts     # Base collection class for todo management
└── jsonTodoCollection.ts # Extended collection class with JSON persistence
```
### Core Components
1. TodoItem: (`todoItem.ts`)
* Represents a single todo item with properties:
    * `id`: Unique identifier.
    * `task`: Task description.
    * `completed`: Completion status.
2. TodoCollection: (`todoCollection.ts`)
Base class providing core todo management functionality:
* Task management operations:
    * Add new todos
    * Mark todos as complete/incomplete
    * Get todos with filtering options
    * Remove completed todos
* Maintains todos in a Map data structure.
* Tracks item counts (total and incomplete).
3. JSONTodoCollection: (`jsonTodoCollection.ts`)
Extends TodoCollection with persistence features:
* Saves todos to Todo.json file.
* Automatically loads existing todos on startup.
* Persists changes for all operations.
* Uses LowDB for file operations.
4. Main Application: (`index.ts`)
Implements the command-line interface with these features:
* Command menu with options:
    * Add new tasks.
    * Toggle task completion status.
    * Toggle showing/hiding completed tasks.
    * Delete completed tasks.
    * Quit the application
* Interactive prompts using Inquirer.js.
* Display of todo list with completion status.
* Task count summary.
### Getting Started
1. Clone the repository: 
```bash
git clone https://github.com/mostafahussien2000/todo-list-cli.git
```
2. Install dependencies:
```bash
npm install
```
3. Run the application:
```bash
npm start
```
4. Follow the prompts to manage your todo list.
### Data Persistence
* Todos are stored in `Todo.json` in the root directory.
* Data structure includes task ID, context, and completion status.
* Changes are automatically saved after each operation.
### Dependencies
- `@inquirer/prompts`: Command-line interface for user input.
- `lowdb`: JSON file-based database for data persistence.
- `inquirer`: Command-line interface for user input.
### Development Dependencies
- `@types/inquirer`: Type definitions for `inquirer`.
- `@types/lowdb`: Type definitions for `lowdb`.