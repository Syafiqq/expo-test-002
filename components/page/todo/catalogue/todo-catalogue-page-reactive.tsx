import {View} from "react-native";
import Todo from "@/core/data/datasource/local/entity/todo";
import {useCallback, useEffect, useState} from "react";
import {Query} from "@nozbe/watermelondb";
import {useDatabase} from "@nozbe/watermelondb/hooks";
import {EnhancedTodos} from "@/components/page/todo/catalogue/components/todo-list";
import {todoAppender, todoUpdater} from "@/components/page/todo/catalogue/todo-helper";

export function TodoCataloguePageReactive() {
  const [collection, setCollection] = useState<Query<Todo> | undefined>(undefined);
  const database = useDatabase();

  useEffect(() => {
    callback();
  }, [database]);
  const callback = useCallback(() => {
    let collection = database.get<Todo>('todos');
    setCollection(collection.query())
  }, [database]);

  useEffect(() => {
    const subscription = todoUpdater(database);

    return () => subscription.unsubscribe();
  }, [database]);

  useEffect(() => {
    const subscription = todoAppender(database);

    return () => subscription.unsubscribe();
  }, [database]);

  if (!collection) {
    return null;
  }

  return (
    <View style={{flex: 1}}>
      <EnhancedTodos todos={collection}></EnhancedTodos>
    </View>
  );
}
