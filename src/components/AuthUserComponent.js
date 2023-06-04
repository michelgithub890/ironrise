import React, { useState, useEffect } from 'react'
// REACT NATIVE  
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// MODELS 
import { MODEL_COLORS } from '../models/modelColors'

const AuthUserComponent = ({ onPress, fname, lname, email }) => {

    return (
        <View style={styles.container}>

            <Text style={styles.title}>{fname} {lname}</Text>

            <Text style={styles.emailText}>{email}</Text>

            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>SE DÉCONNECTER</Text>
            </TouchableOpacity>

        </View>
    )
}

export default AuthUserComponent

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