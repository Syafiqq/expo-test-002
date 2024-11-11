import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Drawer, {DrawerForwardRef} from "@/components/page/todo/catalogue/components/drawer";
import {Stack} from "expo-router";
import {Button, View} from "react-native";
import {TodoCataloguePageReactive} from "@/components/page/todo/catalogue/todo-catalogue-page-reactive";

export default function Menu1() {
  const drawerRef = React.useRef<DrawerForwardRef>(null);

  return (
    <GestureHandlerRootView style={{display: 'flex', flexGrow: 1}}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <View style={{padding: 8}}>
              <Button title="Toggle Drawer"
                      onPress={() => drawerRef.current?.toggleDrawer()}/>
            </View>
          )
        }}
      />
      <TodoCataloguePageReactive/>
      <Drawer ref={drawerRef}/>
    </GestureHandlerRootView>
  );
}
