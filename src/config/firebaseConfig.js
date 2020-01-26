import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyAHUkGvN3TG5k2fr2qQdeu2F2A-icf5lFU",
  authDomain: "anmonet-a11e2.firebaseio.com",
  databaseURL: "https://anmonet-a11e2.firebaseio.com/"
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
export const feedbackRef = app.database().ref('feedback');
export const modernizationRef = app.database().ref('modernization');
export const chartRef = app.database().ref('devices/device2');
export const devicesRef = app.database().ref('devices');
export const db = firebase.database();