import React from "react";
import {useDatabase} from "@nozbe/watermelondb/hooks";
import {Button} from "react-native";
import Todo from "@/core/data/datasource/local/entity/todo";
import {locking} from "@/components/page/todo/catalogue/demo-components/demo-db-locking";

export const TodoDemoAddRandomTodo = React.memo(() => {
  const database = useDatabase();
  const addTodo = async () => {
    await locking.acquire();
    try {
      const collection = database.get<Todo>("todos");
      await database.write(async () => {
        await collection.create((record) => {
          let now = new Date();
          record.title = `${new Date().getTime()} - Title`;
          record.description = `${new Date().getTime()} - Description`;
          record.completed = false;
          record.createdAt = now;
          record.updatedAt = now;
          record.dueDate = now;
          record.priority = "low";
        });
      })
    } catch (e) {
      console.error(e)
    } finally {
      locking.release();
    }
  }

  return (
    <Button
      title="Add Todo"
      onPress={() => addTodo()}
    />
  )
})
