import { TodoItem } from "./todoItem";

type itemsCount = {
  total: number;
  incomplete: number;
};

export class TodoCollection {
  private nextId: number = 1;
  protected itemMap = new Map<number, TodoItem>();

  constructor(public userName: string, public todoItems: TodoItem[] = []) {
    todoItems.forEach((item) => this.itemMap.set(item.id, item));
  }

  addTodo(task: string): number {
    while (this.getTodoById(this.nextId)) {
      this.nextId++;
    }
    this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
    return this.nextId;
  }

  getTodoItems(includeCompleted: boolean = true): TodoItem[] {
    return [...this.itemMap.values()].filter(
      (item) => includeCompleted || !item.completed
    );
  }

  getItemCount(): itemsCount {
    return {
      total: this.itemMap.size,
      incomplete: this.getTodoItems(false).length,
    };
  }

  getTodoById(id: number): TodoItem | undefined {
    return this.itemMap.get(id);
  }

  markComplete(id: number, status: boolean): void {
    const todoItem = this.getTodoById(id);
    if (todoItem) {
      todoItem.completed = status;
    }
  }

  removeCompletedItems(): void {
    this.itemMap.forEach((item) => {
      if (item.completed) {
        this.itemMap.delete(item.id);
      }
    });
  }
}
