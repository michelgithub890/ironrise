import React, { useContext, useEffect } from 'react'
// REACT NATIVE
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native'
// NAVIGATION  
import { useIsFocused } from '@react-navigation/native'
// APP CONTEXT 
import AuthContext from '../components/AuthContext'
// MODEL 
import { MODEL_COLORS } from '../models/modelColors'
// HOOKS  
import useRoutines from '../hooks/useRoutines'
import useWorkout from '../hooks/useWorkout'

// SIZE SCREEN 
const windowWidth = Dimensions.get('window').width 

// npx nodemon sever.js

// PAGE HOME
const HomeScreen = ({ navigation }) => {
    // IS LOGGED 
    const { isUserLoggedIn } = useContext(AuthContext)
    // USE ROUTINES 
    const { _getRoutines, routines } = useRoutines()
    // IS FOCUS 
    const isFocused = useIsFocused()
    // ADD WORKOUT 
    const { _addWorkout } = useWorkout()

    // GET ROUTINES 
    useEffect(() => {
        console.log('HomeScreen useEffect', isUserLoggedIn)
        _getRoutines()
    },[])

    // GET ROUTINES IS FOCUSED
    useEffect(() => {
        if (isFocused) {
          // Votre logique ici 
          console.log('HomeScreen useEffect isFocused')
          _getRoutines()
        }
      }, [isFocused])
 
    // NAVIGATE WORKOUT + CREATE WORKOUT 
    const _handleNavigate = (item,title) => {
        navigation.navigate('Home', { screen:'Workout', params: { idRoutine:item }})
        _createWorkout(title)
    }

    // NAVIGATE STATS
    const _handleNavStat = () => {
        navigation.navigate('Home', { screen:'Stats' })
    }
 
    // ADD WORKOUT 
    const _createWorkout = () => {
        _addWorkout()
    }

    // ROUTINES => NAME 
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

            {/* TEST */}
            <TouchableOpacity style={{ marginTop:30 }} onPress={() => navigation.navigate('Forgot')}>
                <Text>forgot password</Text>
            </TouchableOpacity>

        </View> 
    )
}

export default HomeScreen

// STYLES DESIGN 
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
