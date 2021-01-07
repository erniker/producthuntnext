import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    // Initialize Firebase
    if (!app.apps.length) {
      app.initializeApp(firebaseConfig);
    }
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
  }

  // Sign up an user
  async signUp(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );

    return await newUser.user.updateProfile({ displayName: name });
  }

  // Login User
  async logIn(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  // Close Session
  async signOut() {
    await this.auth.signOut();
  }
}

const firebase = new Firebase();

export default firebase;
