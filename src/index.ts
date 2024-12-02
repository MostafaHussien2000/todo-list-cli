import inquirer from "inquirer";

import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import { JSONTodoCollection } from "./jsonTodoCollection";

let todoItems: TodoItem[] = [
  new TodoItem(1, "Buy Flowers."),
  new TodoItem(2, "Get Shoes."),
  new TodoItem(3, "Collect Tickets."),
  new TodoItem(4, "Call Joe.", true),
];

let collection: TodoCollection = new JSONTodoCollection("John", todoItems);

enum COMMANDS {
  AddNewTask = "Add New Task.",
  ToggleTaskStatus = "Mark Completed/Incomplete Tasks.",
  ToggleCompletedTasks = "Show/Hide Completed Tasks.",
  DeleteCompletedTasks = "Delete All Completed Tasks.",
  Quit = "Quit.",
}

let showCompletedToggle = true;

function displayTodoList(): void {
  console.log(`${collection.userName}'s Todo List`);
  if (collection.getItemCount().incomplete === 0) {
    console.log("All tasks are completed.\n");
  } else {
    console.log(
      `(You have ${collection.getItemCount().incomplete} incomplete item${
        collection.getItemCount().incomplete === 1 ? "" : "s"
      })\n`
    );
  }
  collection
    .getTodoItems(showCompletedToggle)
    .forEach((item) => item.printDetails());
  console.log("\n");
}

/* Commands Functions
===================== */

// Add new task
function addNewTaskPrompt(): void {
  console.clear();
  inquirer
    .prompt({
      type: "input",
      name: "newTask",
      message: "Enter your new task:",
    })
    .then((answer) => {
      let taskContext = answer.newTask as string;
      if (taskContext.trim() !== "") {
        collection.addTodo(taskContext);
      }
      promptUser();
    })
    .catch((err) => {
      console.error(err.message);
      promptUser();
    });
}

// Toggle task status
function toggleTaskStatusPrompt(): void {
  inquirer
    .prompt({
      type: "checkbox",
      name: "complete",
      message: "Mark tasks to complete:",
      choices: collection.getTodoItems(true).map((item) => ({
        name: item.task,
        value: item.id,
        checked: item.completed,
      })),
    })
    .then((answer) => {
      let completedTasks = answer.complete as number[];
      collection.getTodoItems(true).forEach((item) => {
        collection.markComplete(
          item.id,
          completedTasks.find((id) => id === item.id) !== undefined
        );
      });
      promptUser();
    });
}

// show / hide completed tasks
function toggleTasksPrompt(): void {}

// delete completed tasks
function deleteCompletedTasksPrompt(): void {}

function promptUser(): void {
  console.clear();
  displayTodoList();
  inquirer
    .prompt({
      type: "list",
      name: "command",
      message: "Choose option:",
      choices: Object.values(COMMANDS),
    })
    .then((answer) => {
      switch (answer.command) {
        case COMMANDS.AddNewTask:
          addNewTaskPrompt();
          break;
        case COMMANDS.ToggleTaskStatus:
          toggleTaskStatusPrompt();
          break;
        case COMMANDS.ToggleCompletedTasks:
          showCompletedToggle = !showCompletedToggle;
          promptUser();
          break;
        case COMMANDS.DeleteCompletedTasks:
          collection.removeCompletedItems();
          promptUser();
          break;
        case COMMANDS.Quit:
          console.clear();
          break;
        default:
          console.log("Invalid option.");
          promptUser();
          return;
      }
    });
}

promptUser();
