import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useRoutines = () => {
    // CONST + LINK 
    const [routines, setRoutines] = useState()
    let linkUrl = 'https://ironrise.herokuapp.com/'
    // https://ironrise.herokuapp.com/
    // http://192.168.1.22:4000/

    // ADD ROUTINE 
    const _addRoutine = async (name, exercises) => {
        const token = await AsyncStorage.getItem('@token')
        const id = await AsyncStorage.getItem('@_id')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.post(`${linkUrl}routine`, { name, id, exercises }, config)
            _getRoutines()
        } catch (err) {
            console.error("erreur => ",err);
        }
    }

    // GET ROUTINE 
    const _getRoutines = async () => {
        const token = await AsyncStorage.getItem('@token')
        const id = await AsyncStorage.getItem('@_id')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.get(`${linkUrl}routine?clientId=${id}`, config);
            setRoutines(res.data)
            return res.data
        } catch (err) {
            setRoutines()
            console.error(err);
        } 
    }

    // DELETE ROUTINE 
    const _deleteRoutine = async (id) => {
        const token = await AsyncStorage.getItem('@token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            await axios.delete(`${linkUrl}routine/${id}`, config)
            _getRoutines()
        } catch (err) {
            console.error("error delete exercice => ",err);
        }
    }

    return {
        _addRoutine,
        _getRoutines,
        _deleteRoutine,
        routines
    }
}

export default useRoutines

// https://ironrise.herokuapp.com/