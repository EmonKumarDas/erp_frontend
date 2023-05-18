import React, { createContext, useEffect, useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import app from './Firebase';


export const userContext = createContext();
const AuthProvider = ({ children }) => {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    // google sign in
    const googleSignIn = () => signInWithPopup(auth, provider);

    // logout
    const logout = () => signOut(auth);

    // getCurrent user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
        return unsubscribe;
    }, [])

    const authInfo = { googleSignIn, user, loading, logout };

    return (
        <userContext.Provider value={authInfo}>{children}</userContext.Provider>
    );
};

export default AuthProvider;