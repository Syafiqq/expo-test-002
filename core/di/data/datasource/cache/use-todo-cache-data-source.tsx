import {useMemo} from "react";
import TodoCacheDataSourceImpl from "@/core/data/datasource/cache/impl/todo-cache-data-source-impl";
import TodoCacheDataSource from "@/core/data/datasource/cache/interface/todo-cache-data-source";

export const useTodoCacheDataSource = (): TodoCacheDataSource => useMemo(() => new TodoCacheDataSourceImpl(), []);
