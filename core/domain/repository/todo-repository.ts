import TodoEntity from "@/core/domain/entity/todo-entity";

interface TodoRepository {
  saveTodosToLocal(todos: TodoEntity[]): Promise<void>;

  saveTodosDirtyToLocal(todos: TodoEntity[]): Promise<void>;

  shouldPopulateInitialTodos(): Promise<boolean>;

  setPopulateInitialTodos(): Promise<void>;
}

export default TodoRepository;
