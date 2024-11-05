import {useMemo} from 'react';
import {useTodoCacheDataSource} from "@/core/di/data/datasource/cache/use-todo-cache-data-source";
import TodoRepository from "@/core/domain/repository/todo-repository";
import TodoRepositoryImpl from "@/core/data/repository/todo-repository-impl";
import {useTodoLocalDataSource} from "@/core/di/data/datasource/local/use-todo-local-data-source";

export const useTodoRepository = (): TodoRepository => {
  const local = useTodoLocalDataSource();
  const cache = useTodoCacheDataSource();
  return useMemo(() => new TodoRepositoryImpl(local, cache), [local, cache]);
}
