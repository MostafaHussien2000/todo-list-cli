import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

type SchemaType = {
  tasks: { id: number; context: string; completed: boolean }[];
};

export class JSONTodoCollection extends TodoCollection {
  private database: lowdb.LowdbSync<SchemaType>;

  constructor(userName: string, todoItems: TodoItem[] = []) {
    super(userName, []);
    this.database = lowdb(new FileSync("Todo.json"));
    if (this.database.has("tasks").value()) {
      let dbItems = this.database.get("tasks").value();
      dbItems.forEach((item) => {
        this.itemMap.set(
          item.id,
          new TodoItem(item.id, item.context, item.completed)
        );
      });
    } else {
      this.database.set("tasks", todoItems).write();
      todoItems.forEach((item) => this.itemMap.set(item.id, item));
    }
  }

  addTodo(task: string): number {
    let result = super.addTodo(task);
    this.storeTasks();
    return result;
  }

  markComplete(id: number, status: boolean): void {
    super.markComplete(id, status);
    this.storeTasks();
  }

  removeCompletedItems(): void {
    super.removeCompletedItems();
    this.storeTasks();
  }

  private storeTasks() {
    this.database.set("tasks", [...this.itemMap.values()]).write();
  }
}
