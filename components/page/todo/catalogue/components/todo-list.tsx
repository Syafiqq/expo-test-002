import TodoEntity from "@/core/domain/entity/todo-entity";
import {useCallback} from "react";
import {View} from "react-native";
import {FlashList} from "@shopify/flash-list";
import {withObservables} from "@nozbe/watermelondb/react";
import {EnhancedTodo} from "@/components/page/todo/catalogue/components/todo-component";

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

const enhanceTodos = withObservables(['todos'], ({todos}) => ({
  todos: todos.observe(),
}))

export const EnhancedTodos = enhanceTodos(TodosComponent)
