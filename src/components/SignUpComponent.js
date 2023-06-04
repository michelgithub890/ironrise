import React from 'react'
// REACT NATIVE  
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
// MODEL  
import { MODEL_COLORS } from '../models/modelColors'

const SignUpComponent = ({ values, _handleChange, onPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Créer un compte</Text>
            <Text style={styles.text}>Prénom</Text>
            <TextInput 
                style={styles.input} 
                placeholder='Entrer prénom'
                onChangeText={(text) => _handleChange("fname", text)}
                value={values.fname}
            />
            <Text style={styles.text}>Nom</Text>
            <TextInput 
                style={styles.input} 
                placeholder='Enter nom'
                onChangeText={(text) => _handleChange("lname", text)}
                value={values.lname}
            />
            <Text style={styles.text}>Email</Text>
            <TextInput 
                style={styles.input}  
                placeholder='Entrer email'
                onChangeText={(text) => _handleChange("email", text)}
                value={values.email}
            />
            <Text style={styles.text}>Mot de passe</Text>
            <TextInput 
                style={styles.input} 
                placeholder='Enter mot de passe'
                onChangeText={(text) => _handleChange("password", text)}
                value={values.password}
            />
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>CRÉER UN COMPTE</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignUpComponent

const styles = StyleSheet.create({
    container: {
        backgroundColor:"white",
        paddingHorizontal:30,
        paddingVertical:20,
        borderRadius:20
    },
    title:{
        fontSize:27
        ,
        fontWeight:'bold',
        alignSelf:'center',
    },
    input:{
        borderWidth:1,
        borderColor:"#A9A9A9",
        width:220,
        paddingLeft:10,
    },
    text:{
        marginTop:20,
        color:"#808080"
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
    textForgot: {
        marginTop:20,
        alignSelf:'flex-end',
        color:"#808080",
    },
})