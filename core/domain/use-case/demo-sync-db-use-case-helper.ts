import {SyncPullArgs, SyncPullResult, SyncPushArgs, SyncPushResult} from "@nozbe/watermelondb/sync";
import {uuid} from "expo-modules-core";
import TodoEntity from "@/core/domain/entity/todo-entity";
import {Database, DirtyRaw} from "@nozbe/watermelondb";
import Todo from "@/core/data/datasource/local/entity/todo";
import {randomiseTitle} from "@/components/page/todo/catalogue/todo-helper";

const randomTodoItemFromDb = async (database: Database): Promise<TodoEntity | undefined> => {
  let collection = database.get<Todo>('todos');
  const todoIds = await collection.query().fetchIds();
  if (todoIds.length <= 0) {
    return undefined;
  }
  const todoId = todoIds[Math.floor(Math.random() * todoIds.length)];
  return await collection.find(todoId);
}
const createNItems = (n: number) => {
  let created = []
  const now = Date.now()
  for (let i = 0; i < n; i++) {
    created.push({
      id: uuid.v4(),
      title: randomiseTitle(`Title ${i}`, Date.now()),
      created_at: now,
      updated_at: now,
    })
  }
  return created;
}
const updateRandomItem = async (database: Database) => {
  let updated = []
  const now = Date.now()
  const todo = await randomTodoItemFromDb(database);
  if (todo) {
    updated.push({
      id: todo.id,
      title: randomiseTitle(todo.title, Date.now()),
      updated_at: now,
    })
  }
  return updated;
}
const deleteRandomItem = async (database: Database) => {
  let deleted = []
  const todo = await randomTodoItemFromDb(database);
  if (todo) {
    deleted.push(todo.id)
  }
  return deleted;
}

export const pullDefaultSuccessWithEmpty = (): ((data: SyncPullArgs) => Promise<SyncPullResult>) => {
  return async (_: SyncPullArgs): Promise<SyncPullResult> => {
    return {changes: {}, timestamp: Date.now()}
  }
}

export const pushDefaultSuccessWithEmpty = (): (data: SyncPushArgs) => Promise<SyncPushResult | undefined | void> => {
  return async (_: SyncPushArgs): Promise<SyncPushResult | undefined | void> => {
  }
}

export const pullWithCreateData = (n: number): ((data: SyncPullArgs) => Promise<SyncPullResult>) => {
  return async (_: SyncPullArgs): Promise<SyncPullResult> => {
    return {
      changes: {
        todos: {
          created: createNItems(n),
          updated: [],
          deleted: [],
        }
      },
      timestamp: Date.now()
    }
  }
}

export const pullWithUpdatedData = (database: Database): ((data: SyncPullArgs) => Promise<SyncPullResult>) => {
  return async (_: SyncPullArgs): Promise<SyncPullResult> => {
    return {
      changes: {
        todos: {
          created: [],
          updated: await updateRandomItem(database),
          deleted: [],
        }
      },
      timestamp: Date.now()
    }
  }
}

export const pullWithDeletedData = (database: Database): ((data: SyncPullArgs) => Promise<SyncPullResult>) => {
  return async (_: SyncPullArgs): Promise<SyncPullResult> => {
    return {
      changes: {
        todos: {
          created: [],
          updated: [],
          deleted: await deleteRandomItem(database),
        }
      },
      timestamp: Date.now()
    }
  }
}

export const pullWithCreateAndUpdatedData = (database: Database): ((data: SyncPullArgs) => Promise<SyncPullResult>) => {
  return async (_: SyncPullArgs): Promise<SyncPullResult> => {
    return {
      changes: {
        todos: {
          created: createNItems(2),
          updated: await updateRandomItem(database),
          deleted: [],
        }
      },
      timestamp: Date.now()
    }
  }
}

export const pullWithCreateAndDeleteData = (database: Database): ((data: SyncPullArgs) => Promise<SyncPullResult>) => {
  return async (_: SyncPullArgs): Promise<SyncPullResult> => {
    return {
      changes: {
        todos: {
          created: createNItems(2),
          updated: [],
          deleted: await deleteRandomItem(database),
        }
      },
      timestamp: Date.now()
    }
  }
}

export const pullWithMalformedCreatData = (): ((data: SyncPullArgs) => Promise<SyncPullResult>) => {
  let created = createNItems(1);
  if (created.length > 0) {
    let newItem = {...created[0]}
    // @ts-ignore
    delete newItem.title;
    // @ts-ignore
    newItem.created_at = ['123'];
    created = [
      newItem,
    ]
  }
  return async (_: SyncPullArgs): Promise<SyncPullResult> => {
    return {
      changes: {
        todos: {
          created: created,
          updated: [],
          deleted: [],
        }
      },
      timestamp: Date.now()
    }
  }
}

export const pullWithDuplicatedCreatData = async (database: Database): Promise<((data: SyncPullArgs) => Promise<SyncPullResult>)> => {
  let created = createNItems(1);
  const todo = await updateRandomItem(database);
  if (created.length > 0 && todo) {
    let newItem = {
      ...created[0],
      id: todo[0].id,
    }
    created = [
      newItem,
    ]
  }
  return async (_: SyncPullArgs): Promise<SyncPullResult> => {
    return {
      changes: {
        todos: {
          created: created,
          updated: [],
          deleted: [],
        }
      },
      timestamp: Date.now()
    }
  }
}

export const pullWithNotExistUpdateData = async (database: Database): Promise<((data: SyncPullArgs) => Promise<SyncPullResult>)> => {
  let updated: DirtyRaw[] = []
  const todo = await updateRandomItem(database);
  if (todo) {
    let newItem = {
      ...todo[0],
      id: uuid.v4(),
    }
    updated = [
      newItem,
    ]
  }
  return async (_: SyncPullArgs): Promise<SyncPullResult> => {
    return {
      changes: {
        todos: {
          created: [],
          updated: updated,
          deleted: [],
        }
      },
      timestamp: Date.now()
    }
  }
}

export const pullWithNotExistDeleteData = (): ((data: SyncPullArgs) => Promise<SyncPullResult>) => {
  let deleted = [
    uuid.v4(),
  ]
  return async (_: SyncPullArgs): Promise<SyncPullResult> => {
    return {
      changes: {
        todos: {
          created: [],
          updated: [],
          deleted: deleted,
        }
      },
      timestamp: Date.now()
    }
  }
}

export const pullWithError = (): ((data: SyncPullArgs) => Promise<SyncPullResult>) => {
  return async (_: SyncPullArgs): Promise<SyncPullResult> => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    throw Error('Pull error occurred')
  }
}

export const pushWithError = (): (data: SyncPushArgs) => Promise<SyncPushResult | undefined | void> => {
  return async (_: SyncPushArgs): Promise<SyncPushResult | undefined | void> => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    throw Error('Push error occurred')
  }
}
