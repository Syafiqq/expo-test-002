import {View} from "react-native";
import Todo from "@/core/data/datasource/local/entity/todo";
import {useCallback, useEffect, useState} from "react";
import {Query} from "@nozbe/watermelondb";
import {useDatabase} from "@nozbe/watermelondb/hooks";
import {EnhancedTodos} from "@/components/page/todo/catalogue/components/todo-list";
import TodoCatalogueCount from "@/components/page/todo/catalogue/components/todo-catalogue-count";

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

  if (!collection) {
    return null;
  }

  return (
    <View style={{flex: 1}}>
      <TodoCatalogueCount></TodoCatalogueCount>
      <View style={{height: 8}}></View>
      <EnhancedTodos todos={collection}></EnhancedTodos>
    </View>
  );
}
