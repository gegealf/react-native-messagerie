import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
//
import firebase from "firebase";
//
export default function Login({ updateScreen }) {
  //
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //
  const handleSubmit = () => {
    // Méthode pour s'authentifier sur la base de données:
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Pour changer l'affichage si authentification réussie:
        updateScreen(email);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  //
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(e) => setEmail(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry="true"
        onChangeText={(e) => setPassword(e)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.text}>CONNEXION</Text>
      </TouchableOpacity>
    </View>
  );
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 50,
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 10,
  },
  button: {
    height: 50,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "orange",
    borderRadius: 10,
  },
  text: {
    fontSize: 25,
  },
});
