import {useMemo} from 'react';
import PopulateInitialTodosUseCase from "@/core/domain/use-case/populate-initial-todos-use-case";
import PopulateInitialTodosUseCaseImpl from "@/core/domain/use-case/populate-initial-todos-use-case-impl";
import {useTodoRepository} from "@/core/di/data/repository/use-todo-repository";

export const usePopulateInitialTodosUseCase = (): PopulateInitialTodosUseCase => {
  const repository = useTodoRepository();
  return useMemo(() => new PopulateInitialTodosUseCaseImpl(repository), [repository]);
}
