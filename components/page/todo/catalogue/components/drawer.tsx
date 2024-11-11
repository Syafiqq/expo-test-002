import React, {useState} from "react";
import {PanGestureHandlerEventPayload, PanGestureHandlerProps, State} from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import {Dimensions, ScrollView, StyleSheet, View} from "react-native";
import {
  GestureEvent,
  HandlerStateChangeEvent
} from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon";
import {
  DefaultSyncStatus,
  SyncPullCreate1Item,
  SyncPullCreateAndDelete,
  SyncPullCreateAndUpdate,
  SyncPullDelete1Item,
  SyncPullDuplicatedCreate,
  SyncPullError,
  SyncPullMalformedCreate,
  SyncPullNotExistDelete,
  SyncPullNotExistUpdate,
  SyncPullUpdate1Item,
  SyncPushError,
  UnSyncText
} from "@/components/page/todo/catalogue/components/drawer-items";
import Divider from "@/ui/divider";

const {width} = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.75;

export type DrawerForwardRef = {
  toggleDrawer: () => void;
}
const Drawer = React.forwardRef<DrawerForwardRef, PanGestureHandlerProps>((props, ref) => {
  const translateX = useSharedValue(-DRAWER_WIDTH);
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    if (isOpen) {
      translateX.value = withSpring(-DRAWER_WIDTH);
    } else {
      translateX.value = withSpring(0);
    }
    setIsOpen(!isOpen);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const onGestureEvent = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    if (event.nativeEvent.translationX > 0) {
      translateX.value = event.nativeEvent.translationX - DRAWER_WIDTH;
    }
  }

  const onHandlerStateChange = (event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
    if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.translationX > DRAWER_WIDTH / 2) {
        translateX.value = withSpring(0);
        setIsOpen(true);
      } else {
        translateX.value = withSpring(-DRAWER_WIDTH);
        setIsOpen(false);
      }
    }
  }

  React.useImperativeHandle(ref, () => ({
    toggleDrawer,
  }));

  return <Animated.View style={[styles.drawer, animatedStyle]}>
    <ScrollView>
      <View>
        <UnSyncText/>
        <Divider/>
        <DefaultSyncStatus/>
        <Divider/>
        <SyncPullCreate1Item/>
        <Divider/>
        <SyncPullUpdate1Item/>
        <Divider/>
        <SyncPullDelete1Item/>
        <Divider/>
        <SyncPullCreateAndUpdate/>
        <Divider/>
        <SyncPullCreateAndDelete/>
        <Divider/>
        <SyncPullMalformedCreate/>
        <Divider/>
        <SyncPullDuplicatedCreate/>
        <Divider/>
        <SyncPullNotExistUpdate/>
        <Divider/>
        <SyncPullNotExistDelete/>
        <Divider/>
        <SyncPullError/>
        <Divider/>
        <SyncPushError/>
      </View>
    </ScrollView>
  </Animated.View>
})

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 20,
  },
  drawerText: {
    fontSize: 18,
  },
});

export default Drawer;
