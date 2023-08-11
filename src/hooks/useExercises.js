import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useExercises = () => {
    // CONST + LINK 
    const [exercises, setExercises] = useState() 
    let linkUrl = 'https://ironrise.herokuapp.com/'
    // https://ironrise.herokuapp.com/
    // http://192.168.1.22:4000/
    
    // ADD EXERCISE
    const _addExercise = async (title) => {
        const token = await AsyncStorage.getItem('@token')
        const id = await AsyncStorage.getItem('@_id')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.post('http://192.168.1.22:4000/exercise', { title, id }, config)
            _getExercises()
        } catch (err) {
            console.log('usemongoexercice _addexercice => ', err)
            console.error("erreur => ",err); // handle error
        }
    }

    // GET EXERCISE 
    const _getExercises = async () => {
        const id = await AsyncStorage.getItem('@_id')
        const token = await AsyncStorage.getItem('@token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.get(`${linkUrl}exercise?clientId=${id}`, config)
            setExercises(res.data)
            return res.data
        } catch (err) {
            setExercises()
            console.error("erreur get_exo => ",err)
        }
    }

    // UPDATE EXERCISE 
    const _updateExercise = async (id, title) => {
        const token = await AsyncStorage.getItem('@token')
        const clientId = await AsyncStorage.getItem('@_id')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        console.log('use_exo put ', title, clientId)
        try {
            await axios.put(`${linkUrl}exercise/${id}`, {title, clientId}, config)
            _getExercises()
        } catch (err) { 
            console.error("error => ", err);  
        }
    }

    // DELETE EXERCISE 
    const _deleteExercise = async (id) => { 
        const token = await AsyncStorage.getItem('@token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            await axios.delete(`${linkUrl}exercise/${id}`, config)
            _getExercises()
        } catch (err) {
            console.error("error => ", err)
        }
    }
    
    // RETURN METHOD 
    return {
        _addExercise,
        _getExercises,
        _updateExercise,
        _deleteExercise,
        exercises,
    }
}

export default useExercises