import TodoEntity from "@/core/domain/entity/todo-entity";
import {useCallback} from "react";
import {View} from "react-native";
import {FlashList} from "@shopify/flash-list";
import {withDatabase, withObservables} from "@nozbe/watermelondb/react";
import {EnhancedTodo} from "@/components/page/todo/catalogue/components/todo-component";
import Todo from "@/core/data/datasource/local/entity/todo";
import {Database} from "@nozbe/watermelondb";

export function TodosComponent({todos}: { todos: TodoEntity[] }) {
  const flashListRenderItem = useCallback(({item}: { item: TodoEntity }) => {
    return <EnhancedTodo key={item.id} todo={item}></EnhancedTodo>;
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlashList
        renderItem={flashListRenderItem}
        keyExtractor={(todo) => todo.id}
        data={todos}
        estimatedItemSize={20}
      />
    </View>
  )
}

export const EnhancedTodos = withObservables(['todos'], ({todos}) => ({
  todos: todos.observe(),
}))(TodosComponent)

export const DirectEnhancedTodos = withDatabase(
  withObservables([], ({database}: { database: Database }) => ({
    todos: database.get<Todo>('todos').query(),
  }))(TodosComponent)
);
