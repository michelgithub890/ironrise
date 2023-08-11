import React, { useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useStatistics = () => { 
    // CONST + LINK 
    const [statistics, setStatistics] = useState()
    let linkUrl = 'https://ironrise.herokuapp.com/'
    // https://ironrise.herokuapp.com/
    // http://192.168.1.22:4000/

    // GET STATISTICS 
    const _getStatistics = async () => {
        const token = await AsyncStorage.getItem('@token')
        const id = await AsyncStorage.getItem('@_id')
        // console.log('useStates _getStatistics ', token ,id)
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        try {
            const res = await axios.get(`${linkUrl}statistics`, config);
            // const res = await axios.get(`http://192.168.1.22:4000/workout?clientId=${id}`, config);
            setStatistics(res.data)
            return res.data
        } catch (err) {
            setStatistics()
            // console.error('useStatistics ',err);
        } 
    }

    return {
        _getStatistics,
        statistics,
    }
}

export default useStatistics