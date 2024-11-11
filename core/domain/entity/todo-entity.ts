interface TodoEntity {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  picture?: string;
}

export default TodoEntity;
