import React from "react";
import {useDatabase} from "@nozbe/watermelondb/hooks";
import {Button, View} from "react-native";
import Todo from "@/core/data/datasource/local/entity/todo";
import {locking} from "@/components/page/todo/catalogue/demo-components/demo-db-locking";

export const TodoDemoRemoveRandomTodo = React.memo(() => {
  const database = useDatabase();
  const removeTodo = async (permanently: boolean) => {
    await locking.acquire();
    try {
      const collection = database.get<Todo>("todos");
      const todoIds = await collection.query().fetchIds();
      if (todoIds.length <= 0) {
        return;
      }
      const todoId = todoIds[Math.floor(Math.random() * todoIds.length)];
      const todo = await collection.find(todoId);
      await database.write(async () => {
        if (permanently) {
          await todo.destroyPermanently();
        } else {
          await todo.markAsDeleted();
        }
      })
    } catch (e) {
      console.error(e)
    } finally {
      locking.release();
    }
  }

  return (
    <View style={{display: 'flex', flexDirection: "row"}}>
      <View style={{flexGrow: 1, padding: 8}}>
        <Button
          title="Soft Delete"
          onPress={() => removeTodo(false)}
        />
      </View>
      <View style={{flexGrow: 1, padding: 8}}>
        <Button
          title="Hard Delete"
          onPress={() => removeTodo(true)}
        />
      </View>
    </View>
  )
})
