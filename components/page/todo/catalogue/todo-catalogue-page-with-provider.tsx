import {View} from "react-native";
import {DirectEnhancedTodos} from "@/components/page/todo/catalogue/components/todo-list";
import TodoCatalogueCount from "@/components/page/todo/catalogue/components/todo-catalogue-count";
import {TodoDemoButtonCollections} from "@/components/page/todo/catalogue/demo-components/todo-demo-button-collections";

export function TodoCataloguePageWithProvider() {
  return (
    <View style={{flex: 1}}>
      <TodoCatalogueCount></TodoCatalogueCount>
      <View style={{height: 8}}></View>
      <DirectEnhancedTodos></DirectEnhancedTodos>
      <View style={{height: 8}}></View>
      <TodoDemoButtonCollections/>
    </View>
  );
}
