import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ModalModifExo from '../components/ModalModifExo'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { MODEL_COLORS } from '../models/modelColors'
import useExercises from '../hooks/useExercises'

const ExoScreen = (props) => {
    const { idExo, exercises } = props.route.params 
    const [filteredExercises, setFilteredExercises] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const { _deleteExercise, _updateExercise } = useExercises()
    const navigation = useNavigation()

    useEffect(() => {
        const filtered = exercises.filter(exercise => exercise._id === idExo)
        setFilteredExercises(filtered)
    },[])

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

    const _handleUpdateItem = (updatedTitle) => {
        const idExo = filteredExercises[0]._id
        _updateExercise(idExo, updatedTitle)
        navigation.goBack()
        
    }

    const renderItem = ({ item }) => (
        <View>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    )
 
    return (
        <View style={styles.container}>

            <View style={styles.viewTitle}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <MaterialCommunityIcons name="grease-pencil" size={24} color={MODEL_COLORS.main} />
                </TouchableOpacity>

                <TouchableOpacity onPress={_handleDelete}>
                    <MaterialCommunityIcons name="trash-can" size={24} color={MODEL_COLORS.red} />
                </TouchableOpacity>

            </View>

            <View>
                <FlatList
                    data={filteredExercises}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                />
            </View>

            <View>
                <Text>Historique</Text>
            </View>

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