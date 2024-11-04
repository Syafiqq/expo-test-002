/* eslint-disable react/no-unstable-nested-components */
import {Tabs} from 'expo-router';
import React from 'react';


export default function Main() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menu 1',
        }}
      />
      <Tabs.Screen
        name="menu-1"
        options={{
          title: 'Menu 2',
        }}
      />
      <Tabs.Screen
        name="menu-2"
        options={{
          title: 'Menu 3',
        }}
      />
      <Tabs.Screen
        name="menu-3"
        options={{
          title: 'Menu 4',
        }}
      />
      <Tabs.Screen
        name="menu-4"
        options={{
          title: 'Menu 5',
        }}
      />
    </Tabs>
  );
}
