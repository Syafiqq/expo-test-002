import {View} from "react-native";
import TodoEntity from "@/core/domain/entity/todo-entity";
import Todo from "@/core/data/datasource/local/entity/todo";
import {useEffect, useState} from "react";
import {useDatabase} from "@nozbe/watermelondb/hooks";
import {TodosComponent} from "@/components/page/todo/catalogue/components/todo-list";
import TodoCatalogueCount from "@/components/page/todo/catalogue/components/todo-catalogue-count";

export function TodoCataloguePageStatic() {
  const [collection, setCollection] = useState<TodoEntity[]>([]);
  const database = useDatabase();

  useEffect(() => {
    let collection = database.get<Todo>('todos');
    collection.query().fetch().then((todos) => setCollection(todos));
  }, [database]);

  return (
    <View style={{flex: 1}}>
      <TodoCatalogueCount></TodoCatalogueCount>
      <View style={{height: 8}}></View>
      <TodosComponent todos={collection}></TodosComponent>
    </View>
  );
}
