import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { MODEL_COLORS } from '../models/modelColors'
import useRoutines from '../hooks/useRoutines'

const { width } = Dimensions.get('window')

const WorkoutScreen = ({ navigation, route }) => {
    const { idRoutine } = route.params 
    const { _getRoutines, routines } = useRoutines()
    const [filteredRoutines, setFilteredRoutines] = useState()
    const date = new Date(Date.now())
    const formattedDate = format(date, "eeee dd MMMM yyyy", { locale: fr })

    useEffect(() => { 
        _getRoutines()  
    },[])

    useEffect(() => {
        const filter = routines?.filter(routine => routine._id === idRoutine)
        setFilteredRoutines(filter)

    },[routines])

    const renderRoutines = ({ item }) => (
        <View>
            {item.exercises.map(e => (
                <TouchableOpacity style={styles.exercise} onPress={() => _handleNavigate(e.title)} >
                    <Text key={e._id} style={styles.textExercise}>{e.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )


    const _handleNavigate = (item) => {
        console.log('workout_screen nav ', item)
        navigation.navigate('Home', { screen:'WorkoutExercise', params: { title:item }})
    }

    
    return (
        <View style={styles.container}> 
            <Text style={styles.title}>{formattedDate}</Text>
            <FlatList
                data={filteredRoutines}
                renderItem={renderRoutines}
                keyExtractor={(item) => item._id}
            />
        </View>
    )
}

export default WorkoutScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#8fcbbc",
    },
    title: {
        fontSize:20,
        color:MODEL_COLORS.main,
        fontWeight:'bold',
        marginTop:10,
        marginBottom:10,
        textAlign:"center",
    },
    exercise: {
        backgroundColor:'white',
        padding:15,
        marginTop:10,
        width:width * 0.8,
        alignSelf:"center",
        borderRadius:10

    },
    textExercise: {
        textAlign:"center",
        fontSize:18
    }
})