"use client";

import React from "react";
import { auth, provider, firestore, storage } from "../firebase/firebaseClient";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";

export default function Login() {
  const saveFirebaseUser = async (data) => {
    try {
      const docRef = doc(collection(firestore, "users"));
      await setDoc(docRef, data);
      console.log("Data saved successfully.");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  async function signInWithGithub() {
    const { user } = await signInWithPopup(auth, provider);
    const data = {
      email: user.email,
      photoUrl: user.photoURL,
      displayName: user.displayName,
    };
    console.log(user);

    saveFirebaseUser(data);
    // firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(userCredentials.user.uid)
    //   .set({
    //     uid: userCredentials.user.uid,
    //     email: userCredentials.user.email,
    //     name: userCredentials.user.displayName || null,
    //     provider: userCredentials.user.providerData[0].providerId || null,
    //     photoUrl: userCredentials.user.photoURL || null,
    //     // Add additional fields as needed
    //   })
    //   .catch((error) => {
    //     console.error("Error storing user data:", error);
    //   });
  }

  return (
    <div>
      <button onClick={signInWithGithub}>Sign in with GitHub</button>
    </div>
  );
}
