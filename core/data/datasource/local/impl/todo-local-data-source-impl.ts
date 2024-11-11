import Todo from "@/core/data/datasource/local/entity/todo";
import TodoLocalDataSource from "@/core/data/datasource/local/interface/todo-local-data-source";
import {Database, Q} from "@nozbe/watermelondb";
import TodoEntity from "@/core/domain/entity/todo-entity";
import PopulateInitial from "@/core/data/datasource/local/entity/populate-initial";

class TodoLocalDataSourceImpl implements TodoLocalDataSource {
  private readonly database: Database;

  constructor(database: Database) {
    this.database = database;
  }

  async shouldPopulateInitialTodos(): Promise<boolean> {
    let result = await this.getPopulateInitial();
    if (!result) {
      return true;
    }
    return !result.completed;
  }

  async setPopulateInitialTodos(): Promise<void> {
    let result = await this.getPopulateInitial();
    return this.database.write(async () => {
      if (result) {
        await result.update((record) => {
          record.completed = true;
        });
      } else {
        const collection = this.database.get<PopulateInitial>('populate_initial');
        await collection.create((record) => {
          record.title = 'todos';
          record.completed = true;
        });
      }
    });
  }

  async getPopulateInitial(): Promise<PopulateInitial | undefined> {
    const collection = this.database.get<PopulateInitial>('populate_initial');
    let results = await collection.query(Q.where('title', 'todos')).fetch();
    if (results.length <= 0) {
      return undefined;
    }
    return results[0];
  }

  async saveTodos(todos: TodoEntity[]): Promise<void> {
    const collection = this.database.get<Todo>('todos');
    await this.database.write(async () => {
      await this.database.batch(
        todos.map(todo => collection.prepareCreate((record) => {
          record._raw.id = todo.id;
          record.title = todo.title;
        }))
      );
    });
  }

  async saveTodosDirty(todos: TodoEntity[]): Promise<void> {
    const collection = this.database.get<Todo>('todos');
    await this.database.write(async () => {
      await this.database.batch(
        todos.map(todo => collection.prepareCreateFromDirtyRaw({...todo, id: undefined}))
      );
    });
  }
}

export default TodoLocalDataSourceImpl;
