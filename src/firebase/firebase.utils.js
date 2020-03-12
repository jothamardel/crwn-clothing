import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



const config = {
    apiKey: "AIzaSyD8EMhbzRO58Qk4-PJ-_dxMdbhVSNoJ_JY",
    authDomain: "crwn-db-5c87d.firebaseapp.com",
    databaseURL: "https://crwn-db-5c87d.firebaseio.com",
    projectId: "crwn-db-5c87d",
    storageBucket: "crwn-db-5c87d.appspot.com",
    messagingSenderId: "404607101558",
    appId: "1:404607101558:web:58e530a4c7a717a0fb8d57",
    measurementId: "G-MQJLRTYYM3"
  };


  export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if(!userAuth) return;
    const userRef = firestore.doc(`user/${userAuth.uid}`);
    const snapShot = await userRef.get() 

    if (!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName, 
          email, 
          createdAt, 
          ...additionalData
        })
      }
      catch (error){
        console.log('Error creating user!', error.message);
      }
    }
    return userRef;
  }

  firebase.initializeApp(config);


  export const auth = firebase.auth();
  export const firestore = firebase.firestore(); 


  const provider = new firebase.auth.GoogleAuthProvider();

  provider.setCustomParameters({ prompt: 'select_account' })

  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase;