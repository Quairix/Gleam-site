import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyATYfrY3KkP3VADsfeSqXYXZvYfP5AAUp4",
  authDomain: "gleam-1cb98.firebaseio.com",
  databaseURL: "https://gleam-1cb98.firebaseio.com/"
}

let app = firebase.initializeApp(config);

export function firebaseListener(func) {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // console.log("User log in success", user);
      func(true, user)
    } else {
      // console.log("User log in failed", user);
      func(false)
    }
  }, function(error) {
    console.log(error)
  });
}

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;
export const productsRef = app.database().ref('products');
export const transactionsRef = app.database().ref('transactions');
