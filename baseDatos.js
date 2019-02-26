import Firebase from 'firebase';
 let config = {
   apiKey: "AIzaSyA8j-XahvMzvl0Bl_LjWFSzPF6khLjYBd0",
   authDomain: "tiendavirtual-9c488.firebaseapp.com",
   databaseURL: "https://tiendavirtual-9c488.firebaseio.com",
   projectId: "tiendavirtual-9c488",
   storageBucket: "tiendavirtual-9c488.appspot.com",
   messagingSenderId: "80929640204"
  };
let app = Firebase.initializeApp(config);
export const db = app.database();
