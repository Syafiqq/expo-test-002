import * as FileSystem from 'expo-file-system';
import {SplashScreen, Stack} from "expo-router";
import {DatabaseProvider} from "@nozbe/watermelondb/DatabaseProvider";
import database from "@/core/data/datasource/local/impl/watermelon";
import React, {useCallback, useEffect} from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  console.log(FileSystem.documentDirectory);
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="index"
                      options={{headerShown: false}}
        />
      </Stack>
    </Providers>
  );
}

function Providers({children}: { children: React.ReactNode }) {
  return (
    <DatabaseProvider database={database}>
      <OneTimeSetup>
        {children}
      </OneTimeSetup>
    </DatabaseProvider>
  )
}

function OneTimeSetup({children}: { children: React.ReactNode }) {
  const longRunningOperation = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  const executor = useCallback(async () => {
    await longRunningOperation();
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    executor().then().catch();
  }, [executor]);

  return children;
}
