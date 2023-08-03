import React, { useState, useEffect, useContext } from 'react'
// REACT NATIVE 
import { View, Text, StyleSheet, TouchableOpacity, Keyboard, Alert } from 'react-native'
// COMPONENTS
import SignInComponents from '../components/SignInComponents'
import SignUpComponent from '../components/SignUpComponent'
// HOOKS FORM
import useForm from '../hooks/useForm'
// MODEL 
import { MODEL_COLORS } from '../models/modelColors'
// APP CONTEXT 
import AuthContext from '../components/AuthContext'
import AuthUserComponent from '../components/AuthUserComponent'
import useMongoAuth from '../mongodb/useMongoAuth'
import AsyncStorage from '@react-native-async-storage/async-storage'


const INITIAL_STATE = {
    email:'',
    password:'',
    fname:'',
    lname:'',
}

const AuthScreen = ({ navigation }) => {
    const { isUserLoggedIn, setUserLoggedIn } = useContext(AuthContext)
    const [isSignIn, setIsSignIn] = useState(true)
    const { _handleChange, values, _refresh } = useForm(INITIAL_STATE)
    const { _signIn, _signUp, _signOut } = useMongoAuth(setUserLoggedIn, isUserLoggedIn)
    const [lname, setLname] = useState()
    const [fname, setFname] = useState()
    const [email, setEmail] = useState()

    useEffect(() => {
        _getUserData()
    },[isUserLoggedIn])

    const _getUserData = async () => {
        const ln = await AsyncStorage.getItem('@lname')
        const fn = await AsyncStorage.getItem('@fname')
        const email = await AsyncStorage.getItem('@email')
        setFname(fn)
        setLname(ln)
        setEmail(email)
    }

    const _handleSignUp = () => {
        _signUp(values.fname, values.lname, values.email, values.password)
        Keyboard.dismiss()
        _refresh()
    }

    const _handleSignIn = () => {
        console.log("authScreen _handleSignIn", values.email, values.password)
        _signIn(values.email, values.password)
        Keyboard.dismiss()
        _refresh()
    } 

    const _logOut = () => {
        _signOut()
    }

    const _resetPassword = () => {
        Alert.alert(
            "Iron App Version démo",
            "Le mot de passe oublié n'est pas valide",
            [
                { text: "OK", onPress: () => console.log("OK Pressé") }
            ]
         )
        console.log('mot de passe oublié')
    }
      
    return (
        <View style={styles.container}>

            {isUserLoggedIn ? 
                <AuthUserComponent 
                    onPress={_logOut}
                    fname={fname}
                    lname={lname}
                    email={email}
                />
                
            :
                <>
                    {isSignIn ? 
                        <SignInComponents 
                            onPress={_handleSignIn} 
                            values={values}
                            _handleChange={_handleChange}
                            _resetPassword={_resetPassword}
                        />
                    : 
                        <SignUpComponent 
                            onPress={_handleSignUp} 
                            values={values}
                            _handleChange={_handleChange}
                        />
                    }
                        <TouchableOpacity onPress={() => setIsSignIn(!isSignIn)}>
                            <Text style={styles.textColorGreen}>{isSignIn ? "CRÉER UN COMPTE" : "SE CONNECTER"}</Text>
                        </TouchableOpacity>
                </>


            
            }

        </View>
    )
}

export default AuthScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:"#8fcbbc"
    },
    viewButton: {
        marginTop:20
    },
    button: {
        backgroundColor:MODEL_COLORS.main, // votre couleur ici
        padding: 10,
        borderRadius: 5,
        marginTop:20
    },
    buttonText: {
        color: '#fff', // couleur du texte ici
        textAlign: 'center',
        fontSize: 16,
    },
    textColorGreen: {
        color:MODEL_COLORS.main,
        fontWeight:'bold',
        marginTop:20,
        fontSize:16
    }
})

