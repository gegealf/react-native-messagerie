# react-native-messagerie
simple application de messagerie

# Prérequis:
  . Node.js installé ( pour vérifier: $ node --version ) :
  
          v14.17.4
  
  . un IDE
  
  . un compte firebase
  
  . Android Studio (=> AVD Manager) pour émuler un device Android
 
# Installation initiale:
  . pour pouvoir utiliser les outils du framework expo :

        $ npm install --global expo-cli
  
  . création du projet :

        $ expo init messagerie
  
  . si vous préfére yarn:
    
        $ npm i -- global yarn
    
  . les composants nécessaires:
  
        $ npm i @react-navigation/native

        $ expo i react-native-screens react-native-safe-area-context

        $ npm i @react-navigation/material-top-tabs react-native-tab-view

        $ expo i react-native-pager-view

        $ npm i @react-navigation/stack
        
        $ npm i react-simple-timestamp-to-date
        
  . pour pouvoir utiliser firebase comme backend et base de données ( à ce jour la version 9 n'est pas compatible avec react native ):
  
        $ npm i firebase@8.10.0
            
# Configuration de firebase:
  . créer un nouveau projet (de même nom)
  
  . de type web => base de données en mode test 
  
  . activer l'authentification => dans 'sign-in method' activer email

# Pour tester:
  . dans un terminal ( si possible pas celui de l'IDE: l'invite de commandes par exemple ) :
        
        $ expo start

  . une page s'ouvre dans le navigateur: http://localhost:19002/ puis cliquer sur 'Run on Android device/emulator' ou 'Run in web browser' 

# Pour héberger le projet sur github:
  . 1-créer un dépôt vide github "react-native-messagerie" avec vscode (le plus simple) ou Git Bash.
  
  . 2-pousser le code du projet sur le dépôt :
  
        $ git push
        
  . 3-pour retravailler le code, cloner le projet en local :
  
        $ git clone git@github.com:gegealf/react-native-messagerie.git
        
        $ git branch nouvelle-branche
        
        $ git checkout nouvelle-branche
        
# Pour utiliser l'application après l'avoir clonée:
        $ npm install
        
        $ expo start

# Technologies associées:
  . javascript + jsx 
  
  . node.js + react native + expo
  
  . firebase

# Liens utiles:
  . utilisation du component navigation de react native: https://reactnative.dev/docs/navigation#react-navigation
  
  . utilisation de TouchableOpacity de expo: https://docs.expo.dev/tutorial/button/

  . ma base de données: https://console.firebase.google.com/project/messagerie-fe70a/firestore/data/~2Fmessage~2F0vpxiwJdqSYHqzQorv6s
  
  . pour ajouter des utilisateurs autorisés dans firebase: https://firebase.google.com/docs/auth/web/start?authuser=0#web-version-8
  
  . pour ajouter des données: https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=0#web-version-8
  
  . pour récupérer des données: https://firebase.google.com/docs/firestore/query-data/queries?authuser=0#web-version-8

# Remerciements: 
 . à Abraham NGOM, David Jegat, Malik HARRIZ et Mohamed ??? 


