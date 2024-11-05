import Todo from "@/core/data/datasource/local/entity/todo";
import TodoLocalDataSource from "@/core/data/datasource/local/interface/todo-local-data-source";
import {Database} from "@nozbe/watermelondb";
import TodoEntity from "@/core/domain/entity/todo-entity";

class TodoLocalDataSourceImpl implements TodoLocalDataSource {
  private readonly database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async saveTodos(todos: TodoEntity[]): Promise<void> {
    const collection = this.database.get<Todo>('todos');
    await this.database.write(async () => {
      await this.database.batch(
        todos.map(todo => collection.prepareCreate((record) => {
          record._raw.id = todo.id;
          record.title = todo.title;
          record.description = todo.description;
          record.completed = todo.completed;
          record.createdAt = todo.createdAt;
          record.updatedAt = todo.updatedAt;
          record.dueDate = todo.dueDate;
          record.priority = todo.priority;
        }))
      );
    });
  }
}

export default TodoLocalDataSourceImpl;
