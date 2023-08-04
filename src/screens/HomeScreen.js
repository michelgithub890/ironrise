import React, { useContext, useEffect, useState } from 'react'
// REACT NATIVE
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native'
// NAVIGATION  
import { useIsFocused } from '@react-navigation/native'
// APP CONTEXT 
import AuthContext from '../components/AuthContext'
// MODEL 
import { MODEL_COLORS } from '../models/modelColors'
import useRoutines from '../hooks/useRoutines'
import useWorkout from '../hooks/useWorkout'


const windowWidth = Dimensions.get('window').width 

// npx nodemon sever.js

// PAGE HOME
const HomeScreen = ({ navigation }) => {
    const { isUserLoggedIn } = useContext(AuthContext)
    const { _getRoutines, routines } = useRoutines()
    const isFocused = useIsFocused()
    const { _addWorkout } = useWorkout()

    useEffect(() => {
        console.log('HomeScreen useEffect', isUserLoggedIn)
        _getRoutines()
    },[])

    useEffect(() => {
        if (isFocused) {
          // Votre logique ici
          console.log('HomeScreen useEffect isFocused')
          _getRoutines()
        }
      }, [isFocused])
 
 
    const _handleNavigate = (item,title) => {
        navigation.navigate('Home', { screen:'Workout', params: { idRoutine:item }})
        _createWorkout(title)
    }

    const _handleNavStat = () => {
        navigation.navigate('Home', { screen:'Stats' })
    }
 
    const _createWorkout = () => {
        _addWorkout()
    }

    const renderRoutines = ({ item }) => (
        <TouchableOpacity onPress={() => _handleNavigate(item._id)} >
            <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
    )

    return (
        // CONTAINER
        <View style={styles.container}>

            {/* TITLE PAGE */}
            <Text style={styles.mainTitle}>Iron App</Text>

            {/* NEXT SESSION CARD */}
            <TouchableOpacity style={styles.viewCard} /* onPress={() => setModalVisible(true)} */>
                <Text style={styles.title}>NOUVELLE SÉANCE</Text>
                <FlatList
                    data={routines}
                    renderItem={renderRoutines}
                    keyExtractor={(item) => item._id}
                />
            </TouchableOpacity>

            {/* STATS CARD */}
            <TouchableOpacity style={styles.viewCard} onPress={_handleNavStat}>
                <Text style={styles.title}>STATS</Text>
            </TouchableOpacity>

        </View> 
    )
}

export default HomeScreen

// The StyleSheet.create method allows you to define styles in a dedicated place.
const styles = StyleSheet.create({
    // Define the "container" style.
    container:{
        flex:1,
        alignItems:'center',
        // justifyContent:'center',
        backgroundColor:"#8fcbbc"
    },
    mainTitle:{
        fontSize:40,
        color:MODEL_COLORS.main,
        fontWeight:'bold',
        marginTop:40,
        alignSelf:'center',
        marginBottom:30
    },
    title:{
        fontSize:40,
        color:MODEL_COLORS.main,
        fontWeight:'bold',
        marginTop:40
    },
    viewCard:{
        backgroundColor:"white",
        paddingHorizontal:30,
        paddingVertical:20,
        borderRadius:20,
        width:windowWidth * .8,
        marginTop:30,
    },
    title:{
        fontSize:20
        ,
        fontWeight:'bold',
        alignSelf:'center',
    },
    item: {
        textAlign:"center",
        marginTop:20,
        fontSize:18,
        fontWeight:'bold',
        color:MODEL_COLORS.main
    }
})
