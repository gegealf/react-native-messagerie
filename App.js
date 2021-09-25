import React, { useState } from "react";
//
import firebase from "firebase";
//
import Register from "./vues/register";
import User from "./vues/User";
import Login from "./vues/Login";
//
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
//
const Tab = createMaterialTopTabNavigator();
//
export default function App() {
  const [screen, setScreen] = useState(null);
  // Pour les tests:
  /* const [screen, setScreen] = useState("tex.avery@gmail.com"); */
  /* const [screen, setScreen] = useState("bugs.bunny@gmail.com"); */
  /* const [screen, setScreen] = useState("daffy.duck@gmail.com"); */
  // Méthode pour mettre à jour le useState screen:
  const returnLoginScreen = () => {
    return <Login updateScreen={setScreen} />;
  };
  // Si on est pas connecté accès aux pages login et création de compte:
  if (screen === null) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Login" >{returnLoginScreen}</Tab.Screen>
          <Tab.Screen name="Register" component={Register} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  } else {
    // Si on est connecté accès à la page des utilisateurs:
    return <User userConnecte={screen}/>;
  }
}
// Your web app's Firebase configuration:
const firebaseConfig = {
  apiKey: "AIzaSyA6o-bZ7YDLEmKjo1Vj68AnQemOVw8soIA",
  authDomain: "messagerie-fe70a.firebaseapp.com",
  projectId: "messagerie-fe70a",
  storageBucket: "messagerie-fe70a.appspot.com",
  messagingSenderId: "471357990083",
  appId: "1:471357990083:web:a878ae81c2249a49166e76",
};
// Initialize Firebase:
const app = firebase.initializeApp(firebaseConfig);
