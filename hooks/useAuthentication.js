import React, { useEffect, useState } from "react";
import firebase from "../firebase";

function useAuthentication() {
  const [authenticatedUser, saveAuthenticatedUser] = useState(null);

  useEffect(() => {
    const unsucribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        saveAuthenticatedUser(user);
      } else {
        saveAuthenticatedUser(null);
      }
    });
    return () => unsuscribe();
  }, []);

  return authenticatedUser;
}

export default useAuthentication;
