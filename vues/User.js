import React from "react";
//
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//
const Stack = createStackNavigator();
//
import Chat from "./Chat";
import Liste from "./Liste";
//
export default function User({ userConnecte }) {
  //
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Liste"
          component={Liste}
          initialParams={{ itemId: userConnecte }}
        />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
