import React, { useEffect, useState } from 'react'
// REACT NATIVE 
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Alert } from 'react-native'
// NAVIGATION 
import { useNavigation } from '@react-navigation/native'
// MODAL 
import ModalModifExo from '../components/ModalModifExo'
// ICONS 
import { MaterialCommunityIcons } from '@expo/vector-icons'
// MODEL 
import { MODEL_COLORS } from '../models/modelColors'
// HOOK EXERCISES 
import useExercises from '../hooks/useExercises'

const ExoScreen = (props) => {
    // CONST ROUTE PARAM 
    const { idExo, exercises } = props.route.params 
    // HOOK EXERCISES 
    const { _deleteExercise, _updateExercise } = useExercises()
    // NAVIAGATION 
    const navigation = useNavigation()
    // CONST 
    const [filteredExercises, setFilteredExercises] = useState([])
    const [modalVisible, setModalVisible] = useState(false)

    // GET EXERCISES => FILTER EXO
    useEffect(() => {
        const filtered = exercises.filter(exercise => exercise._id === idExo)
        setFilteredExercises(filtered)
    },[])

    // DELETE 
    const _handleDelete = () => {
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
                        console.log('page exo screen _handleDelete ', idExo)
                        await _deleteExercise(idExo)
                        navigation.goBack() 
                    }
                }
            ],
            // Options
            { cancelable: false }
        )
    }

    // UPDATE 
    const _handleUpdateItem = (updatedTitle) => {
        const idExo = filteredExercises[0]._id
        _updateExercise(idExo, updatedTitle)
        navigation.goBack()
        
    }

    // RENDER ITEM 
    const renderItem = ({ item }) => (
        <View>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    )
 
    return (
        <View style={styles.container}>

            <View style={styles.viewTitle}>

                {/* ICON PENCIL */}
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <MaterialCommunityIcons name="grease-pencil" size={24} color={MODEL_COLORS.main} />
                </TouchableOpacity>

                {/* ICON PENCIL */}
                <TouchableOpacity onPress={_handleDelete}>
                    <MaterialCommunityIcons name="trash-can" size={24} color={MODEL_COLORS.red} />
                </TouchableOpacity>

            </View>

            <View>

                {/* LIST EXERCISES */}
                <FlatList
                    data={filteredExercises}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                />
            </View>

            <View>
                <Text>Historique</Text>
            </View>

            {/* MODAL */}
            <ModalModifExo 
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                _handleUpdateItem={_handleUpdateItem}
                exerciceTitle={filteredExercises[0] ? filteredExercises[0].title : ""} 
            />

        </View>
    )
} 

export default ExoScreen

// STYLES DESIGN 
const styles = StyleSheet.create({
    container: {
        backgroundColor:MODEL_COLORS.light,
        flex:1,
        borderBottomColor:MODEL_COLORS.main,
        borderWidth:1,
        
    },
    viewTitle: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:15
    },
    title:{
        fontSize:35,
        color:MODEL_COLORS.main,
        fontWeight:'bold',
        alignSelf:'center',
    },
    viewModifDelete: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        margin:10
    }

})