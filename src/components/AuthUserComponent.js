import React from 'react'
// REACT NATIVE  
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// MODELS 
import { MODEL_COLORS } from '../models/modelColors'

const AuthUserComponent = ({ onPress, fname, lname, email }) => {

    return (
        <View style={styles.container}>

            {/* TITLE FIRST NAME - LAST NAME */}
            <Text style={styles.title}>{fname} {lname}</Text>

            {/* TEXT EMAIL */}
            <Text style={styles.emailText}>{email}</Text>

            {/* BUTTON LOG OUT */}
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>SE DÉCONNECTER</Text>
            </TouchableOpacity>

        </View>
    )
}

export default AuthUserComponent

// STYLES DESIGN 
const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        paddingHorizontal:30,
        paddingVertical:20,
        borderRadius:20
    },
    title:{
        fontSize:20
        ,
        fontWeight:'bold',
        alignSelf:'center',
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
    emailText: {
        fontSize:16,
        marginTop:20
    }
})