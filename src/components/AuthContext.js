import React, { createContext, useState, useEffect } from 'react'
// STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

// CONTEXT 
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    // CONST 
    const [isUserLoggedIn, setUserLoggedIn] = useState(false)
  
    // GET TOKEN STORAGE + LOG IN / LOG OUT
    useEffect(() => {
        const checkIfLoggedIn = async () => {
            const token = await AsyncStorage.getItem('@token')
            if (token !== null) {
                setUserLoggedIn(true)
            }
        }
        console.log('auth_context useefect ', isUserLoggedIn)
        checkIfLoggedIn()
    }, [])
  
    // RETURN IS USER LOGGGED INSIDE APP WITH CONTEXT PROVIDER 
    return (
        <AuthContext.Provider value={{ isUserLoggedIn, setUserLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
