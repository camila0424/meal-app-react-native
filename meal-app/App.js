import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { Main } from "./components/Main";
import { MealDetail } from "./components/MealDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: "#F0BF7C" },
            headerStyle: { backgroundColor: "#F0BF7C" },
            headerTintColor: "brown",
            headerTitleStyle: { fontWeight: "bold" },
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 20, // ✅ Tamaño del título aumentado
            },
          }}
        >
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ title: "Recipes" }}
          />
          <Stack.Screen
            name="MealDetail"
            component={MealDetail}
            options={{
              title: "Preparation",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
