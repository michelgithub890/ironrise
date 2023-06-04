import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { MODEL_COLORS } from '../models/modelColors'
import { MaterialIcons } from '@expo/vector-icons'
import ModalRep from '../components/ModalRep'
import useWorkout from '../hooks/useWorkout'

const WorkoutExerciseScreen = (props) => {
    const { title } = props.route.params 
    const [modalVisible, setModalVisible] = useState(false)
    const { _updateWorkout, workoutToday, _getWorkoutToday, _updateWorkoutExercise } = useWorkout()
    const [modifModal, setModifModal] = useState(false)
    const [dataModif, setDataModif] = useState()

    useEffect(() => {
        _getWorkoutToday()
    }, [])

    const _handleAdd = () => {
        setModalVisible(true)
    }

    const _handleClose = () => {
        setModalVisible(false)
        setModifModal(false)
        setDataModif()
    }

    const _handleCancel = () => {
        setModalVisible(false)
        setModifModal(false)
        setDataModif()
    }

    const _getSetsNumber = () => {
        let number = workoutToday?.map(w => w.exercises.filter(e => e.name === title).length)
        let num = parseInt(number)
        return num + 1
    }

    const _handleModifModal = (idW, idE, set) => {
        setModifModal(true)
        setModalVisible(true)
        const data = {idW:idW,idE:idE,set:set}
        setDataModif(data)
    }
    

    const renderWorkout = ({ item }) => (
        <View>
            {item.exercises.filter(e => e.name === title).map(e => (
                <TouchableOpacity style={styles.viewSerie} onPress={() => _handleModifModal(item._id,e._id,e.sets)}>
                    <Text style={styles.textSerie}>serie: {e.sets}</Text>
                    <Text style={styles.textSerie}>{e.reps} X {e.weight} kg</Text>
                </TouchableOpacity>
            ))}
        </View>
    )

    if (!workoutToday) return <Text>data...</Text>

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={_handleAdd}>
                <MaterialIcons style={styles.icon} name="add-circle" size={24} color={MODEL_COLORS.main} />
            </TouchableOpacity>
            <View style={styles.viewList}>
                <FlatList
                    data={workoutToday}
                    renderItem={renderWorkout}
                    keyExtractor={(item) => item._id}
                />
            </View>
            <ModalRep
                modalVisible={modalVisible}
                _handleClose={_handleClose}
                _handleCancel={_handleCancel}
                _getSetsNumber={_getSetsNumber}
                title={title}
                _updateWorkout={_updateWorkout}
                _updateWorkoutExercise={_updateWorkoutExercise}
                modifModal={modifModal}
                dataModif={dataModif}
                workoutToday={workoutToday}
            />
        </View>
    )
}

export default WorkoutExerciseScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor:MODEL_COLORS.light,
        flex:1
    },
    title: {
        textAlign:"center",
        color:MODEL_COLORS.main,
        fontSize:30,
        fontWeight:"bold",
    },
    icon: {
        textAlign:"center",
        margin:10,
    },
    viewSerie: {
        marginTop:10,
        marginLeft:20
    },
    textSerie: {
        fontSize:18
    },
    viewList: {
        marginBottom:200
    }
})

