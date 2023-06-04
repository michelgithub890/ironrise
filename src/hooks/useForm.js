import { useState } from 'react'

const useForm = (initialState) => {
    const [values, setValues] = useState(initialState)

    const _handleChange = (name, value) => { 
        // maintenir en memoire
        setValues(prevValues => ({ 
            ...prevValues,
            [name]: value
        }))
    }

    // remettre a zero
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

    return { _handleChange, values, _refresh, setValues, _clearInput }
}

export default useForm
