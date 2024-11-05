import TodoLocalDataSource from "@/core/data/datasource/local/interface/todo-local-data-source";
import {useDatabase} from "@nozbe/watermelondb/hooks";
import TodoLocalDataSourceImpl from "@/core/data/datasource/local/impl/todo-local-data-source-impl";
import {useMemo} from "react";

export const useTodoLocalDataSource = (): TodoLocalDataSource => {
  const db = useDatabase();
  return useMemo(() => new TodoLocalDataSourceImpl(db), [db]);
}
