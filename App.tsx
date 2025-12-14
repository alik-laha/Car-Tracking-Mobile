import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth } from "./src/context/authContext";
import { initDB } from "./src/db/init";
import LoginScreen from "./screens/LoginScreen";
import BottomTabs from "./navigation/ButtomTabs";

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { loggedIn } = useAuth();

  useEffect(() => {
    initDB();
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {loggedIn ? (
        <Stack.Screen name="Main" component={BottomTabs} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
