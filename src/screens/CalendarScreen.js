import React, { useEffect } from 'react'
// REACT NATIVE 
import { View, Text, StyleSheet } from 'react-native'
// MODEL 
import { MODEL_COLORS } from "../models/modelColors"
// CALENDAR 
import { Calendar, LocaleConfig } from 'react-native-calendars'
// HOOK WORK OUT 
import useWorkout from '../hooks/useWorkout'

// LOCAL DATE 
LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juill.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
  };
  
  LocaleConfig.defaultLocale = 'fr';


  const CalendarScreen = ({ navigation }) => {
    // USE WORKOUT 
    const { _getWorkout, workouts } = useWorkout()
  
    // GET WORKOUT 
    useEffect(() => {
    _getWorkout()
    },[])
    
    // MARKED DATES 
    const markedDates = workouts?.reduce((acc, workout) => {
        const date = new Date(workout.date);
        const key = date.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        acc[key] = { selected: true, marked: true, selectedColor:MODEL_COLORS.main };
        return acc;
    }, {}) || {};
    
    // DAY PRESSED 
    const onDayPress = (day) => {
        const clickedDate = new Date(day.year, day.month - 1, day.day); // months are 0-indexed in JavaScript Date
        const today = new Date();
        today.setHours(0, 0, 0, 0); // set time to 00:00:00 to just compare dates
    
        if (clickedDate >= today) {
            console.log('Clicked date: ' + clickedDate.toISOString().split('T')[0]);
        } else {
            console.log('Clicked date is in the past');
        }
    };
  
    return (
        <View style={styles.container}>
            <View>
    
                {/* TITLE PAGE */}
                <Text style={styles.title}>Calendrier</Text>
        
                {/* CALENDAR */}
                <Calendar markedDates={markedDates} onDayPress={onDayPress} />
    
            </View>
        </View>
    )
  }
  


export default CalendarScreen

// STYLES DESIGN 
const styles = StyleSheet.create({
    // Define the "container" style.
    container:{
        flex:1,
        backgroundColor:"#8fcbbc",
    },
    innerContainer:{
        paddingTop:20
    },
    title:{
        fontSize:40,
        color:MODEL_COLORS.main,
        fontWeight:'bold',
        marginTop:40,
        alignSelf:'center',
        marginBottom:30
    }
})