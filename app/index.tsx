import {Button, Text, View} from "react-native";
import {router} from "expo-router";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Button
        title="Start"
        onPress={(e) => {
          e.preventDefault()
          router.replace('../(main)')
        }}>
      </Button>
    </View>
  );
}
