import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StyleSheet, Image } from "react-native";
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
            headerStyle: {
              backgroundColor: "#F0BF7C",
              height: 100,
              elevation: 0, // Android
              shadowOpacity: 0, // iOS
              borderBottomWidth: 0, // iOS y Android
            },
            headerShadowVisible: false, // iOS y Android (desde React Navigation 6)
            headerTitleAlign: "center",
            headerTintColor: "brown",
          }}
        >
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              // Logo como título
              headerTitle: () => (
                <Image
                  source={require("./assets/logo.png")}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    marginTop: 40,
                  }}
                  resizeMode="cover"
                />
              ),
            }}
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
