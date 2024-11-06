import {View} from "react-native";
import {DirectEnhancedTodos} from "@/components/page/todo/catalogue/components/todo-list";

export function TodoCataloguePageWithProvider() {
  return (
    <View style={{flex: 1}}>
      <DirectEnhancedTodos></DirectEnhancedTodos>
    </View>
  );
}
