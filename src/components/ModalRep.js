import React, { useState } from 'react'
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { MODEL_COLORS } from '../models/modelColors'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width } = Dimensions.get('window')

const ModalRep = ({ modalVisible, _handleClose, _handleCancel, _getSetsNumber, title, _updateWorkout, modifModal, dataModif, _updateWorkoutExercise, workoutToday }) => { 
    const [numberRep, setNumberRep] = useState('')
    const [numberWeight, setNumberWeight] = useState('')

    const _handleRep = (n) => {
        setNumberRep(numberRep+n)
    }

    const _handleRepClean = () => {
        setNumberRep('')
    }

    const _handleWeight = (n) => {
        setNumberWeight(numberWeight+n)
    }

    const _handleWeightClean = () => {
        setNumberWeight('')
    }

    const _handleCancelModal = () => {
        setNumberRep('')
        setNumberWeight('')
        _handleCancel()
    }

    const _handleSave = async () => {
        if (numberRep && numberWeight) {
            const exercise = { sets:_getSetsNumber(), reps:parseInt(numberRep), weight:parseInt(numberWeight), name:title }
            setNumberRep('')
            setNumberWeight('')
            _handleClose()
            _updateWorkout(exercise)
        }
    }

    const _handleModif = () => {
        let exerciseUpdate = ""
        if (numberRep && numberWeight) {
            workoutToday?.map(workout => {
                workout.exercises = workout.exercises.map(exercise => {
                    if (exercise._id === dataModif.idE) {
                        exerciseUpdate = {
                            name:title,
                            sets: exercise.sets,
                            reps: parseInt(numberRep),
                            weight: parseInt(numberWeight),
                        }
                        return exerciseUpdate;  // retournez la mise à jour de l'exercice
                    } else {
                        return exercise;  // retournez l'exercice inchangé
                    }
                })
            })
            _updateWorkoutExercise(dataModif.idW, dataModif.idE, exerciseUpdate)
            setNumberRep('')
            setNumberWeight('')
            _handleClose()
        }
    }
    

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>

                    <Text style={styles.modalText}>Série : {modifModal ? dataModif.set : _getSetsNumber()}</Text>

                    <Text style={styles.modalText}>Répétitions: {numberRep}</Text>

                    <View>
                        <View  style={styles.styleNumber}>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleRep('1')}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleRep('2')}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleRep('3')}>3</Text>
                            </TouchableOpacity>
                        </View>
                        <View  style={styles.styleNumber}>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleRep('4')}>4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleRep('5')}>5</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleRep('6')}>6</Text>
                            </TouchableOpacity>
                        </View>
                        <View  style={styles.styleNumber}>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleRep('7')}>7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleRep('8')}>8</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleRep('9')}>9</Text>
                            </TouchableOpacity>
                        </View>
                        <View  style={styles.styleNumber}>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleRep('0')}>0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.clean} onPress={_handleRepClean}>Effacer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <Text style={{ marginTop:10 }}>Charge : {numberWeight}</Text>

                    <View>
                        <View  style={styles.styleNumber}>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleWeight('1')}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleWeight('2')}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleWeight('3')}>3</Text>
                            </TouchableOpacity>
                        </View>
                        <View  style={styles.styleNumber}>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleWeight('4')}>4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleWeight('5')}>5</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleWeight('6')}>6</Text>
                            </TouchableOpacity>
                        </View>
                        <View  style={styles.styleNumber}>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleWeight('7')}>7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleWeight('8')}>8</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleWeight('9')}>9</Text>
                            </TouchableOpacity>
                        </View>
                        <View  style={styles.styleNumber}>
                            <TouchableOpacity>
                                <Text style={styles.number} onPress={() => _handleWeight('0')}>0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.clean} onPress={_handleWeightClean}>Effacer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.viewButton}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonCancel]}
                            onPress={_handleCancelModal}
                        >
                            <Text style={styles.textStyle}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={modifModal ? _handleModif  : _handleSave}
                        >
                            <Text style={styles.textStyle}>Enregistrer</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
        </Modal>
    )
}

export default ModalRep

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        // alignItems: "center",
        marginTop: 10,
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        height: '80%',
        width: '100%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 10,
        fontSize:16,
        textAlign:"right"
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginTop:30,
        width:width * 0.3,
        marginLeft:10,
        marginRight:10
    },
    buttonClose: {
        backgroundColor:MODEL_COLORS.main,
    },
    buttonCancel: {
        backgroundColor:MODEL_COLORS.orange,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    styleNumber: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-around",
    },
    number: {
        width: width * 0.24,
        textAlign:"center",
        paddingTop:5,
        paddingBottom:5,
        marginTop:5,
        backgroundColor:MODEL_COLORS.light,
        borderRadius:10,
        marginLeft: '1%',
        marginRight: '1%',
    },
    clean: {
        width: width * 0.5,
        textAlign:"center",
        paddingTop:5,
        paddingBottom:5,
        marginTop:5,
        backgroundColor:MODEL_COLORS.light,
        borderRadius:10,
        margin: '1%',
    },
    viewButton: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"flex-start",
    }
})



