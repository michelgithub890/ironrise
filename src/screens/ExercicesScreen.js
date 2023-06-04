import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native'
import { MODEL_COLORS } from "../models/modelColors"
import ExerciceComponent from '../components/ExerciceComponent'
import RoutineComponent from '../components/RoutineComponent'
import { useIsFocused } from '@react-navigation/native'
import useExercises from '../hooks/useExercises'
import useRoutines from '../hooks/useRoutines'

const windowWidth = Dimensions.get('window').width

const ExercicesScreen = ({ navigation }) => {
    const [update, setUpdate] = useState(0)
    const [switchButton, setSwitchButton] = useState(true) 
    const { _addExercise, _getExercises, exercises } = useExercises()
    const { _addRoutine, _getRoutines, routines, _deleteRoutine, _updateRoutine } = useRoutines()
    const [count, setCount] = useState(0)
    const isFocused = useIsFocused()

    useEffect(() => {
        _getExercises() 
        _getRoutines()
    },[count])

    useEffect(() => {
        _getExercises() 
        _getRoutines()
    },[isFocused])

    const _handleSwitchButton = () => {
        setSwitchButton(!switchButton)
    }

    const _handleAddExercise = (title) => {
        _addExercise(title)
        setCount(count+1)
    }

    const _handleAddItemRoutine = (name,exercisesList) => {
        _addRoutine(name,exercisesList)
        setCount(count+1)
    } 

    const _handleDelete = (idRoutine) => {
        Alert.alert(
            // Titre
            "Confirmation",
            // Message
            "Êtes-vous sûr de vouloir supprimer cet exercice?",
            // Tableau de boutons
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                { 
                    text: "OK", 
                    onPress: async () => {
                        console.log('page exo screen _handleDelete ', idRoutine)
                        await _deleteRoutine(idRoutine).then(() => {
                            // Mettez à jour l'état pour déclencher la mise à jour
                            setUpdate(prev => prev + 1)
                        }).catch((error) => {
                            // Gestion d'erreur 
                            console.error('Failed to delete routine:', error)
                        })
                        // navigation.goBack()
                    }
                }
            ],
            // Options
            { cancelable: false }
        )
    }
    
    const _handleNavigate = (idExo) => {
        navigation.navigate('ExercicesStack', { screen:'Exo', params: { idExo:idExo, exercises:exercises }})
    }

    const _handleNavRoutine = (idRoutine) => {
        navigation.navigate('ExercicesStack', { screen:'Routine', params: { idRoutine:idRoutine, routines:routines }})
    }

    const _handleUpdateRoutine = (id, name, exercisesList) => {
        _updateRoutine(id,name,exercisesList)
    }

    const renderExercises = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => _handleNavigate(item._id)}>
            <Text>{item.title}</Text>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>

            {/* DOUBLE BUTTON */}
            <View style={styles.viewTitle}>
                <TouchableOpacity 
                    onPress={_handleSwitchButton}
                    style={[styles.routineContainer, { backgroundColor: switchButton ? MODEL_COLORS.orange : MODEL_COLORS.main }]} 
                >
                    <Text style={styles.txtRoutine}>Routine</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    style={[styles.exerciceContainer, { backgroundColor: switchButton ? MODEL_COLORS.main : MODEL_COLORS.orange }]} 
                    onPress={_handleSwitchButton}
                >
                    <Text style={styles.txtExercice}>Exercices</Text>
                </TouchableOpacity>
            </View>

            {switchButton ? 
                <View style={styles.viewCard}>
                    <RoutineComponent 
                        _handleAddItemRoutine={_handleAddItemRoutine} 
                        _handleUpdateRoutine={_handleUpdateRoutine}
                        routines={routines}
                        _handleNavigate={_handleNavRoutine}
                        exercises={exercises}
                        _handleDelete={_handleDelete}
                    />
                </View>
            : 
                <View style={styles.viewCard}>
                    <ExerciceComponent 
                        exercises={exercises} 
                        renderExercises={renderExercises} 
                        _handleAddExercise={_handleAddExercise}
                        _handleNavigate={_handleNavigate} 
                    />
                </View>
            }

        </View>
    )
}

export default ExercicesScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:"#8fcbbc"
    },
    viewTitle: {
        flexDirection:'row',
        width:windowWidth * .8,
        borderRadius:20,
        marginTop: 40,
        marginBottom: 20,
    },
    routineContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        height:50
    },
    exerciceContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        height:50
    },
    txtRoutine: {
        fontWeight: 'bold',
        color: 'white',
        fontSize:20
    },
    txtExercice: {
        fontWeight: 'bold',
        color: 'white',
        fontSize:20
    },
    viewCard: {
        marginTop:20
    },
    item: {
        backgroundColor:'white',
        borderRadius:5,
        marginTop:10,
        padding:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
    },
})


