import React from "react";
import {useDatabase} from "@nozbe/watermelondb/hooks";
import {Button} from "react-native";
import Todo from "@/core/data/datasource/local/entity/todo";
import {randomiseTitle} from "@/components/page/todo/catalogue/todo-helper";
import {locking} from "@/components/page/todo/catalogue/demo-components/demo-db-locking";

export const TodoDemoEditRandomTodo = React.memo(() => {
  const database = useDatabase();
  const editTodo = async () => {
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
        await todo.update((record) => {
          record.title = randomiseTitle(record.title, Date.now())
        })
      })
    } catch (e) {
      console.error(e)
    } finally {
      locking.release();
    }
  }

  return (
    <Button
      title="Edit"
      onPress={() => editTodo()}
    />
  )
})
