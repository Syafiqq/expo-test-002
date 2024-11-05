interface TodoEntity {
  id: string;
  title: string;
  description: string | undefined;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  dueDate: Date | undefined;
  priority: string;
}

export default TodoEntity;
