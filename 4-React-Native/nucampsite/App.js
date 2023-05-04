import Main from "./screens/MainComponent";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
    // <Text>Hello World!</Text>
  );
}
