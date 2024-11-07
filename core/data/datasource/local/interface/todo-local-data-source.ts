import TodoEntity from "@/core/domain/entity/todo-entity";

interface TodoLocalDataSource {
  saveTodos(todos: TodoEntity[]): Promise<void>;

  saveTodosDirty(todos: TodoEntity[]): Promise<void>;
}

export default TodoLocalDataSource;
