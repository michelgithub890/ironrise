import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native'
import { MaterialIcons,MaterialCommunityIcons, } from '@expo/vector-icons'
import ModalRoutine from './ModalRoutine'
import { MODEL_COLORS } from '../models/modelColors'
import Checkbox from 'expo-checkbox'

const windowWidth = Dimensions.get('window').width



const RoutineComponent = ({ _handleAddItemRoutine, routines, exercises, _handleDelete }) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [selectedItems, setSelectedItems] = useState({})
    const [selectedRoutine, setSelectedRoutine] = useState(null)

    useEffect(() => {
    },[])

    const _handleCheckboxChange = (itemId, newValue) => {
        setSelectedItems({
            ...selectedItems,
            [itemId]: newValue,
        })
    }

    const renderExercises = ({ item }) => (
        <View style={styles.renderExercices}>
          <Checkbox 
            style={styles.box} 
            value={selectedItems[item._id] || false} 
            onValueChange={(newValue) => _handleCheckboxChange(item._id, newValue)}
          />
          <Text>{item.title}</Text>
        </View>
    )

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <View style={styles.itemTitle}>
                <View style={{ width:24 }} />
                <TouchableOpacity /* onPress={() => _getAllElements(item._id, item.title)} */>
                    <Text style={styles.titleItemRoutine}>{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => _handleDelete(item._id)}>
                <MaterialCommunityIcons name="trash-can" size={24} color={MODEL_COLORS.red} />
                </TouchableOpacity>
            </View>
            <View style={styles.line} />
            {item.exercises?.map(ex => (
                <Text key={ex._id} style={styles.exoItemRoutine}>{ex.title}</Text>
            ))}
        </View>
    )  

    const _handleSave = (name) => {
        const selectedExercices = exercises.filter((exercise) => selectedItems[exercise._id])
        _handleAddItemRoutine(name, selectedExercices.map((exercise) => exercise._id))
        setSelectedItems({})
    }

    return (
        <>
            <View style={styles.container}>

                <View style={styles.viewAdd}>
                    <Text style={styles.title}>ROUTINE</Text>
                     <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <MaterialIcons name="add-circle" size={24} color={MODEL_COLORS.main} />
                     </TouchableOpacity>
                </View>

                <View style={{ marginBottom: 300, marginTop:20 }}> 
                    <FlatList
                        data={routines}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                    />
                </View>

                <ModalRoutine 
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible} 
                    _handleAddItemRoutine={_handleSave}
                    renderExercises={renderExercises}
                    exercises={exercises}
                />

                {/* <View>
                    <FlatList
                        data={routines}
                        renderItem={renderItem}
                        keyExtractor={(item) => item._id}
                    />
                </View> */}

            </View>
        </>
    )
}

export default RoutineComponent

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
    item: {
        backgroundColor:'white',
        borderRadius:5,
        marginTop:10,
        paddingTop:10,
        paddingBottom:10,
        // display:'flex',
        // flexDirection:'row',
        // justifyContent:'center',
    },
    renderExercices: {
        backgroundColor:'white',
        borderRadius:5,
        marginTop:10,
        padding:10,
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
    },
    box: {
        marginLeft:10,
        marginRight:10
    },
    itemRoutine: {
        backgroundColor:"white",
        paddingVertical:10,
        borderRadius:10,
        marginTop:10
    },
    titleItemRoutine: {
        fontSize:18,
        alignSelf:'center',
        fontWeight:'bold',
    },
    line: {
        borderBottomWidth:1,
        borderColor:MODEL_COLORS.main,
        paddingTop:10,
        marginBottom:10
    },
    exoItemRoutine: {
        marginLeft:10,
        textAlign:"center",
    },
    itemTitle: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:10
    }
})