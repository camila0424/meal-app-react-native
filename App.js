import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Platform } from "react-native";

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
              height: Platform.OS === "web" ? 140 : 100,
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerShadowVisible: false,
            headerTitleAlign: "center",
            headerTintColor: "brown",
          }}
        >
          <Stack.Screen
            name="Main"
            component={Main}
            options={{
              headerTitle: () => (
                <Image
                  source={require("./assets/logo.png")}
                  style={{
                    width: Platform.OS === "web" ? 120 : 80, // Logo más grande
                    height: Platform.OS === "web" ? 120 : 80,
                    borderRadius: Platform.OS === "web" ? 60 : 40,
                    marginTop: Platform.OS === "web" ? 10 : -5, // Menos margen negativo
                  }}
                  resizeMode="cover"
                />
              ),
              headerTitleContainerStyle: {
                paddingBottom: Platform.OS === "web" ? 15 : 8,
              },
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
