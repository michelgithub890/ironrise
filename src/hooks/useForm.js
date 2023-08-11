import { useState } from 'react'

const useForm = (initialState) => {
    // VALUES 
    const [values, setValues] = useState(initialState)

    // CHANGE VALUES 
    const _handleChange = (name, value) => { 
        // maintenir en memoire
        setValues(prevValues => ({ 
            ...prevValues,
            [name]: value
        }))
    }

    // remettre a zero // REFRESH 
    const _refresh = () => {
        setValues(initialState)
        // console.log('useForm refresh ',)
    }

    // CLEAR INPUT
    const _clearInput = (name) => {
        console.log('useForm clearInput ', name)
        setValues(prevValues => ({
            ...prevValues,
            [name]: ''
        }))
    }

    return { 
        _handleChange, 
        values, 
        _refresh, 
        setValues, 
        _clearInput 
    }
}

export default useForm
