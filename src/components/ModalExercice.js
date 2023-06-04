import React, { useState } from 'react'
import { Modal, TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// MODEL  
import { MODEL_COLORS } from '../models/modelColors'

const ModalExercice = ({ modalVisible, setModalVisible, _handleAddExercise }) => {
    const [inputValue, setInputValue] = useState()
 
    const _handleClick = () => {
        if (inputValue && inputValue.trim() !== '') {
            _handleAddExercise(inputValue)
            setInputValue()
            setModalVisible(false)
        } else {
            alert('Veuillez entrer une valeur valide')
        }
    }

    const _handleCancel = () => {
        setModalVisible(false)
        setInputValue()
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        > 
            <View style={styles.container}> 
                <View style={styles.viewBody}>
                    <View style={styles.contentView}>
                        <Text style={styles.textInput}>Ajouter un exercice</Text>
                        <TextInput 
                            value={inputValue} 
                            onChangeText={setInputValue} 
                            style={styles.input} 
                            placeholder='Entrer une routine'
                        />
                    </View>

                    <View style={styles.viewButton}>
                        <TouchableOpacity style={styles.buttonAdd} onPress={_handleClick}>
                            <Text style={styles.textButton}>Ajouter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonCancel} onPress={_handleCancel}>
                            <Text style={styles.textButton}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ModalExercice

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    viewBody: {
        backgroundColor: 'white', 
        padding: 20, 
        borderRadius: 10,
        width: '80%', // pour 80% de la largeur de l'écran
    },
    contentView: {
        flexGrow: 1,
        alignItems: 'center', // pour centrer le contenu horizontalement
        justifyContent: 'center' // pour centrer le contenu verticalement
    },
    viewButton: {
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom: 10,
        marginTop:20
    },
    buttonAdd: {
        backgroundColor:MODEL_COLORS.main, // votre couleur ici
        padding: 10,
        borderRadius: 5,
        marginTop:20
    },
    buttonCancel: {
        backgroundColor:MODEL_COLORS.orange, // votre couleur ici
        padding: 10,
        borderRadius: 5,
        marginTop:20
    },
    textButton: {
        fontSize:18,
        color:"white"
    },
    input: {
        borderWidth:1,
        borderColor:"#A9A9A9",
        width:220,
        paddingLeft:10,
        marginTop:20
    },
    textInput: {
        marginTop:20,
        // color:"#808080",
        fontSize:20
    }
})