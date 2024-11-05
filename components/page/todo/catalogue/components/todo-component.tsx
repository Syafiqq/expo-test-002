import TodoEntity from "@/core/domain/entity/todo-entity";
import {Text} from "react-native";
import {withObservables} from "@nozbe/watermelondb/react";

export function TodoComponent({todo}: { todo: TodoEntity }) {
  return (
    <Text numberOfLines={1}>{todo.title}</Text>
  )
}

const enhanceTodo = withObservables(['todo'], ({todo}) => ({
  todo: todo.observe(),
}))
export const EnhancedTodo = enhanceTodo(TodoComponent)
