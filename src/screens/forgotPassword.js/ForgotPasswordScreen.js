import React from 'react'
// REACT NATIVE 
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
// REACT NATIVE PAPER 
import { TextInput } from 'react-native-paper'
// HOOK 
import useForm from '../../hooks/useForm'
// MODEL 
import { MODEL_COLORS } from '../../models/modelColors'

// VALUES 
const INITIAL_STATE = {
    password: '',
    passwordConfirm: '',
}

const ForgotPasswordScreen = ({ navigation }) => {
    // FORM 
    const { _handleChange, values, _refresh } = useForm(INITIAL_STATE) 
    // LINK HEROKU 
    let linkUrl = 'https://ironrise.herokuapp.com/'

    // HANDLE VALIDE PASSWORD
    const _handleValidePassword = () => {
        if (values.password && values.password === values.passwordConfirm) {
            // CONFIRM IS EMAIL EXIST IN DATABASE 
            console.log('forgot ', values.password)
        }

        // Envoyez une requête au serveur avec le token et le nouveau mot de passe
        fetch('https://ironrise.herokuapp.com/forgotPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token, 
                newPassword: values.password
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Redirigez l'utilisateur, affichez un message de réussite, etc.
                navigation.navigate('Home')
            } else {
                // Gérez les erreurs ici
                console.error('Error resetting password:', data.error)
            }
        })
        .catch(error => {
            console.error('There was an error resetting the password:', error)
        })
    
    _refresh()

        // navigation.navigate('')
    }

    return (
        <View>

            <Text style={styles.text}>Veuillez renseigner un nouveau mot de passe</Text>
             
            {/* PASSWORD */}
            <TextInput 
                style={styles.input} 
                placeholder='Enter mot de passe'
                onChangeText={(text) => _handleChange("password", text)}
                value={values.password}
            />

            <Text style={styles.text}>Confirmer le mot de passe</Text>

            {/* PASSWORD CONFIRM */}
            <TextInput 
                style={styles.input} 
                placeholder='Confirmer le mot de passe'
                onChangeText={(text) => _handleChange("passwordConfirm", text)}
                value={values.passwordConfirm}
            />

            {/* BUTTON VALIDE */}
            <TouchableOpacity style={styles.button} onPress={_handleValidePassword}>
                <Text style={styles.buttonText}>VALIDER</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ForgotPasswordScreen

// STYLES DESIGN 
const styles = StyleSheet.create({
    input: {
        height: 40, 
        marginTop:20, 
        marginStart:20, 
        marginEnd:20 , 
        paddingStart:10,
        backgroundColor:MODEL_COLORS.ultraLight, 
    },
    button: {
        backgroundColor:MODEL_COLORS.main, // votre couleur ici
        padding: 10,
        borderRadius: 5,
        marginTop:40,
        marginStart:20,
        marginEnd:20,
    },
    buttonText: {
        color: '#fff', // couleur du texte ici
        textAlign: 'center',
        fontSize: 16,
    },
    text: {
        marginTop:30,
        textAlign:"center",
        fontSize:18,
        marginStart:20,
        marginEnd:20,
    },
})