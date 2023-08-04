import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useWorkout = () => {
    const [workouts, setWorkouts] = useState()
    const [workoutToday, setWorkoutToday] = useState()
    let linkUrl = 'https://ironrise.herokuapp.com/'
    // https://ironrise.herokuapp.com/
    // http://192.168.1.22:4000/

    const _addWorkout = async () => {
        const token = await AsyncStorage.getItem('@token')
        const clientId = await AsyncStorage.getItem('@_id')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.post('${linkUrl}workout', { clientId }, config)
            _getWorkout()
        } catch (err) {
            console.error("erreur => il y a déja un workout ",err);
        }
    }

    const _getWorkout = async () => {
        const token = await AsyncStorage.getItem('@token')
        const id = await AsyncStorage.getItem('@_id')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.get(`${linkUrl}workout`, config);
            // const res = await axios.get(`http://192.168.1.22:4000/workout?clientId=${id}`, config);
            setWorkouts(res.data)
            return res.data
        } catch (err) {
            setWorkouts()
            console.error(err);
        } 
    }

    const _getWorkoutToday = async () => {
        const token = await AsyncStorage.getItem('@token')
        const id = await AsyncStorage.getItem('@_id')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.get(`${linkUrl}workout/today?clientId=${id}`, config);
            setWorkoutToday(res.data)
            return res.data
        } catch (err) {
            console.error(err);
        } 
    }

    const _updateWorkout = async (exercise) => {
        const token = await AsyncStorage.getItem('@token')
        const id = await AsyncStorage.getItem('@_id')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            await axios.put(`${linkUrl}workout/${id}`, {exercise}, config)
            _getWorkoutToday()
        } catch (err) {
            console.error("error => update work out", err);  
        }
    }

    const _updateWorkoutExercise = async (workoutId, exerciseId, exercise) => {
        const token = await AsyncStorage.getItem('@token')
        const clientId = await AsyncStorage.getItem('@_id')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            await axios.put(`${linkUrl}workout/${workoutId}/exercise/${exerciseId}`, { exerciseId, exercise, clientId }, config)
            _getWorkoutToday()
        } catch (err) {
            console.error("Error updating workout", err);  
        }
    }


    const _deleteWorkout = async (id) => { 
        const token = await AsyncStorage.getItem('@token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            await axios.delete(`${linkUrl}workout/${id}`, config)
            _getWorkout()
        } catch (err) {
            console.error("error delete exercice => ",err);
        }
    }

    return {
        _addWorkout,
        _getWorkout,
        _deleteWorkout,
        _updateWorkout,
        _getWorkoutToday,
        _updateWorkoutExercise,
        workoutToday,
        workouts
    }

}

export default useWorkout