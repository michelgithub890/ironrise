import React, { useState } from 'react'
// REACT NATIVE 
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native'
// REACT NATIVE PAPER 
import { MaterialIcons } from '@expo/vector-icons'
// MODAL 
import ModalExercice from './ModalExercice'
// MODELS 
import { MODEL_COLORS } from '../models/modelColors' 

// WINDOWS DIMENSIONS 
const windowWidth = Dimensions.get('window').width 
const { height } = Dimensions.get('window')

const ExerciceComponent = ({ exercises, renderExercises, _handleAddExercise }) => { 
    // CONST 
    const [modalVisible, setModalVisible] = useState(false) 

    return ( 
        <>
            <View style={styles.container}>

                {/* SHOW EXERCISE */}
                <View style={styles.viewAdd}>

                    <Text style={styles.title}>EXERCICES</Text>

                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <MaterialIcons name="add-circle" size={24} color={MODEL_COLORS.main} />
                    </TouchableOpacity>

                </View>

                {/* MODAL EXERCISE */}
                <ModalExercice
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible} 
                    _handleAddExercise={_handleAddExercise}
                />

                {/* LIST EXERCISES */}
                <View style={{ marginBottom: 300, marginTop:20 }}>
                    <FlatList
                        data={exercises}
                        renderItem={renderExercises}
                        keyExtractor={(item) => item._id}
                    />
                </View>

            </View>
        </>
    )
}

export default ExerciceComponent

const styles = StyleSheet.create({
    viewAdd:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:"white",
        paddingHorizontal:30,
        paddingVertical:10,
        borderRadius:20,
        width:windowWidth * .8,
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
    },
})