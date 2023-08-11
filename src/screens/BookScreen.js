import React, { useState, useEffect } from 'react'
// REACT NATIVE 
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
// MODEL 
import { MODEL_COLORS } from "../models/modelColors"
// NAVIGATION  
import { useIsFocused } from '@react-navigation/native'
// WORKOUT 
import useWorkout from '../hooks/useWorkout'
// DIMENSION SCREEN
const windowWidth = Dimensions.get('window').width
// DATE 
import { format, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

const BookScreen = ({ navigation }) => {

    // USE WORKOUT 
    const { _getWorkout, workouts } = useWorkout()
    // IS LOGGED
    const isFocused = useIsFocused()
    // CONST 
    const [montage, setMontage] = useState(true)

    // GET WORKOUT 
    useEffect(() => {
        _getWorkout()
        setMontage(false)
    },[])

    // GET WORKOUT IS FOCUSED
    useEffect(() => {
        if (isFocused) {
            _getWorkout()
            setMontage(false)
        }
    }, [isFocused])
    
    // RETURN WORKOUT IN ARRAY => FILTER 
    const _myRender = () => {
        // Transform workouts to group sets by exercise
        const transformedWorkouts = workouts.map(workout => ({
            ...workout,
            exercises: workout.exercises.reduce((acc, exercise) => {
                const existing = acc.find(ex => ex.name === exercise.name);
                // console.log("bookscreen myrender ", existing)
                if (existing) {
                existing.sets.push({ reps: exercise.reps, weight: exercise.weight });
                } else {
                acc.push({ 
                    name: exercise.name, 
                    sets: [{ reps: exercise.reps, weight: exercise.weight }] 
                });
                }
                return acc;
            }, []),
        }));
      
        return (
            <View>
                {transformedWorkouts.map((workout, i) => (
                <View style={styles.viewCard} key={workout._id}>
                    <Text style={styles.date}>
                    {_showDate(workout.date)}
                    </Text>
                    {workout.exercises.map((exercise, j) => (
                    <View key={`${workout._id}_${exercise.name}_${j}`}>
                        <Text style={styles.date}>{exercise.name}</Text>
                        <View style={styles.viewReps}>
                        {exercise.sets.map((set, k) => (
                            <Text key={k} style={{ marginRight: 5 }}>
                            {set.reps}X{set.weight}
                            </Text>
                        ))}
                        </View>
                    </View>
                    ))}
                </View>
                ))}

            </View>
        )
    }

    const _showDate = (date) => {
        const parsedDate = parseISO(date);
        const formattedDate = format(parsedDate, "EEEE dd MMMM yyyy", { locale: fr })
        return formattedDate
    }

    if (montage) return <Text>data...</Text>

    return (
        <View style={styles.container}>

            <ScrollView>

                {/* TITLE PAGE */}
                <Text style={styles.title}>Carnet</Text>

                {/* SHOW WORKOUT */}
                {workouts && _myRender()}   

                <View style={{ height:20 }} />

            </ScrollView>

        </View>
    )
}

export default BookScreen

// STYLES DESIGN 
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:"#8fcbbc",
    },
    title:{
        fontSize:40,
        color:MODEL_COLORS.main,
        fontWeight:'bold',
        marginTop:40,
        marginBottom:20,
        textAlign:'center',
    },
    viewCard: {
        backgroundColor:"white", 
        width:windowWidth *.9, 
        paddingBottom:10,
        margin:10,
        borderRadius:10
    },
    date: {
        fontWeight:"bold",
        textAlign:"center",
        marginTop:5,
    },
    viewReps: {
        display:"flex", 
        flexDirection:"row", 
        justifyContent:"space-around",
    }
})









