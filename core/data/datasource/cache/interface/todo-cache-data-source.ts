interface TodoCacheDataSource {
  shouldPopulateInitialTodos(): boolean;

  setPopulateInitialTodos(): void;
}

export default TodoCacheDataSource;
