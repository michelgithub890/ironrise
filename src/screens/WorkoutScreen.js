import React, { useEffect, useState } from 'react'
// REACT NATIVE 
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions } from 'react-native'
// DATE 
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
// MODEL 
import { MODEL_COLORS } from '../models/modelColors'
// HOOK ROUTINES 
import useRoutines from '../hooks/useRoutines'

const { width } = Dimensions.get('window')

const WorkoutScreen = ({ navigation, route }) => {
    // CONST ROUTE PARAMS 
    const { idRoutine } = route.params 
    // HOOK ROUTINES 
    const { _getRoutines, routines } = useRoutines()
    // DATE
    const date = new Date(Date.now())
    const formattedDate = format(date, "eeee dd MMMM yyyy", { locale: fr })
    // CONST 
    const [filteredRoutines, setFilteredRoutines] = useState()

    // GET ROUTINES 
    useEffect(() => { 
        _getRoutines()  
    },[])

    // GET ROUTINE + FILTER 
    useEffect(() => {
        const filter = routines?.filter(routine => routine._id === idRoutine)
        setFilteredRoutines(filter)

    },[routines])

    // RENDER ROUTINES 
    const renderRoutines = ({ item }) => (
        <View>
            {item.exercises.map(e => (
                <TouchableOpacity style={styles.exercise} onPress={() => _handleNavigate(e.title)} >
                    <Text key={e._id} style={styles.textExercise}>{e.title}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )


    // NAVIGATE 
    const _handleNavigate = (item) => {
        console.log('workout_screen nav ', item)
        navigation.navigate('Home', { screen:'WorkoutExercise', params: { title:item }})
    }

    
    return (
        <View style={styles.container}> 

            {/* DATE  */}
            <Text style={styles.title}>{formattedDate}</Text>

            {/* LIST ROUTINES */}
            <FlatList
                data={filteredRoutines}
                renderItem={renderRoutines}
                keyExtractor={(item) => item._id}
            />

        </View>
    )
}

export default WorkoutScreen

// STYLES DESIGN 
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