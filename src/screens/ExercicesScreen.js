import React, { useState, useEffect } from 'react'
// REACT NATIVE 
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native'
// MODELS 
import { MODEL_COLORS } from "../models/modelColors"
// COMPONENTS 
import ExerciceComponent from '../components/ExerciceComponent'
import RoutineComponent from '../components/RoutineComponent'
// FOCUSED
import { useIsFocused } from '@react-navigation/native'
// HOOKS
import useExercises from '../hooks/useExercises'
import useRoutines from '../hooks/useRoutines'

const windowWidth = Dimensions.get('window').width

const ExercicesScreen = ({ navigation }) => {
    // HOOK EXERCISES
    const { _addExercise, _getExercises, exercises } = useExercises()
    // HOOK ROUTINE 
    const { _addRoutine, _getRoutines, routines, _deleteRoutine, _updateRoutine } = useRoutines()
    const [count, setCount] = useState(0)
    // FOCUSED 
    const isFocused = useIsFocused()
    // CONST 
    const [update, setUpdate] = useState(0)
    const [switchButton, setSwitchButton] = useState(true) 

    // GET EXERCISES AND ROUTINES 
    useEffect(() => {
        _getExercises() 
        _getRoutines()
    },[count])

    // GET EXERCISES AND ROUTINES FOCUSED
    useEffect(() => {
        _getExercises() 
        _getRoutines()
    },[isFocused])

    // SWITCH EXERCISES / ROUTINES 
    const _handleSwitchButton = () => {
        setSwitchButton(!switchButton)
    }

    // ADD EXERCISE
    const _handleAddExercise = (title) => {
        _addExercise(title)
        setCount(count+1)
    }

    // ADD ROUTINE
    const _handleAddItemRoutine = (name,exercisesList) => {
        _addRoutine(name,exercisesList)
        setCount(count+1)
    } 

    // DELETE 
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
    
    // NAVIGATION EXO 
    const _handleNavigate = (idExo) => {
        navigation.navigate('ExercicesStack', { screen:'Exo', params: { idExo:idExo, exercises:exercises }})
    }

    // NAVIGATION ROUTINE 
    const _handleNavRoutine = (idRoutine) => {
        navigation.navigate('ExercicesStack', { screen:'Routine', params: { idRoutine:idRoutine, routines:routines }})
    }

    // UPDATE ROUTINE 
    const _handleUpdateRoutine = (id, name, exercisesList) => {
        _updateRoutine(id,name,exercisesList)
    }

    // RENDER EXERCISES 
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

            {/* DISPLAY EXERICISES / ROUTINES */}
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

// STYLES DESIGN 
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


