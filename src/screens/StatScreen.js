import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { MODEL_COLORS } from '../models/modelColors'
import useExercises from '../hooks/useExercises'
import ModalStat from '../components/ModalStat'
import useStatistics from '../hooks/useStatistics'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

const { width } = Dimensions.get("window")

const StatScreen = () => {
    const { _getExercises, exercises } = useExercises()
    const { _getStatistics, statistics } = useStatistics()
    const [montage, setMontage] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [titleExercise, setTitleExercise] = useState()

    useEffect(() => {
        _getExercises()
        _getStatistics()
        setMontage(false)
    },[])

    if (montage) return <Text>data...</Text>

    const _renderExercices = ({ item }) => (
        <TouchableOpacity onPress={() => [setTitleExercise(item.title), setModalVisible(true)]} style={styles.item}>
            <Text style={styles.text}>{item.title}</Text>
        </TouchableOpacity>
    )

    const _handleClose = () => {
        setModalVisible(false)
    }

    const _showDate = (date) => {
        const parsedDate = new Date(date);
        const formattedDate = format(parsedDate, "eeee dd MMMM yyyy", { locale: fr })
        return formattedDate
    }
    
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Statistiques</Text>

            <View style={styles.list}>
                <FlatList
                    data={exercises}
                    style={{ marginBottom:30 }}
                    renderItem={_renderExercices}
                    keyExtractor={(item) => item._id}
                />
            </View>

            <ModalStat
                modalVisible={modalVisible}
                _handleClose={_handleClose}
                statistics={statistics}
                titleExercise={titleExercise}
                _showDate={_showDate}
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
        marginTop:10,
    },
    title:{
        fontSize:40,
        color:MODEL_COLORS.main,
        fontWeight:'bold',
        marginTop:40,
        marginBottom:20,
        textAlign:'center',
    },
})