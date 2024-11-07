import TodoEntity from "@/core/domain/entity/todo-entity";

interface TodoLocalDataSource {
  shouldPopulateInitialTodos(): Promise<boolean>;

  setPopulateInitialTodos(): Promise<void>;

  saveTodos(todos: TodoEntity[]): Promise<void>;

  saveTodosDirty(todos: TodoEntity[]): Promise<void>;
}

export default TodoLocalDataSource;
