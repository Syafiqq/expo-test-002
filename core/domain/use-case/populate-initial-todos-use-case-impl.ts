import PopulateInitialTodosUseCase from "@/core/domain/use-case/populate-initial-todos-use-case";
import TodoRepository from "@/core/domain/repository/todo-repository";
import todos from "@/core/domain/use-case/populate-initial-todos-use-case-data";

class PopulateInitialTodosUseCaseImpl implements PopulateInitialTodosUseCase {
  private readonly todoRepository: TodoRepository;

  constructor(todoRepository: TodoRepository,) {
    this.todoRepository = todoRepository;
  }

  async execute(): Promise<void> {
    const shouldPopulate = await this.todoRepository.shouldPopulateInitialTodos();
    if (!shouldPopulate) {
      return;
    }

    const data = todos;
    await this.todoRepository.saveTodosDirtyToLocal(
      data.map((d) => {
        return {
          id: d.id,
          title: d.title,
          description: d.description,
          completed: d.completed === 1,
          createdAt: new Date(d.createdAt),
          updatedAt: new Date(d.updatedAt),
          dueDate: d.dueDate ? new Date(d.dueDate) : undefined,
          priority: d.priority,
        };
      })
    );

    await this.todoRepository.setPopulateInitialTodos();
  }
}

export default PopulateInitialTodosUseCaseImpl;
