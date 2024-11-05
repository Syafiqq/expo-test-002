import TodoEntity from "@/core/domain/entity/todo-entity";

interface TodoRepository {
  saveTodosToLocal(todos: TodoEntity[]): Promise<void>;

  shouldPopulateInitialTodos(): boolean;

  setPopulateInitialTodos(): void;
}

export default TodoRepository;
