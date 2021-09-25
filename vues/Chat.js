import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
//
import SimpleDateTime from "react-simple-timestamp-to-date";
//
import firebase from "firebase";
//
export default function Chat({ route }) {
  //
  const transmiter = route.params.emitter;
  const recepter = route.params.receiver;
  const pseudoRecepter = route.params.pseudoReceiver;
  //
  const [message, setMessage] = useState("");
  const [messageListe, setMessageListe] = useState([]);
  //
  const db = firebase.firestore();
  // Pour déclencher la récupération des messages DE FACON ASYNCHRONE
  // quand la liste des messages est modifiée par l'ajout d'un message:
  useEffect(() => {
    getMessageListe();
  }, []);
  // Méthode pour récupérer tous les messages envoyés
  // dans l'ordre chronologique de création:
  const getMessageListe = () => {
    db.collection("message")
      .orderBy("date")
      .get()
      .then((querySnapshot) => {
        const messageTab = Array();
        querySnapshot.forEach((doc) => {
          if (doc.data().message != "") {
            messageTab.push(doc.data());
          }
        });
        setMessageListe(messageTab);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  // Variable qui va être utilisée pour rafraichir la page à
  // chaque fois qu'on ajoute un message:
  const messageRef = useRef();
  // Méthode pour l'ajout des messages par l'utilisateur connecté
  // dans la base de données:
  const handleSubmit = () => {
    if (message != "") {
      db.collection("message")
        .doc()
        .set({
          emmeteur: transmiter,
          recepteur: recepter,
          message: message,
          date: new Date(),
        })
        .then(() => {
          console.log("Document successfully written!");
          getMessageListe();
          // Pour rafraichir la page à chaque nouveau message:
          messageRef.current.setNativeProps({ text: "" });
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    }
  };
  // On va afficher les messages envoyés par l'utilisateur connecté
  // ainsi que ceux envoyés par l'interlocuteur choisi par l'utilisateur.
  // Le pseudo et la date de création apparaissent dans l'entête du message:
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {messageListe.map((message) => {
          {
            if (
              message.emmeteur == transmiter &&
              message.recepteur == recepter
            ) {
              return (
                <View style={styles.left}>
                  <Text style={styles.textLeft}>
                    moi , le: &nbsp;                    
                    <SimpleDateTime
                      dateSeparator="/"
                      timeSeparator="-"
                      format="DMY"
                    >
                      {message.date.seconds}
                    </SimpleDateTime>
                  </Text>
                  <Text>{message.message}</Text>
                  <Text style={styles.message}></Text>
                </View>
              );
            } else if (
              message.emmeteur == recepter &&
              message.recepteur == transmiter
            ) {
              return (
                <View style={styles.right}>
                  <Text style={styles.textRight}>
                    {"de: " + pseudoRecepter + " , le: "}
                    <SimpleDateTime
                      dateSeparator="/"
                      timeSeparator="-"
                      format="DMY"
                    >
                      {message.date.seconds}
                    </SimpleDateTime>
                  </Text>
                  <Text style={styles.message}>{message.message}</Text>
                </View>
              );
            } else {
              return <Text></Text>;
            }
          }
        })}
      </View>
      <View style={styles.bottom}>
        <TextInput
          style={styles.input}
          placeholder="votre message"
          ref={messageRef}
          onChangeText={(e) => setMessage(e)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "lightgrey",
  },
  left: {
    height: 30,
    width: "70%",
    backgroundColor: "lightgreen",
    marginLeft: "5%",
    justifyContent: "center",
    marginTop: 15,
    borderRightWidth: 3,
    borderRightColor: "green",
  },
  right: {
    height: 30,
    marginLeft: "25%",
    width: "70%",
    backgroundColor: "lightblue",
    justifyContent: "center",
    marginTop: 15,
    borderLeftWidth: 3,
    borderLeftColor: "blue",
  },
  top: {
    flex: 20,
    width: "100%",
  },
  bottom: {
    flex: 5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    width: "100%",
    backgroundColor: "white",
    paddingLeft: 10,
  },
  button: {
    height: 30,
    width: "30%",
    backgroundColor: "orange",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  textLeft: {
    fontSize: 10,
    alignItems: "left",
  },
  textRight: {
    fontSize: 10,
    alignItems: "right",
  },
  message: {
    justifyContent: "center",
    alignItems: "center",
  },
});
