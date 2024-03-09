"use client";

import React from "react";
import { auth, provider, firestore, storage } from "../firebase/firebaseClient";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import firebase from "firebase/app";

export default function Login() {
  async function signInWithGithub() {
    const userCredentials = await signInWithPopup(auth, provider);

    console.log({ ...userCredentials.user });

    firebase
      .Firestore()
      .collection("users")
      .doc(userCredentials.user.uid)
      .set({
        uid: userCredentials.user.uid,
        email: userCredentials.user.email,
        name: userCredentials.user.displayName || null,
        provider: userCredentials.user.providerData[0].providerId || null,
        photoUrl: userCredentials.user.photoURL || null,
        // Add additional fields as needed
      })
      .catch((error) => {
        console.error("Error storing user data:", error);
      });
  }

  return (
    <div>
      <button onClick={signInWithGithub}>Sign in with GitHub</button>
    </div>
  );
}
