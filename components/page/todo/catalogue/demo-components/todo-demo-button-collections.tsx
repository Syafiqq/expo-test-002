import {Button, View} from "react-native"
import {TodoDemoAddRandomTodo} from "@/components/page/todo/catalogue/demo-components/todo-demo-add-random-todo";
import {TodoDemoRemoveRandomTodo} from "@/components/page/todo/catalogue/demo-components/todo-demo-remove-random-todo";
import React from "react";
import {TodoDemoEditRandomTodo} from "@/components/page/todo/catalogue/demo-components/todo-demo-edit-random-todo";

export const TodoDemoButtonCollections = React.memo(() => {
  return (
    <View style={{display: 'flex', flexDirection: "row"}}>
      <View style={{flexGrow: 1, padding: 8}}>
        <TodoDemoAddRandomTodo/>
      </View>
      <View style={{flexGrow: 1, padding: 8}}>
        <TodoDemoEditRandomTodo/>
      </View>
      <View style={{flexGrow: 2}}>
        <TodoDemoRemoveRandomTodo/>
      </View>
    </View>
  )
})
