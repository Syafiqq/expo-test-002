import {storage} from "@/core/data/datasource/cache/impl/mmkv";
import {MMKV} from "react-native-mmkv";
import TodoCacheDataSource from "@/core/data/datasource/cache/interface/todo-cache-data-source";

class TodoCacheDataSourceImpl implements TodoCacheDataSource {
  private storage: MMKV;

  constructor() {
    this.storage = storage
  }

  shouldPopulateInitialTodos(): boolean {
    return this.storage.getBoolean('needPopulateDbMigration') !== false;
  }

  setPopulateInitialTodos(): void {
    this.storage.set('needPopulateDbMigration', false);
  }
}

export default TodoCacheDataSourceImpl;
