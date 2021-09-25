import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
//
import firebase from "firebase";
//
export default function Register() {
  const [pseudo, setPseudo] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Variables utilisées pour vider les champs du formulaire:
  const pseudoRef = useRef();
  const nameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  //
  const handleSubmit = () => {
    // Pour créer un nouveau utilisateur sur firebase:
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Pour ajouter un utilisateur si authentification réussie:
        const db = firebase.firestore();
        db.collection("user")
          .doc(email)
          .set({
            pseudo: pseudo,
            name: name,
            phone: phone,
            email: email,
          })
          .then(() => {
            console.log("Document successfully written!");
            // Appel à la fonction qui vide le formulaire:
            resetForm();
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // Méthode pour effacer ce qui à été écrit dans le formulaire:
  const resetForm = () => {
    pseudoRef.current.setNativeProps({ text: "" });
    nameRef.current.setNativeProps({ text: "" });
    phoneRef.current.setNativeProps({ text: "" });
    emailRef.current.setNativeProps({ text: "" });
    passwordRef.current.setNativeProps({ text: "" });
  };
  //
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Pseudo"
        onChangeText={(e) => setPseudo(e)}
        ref={pseudoRef}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(e) => setName(e)}
        ref={nameRef}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        onChangeText={(e) => setPhone(e)}
        ref={phoneRef}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(e) => setEmail(e)}
        ref={emailRef}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry="true"
        onChangeText={(e) => setPassword(e)}
        ref={passwordRef}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text>Register</Text>
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
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    height: 50,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "orange",
  },
});
