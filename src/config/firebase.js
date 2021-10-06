import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyD4oiOsrzcYAPw7r5dwduyT4KpKAvvTZyo',
  authDomain: 'cool-tord.firebaseapp.com',
  databaseURL: 'https://cool-tord.firebaseio.com',
  projectId: 'cool-tord',
  storageBucket: 'cool-tord.appspot.com',
  messagingSenderId: '459688734949',
  appId: '1:459688734949:web:4630328560106c4cd7a40c',
  measurementId: 'G-RKTXMTPFJQ',
};

firebase.initializeApp(firebaseConfig);

export default firebase;

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
export const analytics = firebase.analytics();
