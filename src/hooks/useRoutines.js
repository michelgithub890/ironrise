import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useRoutines = () => {
    const [routines, setRoutines] = useState()

    const _addRoutine = async (name, exercises) => {
        const token = await AsyncStorage.getItem('@token')
        const id = await AsyncStorage.getItem('@_id')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.post('http://192.168.1.22:4000/routine', { name, id, exercises }, config)
            _getRoutines()
        } catch (err) {
            console.error("erreur => ",err);
        }
    }

    const _getRoutines = async () => {
        const token = await AsyncStorage.getItem('@token')
        const id = await AsyncStorage.getItem('@_id')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.get(`http://192.168.1.22:4000/routine?clientId=${id}`, config);
            setRoutines(res.data)
            return res.data
        } catch (err) {
            setRoutines()
            console.error(err);
        } 
    }

    const _deleteRoutine = async (id) => {
        const token = await AsyncStorage.getItem('@token')
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            await axios.delete(`http://192.168.1.22:4000/routine/${id}`, config)
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