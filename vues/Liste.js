import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
//
import firebase from "firebase";
//
export default function Liste({ route, navigation }) {
  const [user, setUser] = useState([]);
  const userConnecte = route.params.itemId;
  // Pour déclencher la récupération des users enregistrés DE FACON ASYNCHRONE
  // quand la liste des utilisateurs est modifiée par l'ajout d'un user:
  useEffect(() => {
    /* console.log("qui est connecté?: " + userConnecte); */
    getUserListe();
  }, []);
  // Creation de la liste des utilisateurs:
  const getUserListe = () => {
    const db = firebase.firestore();
    db.collection("user")
      .get()
      .then((querySnapshot) => {
        const usertab = Array();
        querySnapshot.forEach((doc) => {
          // Création d'un objet pour récupere l'id des utilisateurs:
          const users = {
            id: doc.id,
            data: doc.data(),
          };
          // Pour ajouter cet objet dans le tableau:
          usertab.push(users);
        });
        // Pour filtrer la listes des utilisateurs
        // en enlevant l'utilisateur connecté:
        const newUserTab = usertab.filter((item) => userConnecte != item.id);
        //
        setUser(newUserTab);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  //
  return (
    <View style={styles.container}>
      <Text>utilisateurs connectés:</Text>
      {user.map((item) => (
        <TouchableOpacity
          style={styles.user}
          key={user.pseudo}
          onPress={() =>
            navigation.navigate("Chat", {
              emitter: userConnecte,
              receiver: item.id,
              pseudoReceiver: item.data.pseudo,
            })
          }
        >
          <Text style={styles.text}>{item.data.name}</Text>
        </TouchableOpacity>
      ))}
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
  user: {
    height: 50,
    width: "85%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    backgroundColor: "grey",
  },
  text: {
    fontSize: 25,
  },
});
