import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, FlatList, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ModalModifExo from '../components/ModalModifExo'

const RoutineScreen = (props) => {
    const { idRoutine, routines } = props.route.params
    const [filteredRoutines, setFilteredRoutines] = useState([]) 
    const [modalVisible, setModalVisible] = useState(false)
    const navigation = useNavigation()

    useEffect(() => {
        console.log('page exo use effect => ', routines)
        const filtered = routines.filter(routine => routine._id === idRoutine)
        setFilteredRoutines(filtered)
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
                        console.log('page exo screen _handleDelete ', idRoutine)
                        await _deleteRoutine(idRoutine)
                        navigation.goBack()
                    }
                }
            ],
            // Options
            { cancelable: false }
        )
    }

    const _handleUpdateItem = (updatedTitle) => {
        const idRoutine = filteredRoutines[0]._id
        const updatedRoutine = { title: updatedTitle }
        _updateRoutine(idRoutine, updatedRoutine)
        navigation.goBack()
        
    }


    const renderItem = ({ item }) => (
        <View style={styles.container}>
            <Text style={styles.title}>{item.title}</Text>
        </View>
    )

    return (
        <View>

            <View style={styles.viewModifDelete}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text>modif</Text>
                </TouchableOpacity>
 
                <TouchableOpacity onPress={_handleDelete}>
                    <Text>supp</Text>
                </TouchableOpacity>
            </View>

            <View>
                <FlatList
                    data={filteredRoutines}
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
                routineTitle={filteredRoutines[0] ? filteredRoutines[0].title : ""} 
            />

        </View>
    )
}

export default RoutineScreen

const styles = StyleSheet.create({
    container:{
        alignSelf:'center',
        padding:20,
    },
    title:{
        fontSize:30
    },
    viewModifDelete: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        borderWidth:1,
        padding:10,
        margin:10
    }

})