import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { MODEL_COLORS } from '../models/modelColors'
import useExercises from '../hooks/useExercises'
import ModalStat from '../components/ModalStat'

const { width } = Dimensions.get("window")

const StatScreen = () => {
    const { _getExercises, exercises } = useExercises()
    const [montage, setMontage] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        _getExercises()
        setMontage(false)
    },[])

    useEffect(() => {
        console.log('stats ', exercises)
    },[exercises])

    if (montage) return <Text>data...</Text>

    const _renderExercices = ({ item }) => (
        <TouchableOpacity onPress={() => _handleChoice(item._id)} style={styles.item}>
            <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
    )

    const _handleChoice = (id) => {
        console.log('stat _handleChoice ', id)
        setModalVisible(true)
    }

    const _handleClose = () => {
        setModalVisible(false)
    }

    return (
        <View style={styles.container}>

            <Text>page stats</Text>

            <View style={styles.list}>
                <FlatList
                    data={exercises}
                    renderItem={_renderExercices}
                    keyExtractor={(item) => item._id}
                />
            </View>

            <ModalStat
                modalVisible={modalVisible}
                _handleClose={_handleClose}
            />

        </View>
    )


}

export default StatScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:MODEL_COLORS.light,
        alignItems:'center',
    },
    item:{
        backgroundColor:"white",
        paddingHorizontal:10,
        paddingVertical:10,
        borderRadius:10,
        width:width * .8,
        marginTop:10,
    },
    text: {
        fontSize:18,
        textAlign:"center",
    },
    list: {
        marginBottom:50, 
        marginTop:10
    }
})