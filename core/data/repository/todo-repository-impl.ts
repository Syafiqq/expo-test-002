import TodoRepository from "@/core/domain/repository/todo-repository";
import TodoLocalDataSource from "@/core/data/datasource/local/interface/todo-local-data-source";
import TodoEntity from "@/core/domain/entity/todo-entity";
import TodoCacheDataSource from "@/core/data/datasource/cache/interface/todo-cache-data-source";

class TodoRepositoryImpl implements TodoRepository {
  private readonly local: TodoLocalDataSource;
  private readonly cache: TodoCacheDataSource;

  constructor(local: TodoLocalDataSource,
              cache: TodoCacheDataSource,
  ) {
    this.local = local;
    this.cache = cache;
  }

  saveTodosToLocal(todos: TodoEntity[]): Promise<void> {
    return this.local.saveTodos(todos);
  }

  shouldPopulateInitialTodos(): boolean {
    return this.cache.shouldPopulateInitialTodos()
  }

  setPopulateInitialTodos(): void {
    return this.cache.setPopulateInitialTodos()
  }
}

export default TodoRepositoryImpl;
