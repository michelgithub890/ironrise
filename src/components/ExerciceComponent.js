import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import ModalExercice from './ModalExercice'
import { MODEL_COLORS } from '../models/modelColors' 

const windowWidth = Dimensions.get('window').width 
const { height } = Dimensions.get('window')

const ExerciceComponent = ({ exercises, renderExercises, _handleAddExercise }) => { 
    const [modalVisible, setModalVisible] = useState(false) 

    return ( 
        <>
            <View style={styles.container}>

                <View style={styles.viewAdd}>
                    <Text style={styles.title}>EXERCICES</Text>
                     <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <MaterialIcons name="add-circle" size={24} color={MODEL_COLORS.main} />
                     </TouchableOpacity>
                </View>

                <ModalExercice
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible} 
                    _handleAddExercise={_handleAddExercise}
                />

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