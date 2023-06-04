import axios from 'axios'
// STORAGE
import AsyncStorage from '@react-native-async-storage/async-storage'

const useMongoAuth = ( setUserLoggedIn, isUserLoggedIn ) => {

    const _signIn = async (email, password) => {
        try {
            const response = await axios.post("http://192.168.1.22:4000/auth/signin", {
                email: email,
                password: password
            }, {
                headers: {
                    "Content-Type":"application/json",
                    Accept:"application/json",
                    "Access-Control-Allow-Origin":"*"
                }
            });
    
            if (response.data.status === "ok") {
                alert("login successful")
                try {
                    await AsyncStorage.setItem('@token', response.data.token)
                    await AsyncStorage.setItem('@email', email)
                    await AsyncStorage.setItem('@fname', response.data.fname)
                    await AsyncStorage.setItem('@lname', response.data.lname)
                    await AsyncStorage.setItem('@_id', response.data._id)
                } catch (error) {
                    console.error('AsyncStorage error: ', error)
                }
                setUserLoggedIn(true)
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const _signUp = async (fname, lname, email, password) => {
        try {
            const response = await axios.post("http://192.168.1.22:4000/auth/signup", {
                fname: fname,
                lname: lname,
                email: email,
                password: password
            }, {
                headers: {
                    "Content-Type":"application/json",
                    Accept:"application/json",
                    "Access-Control-Allow-Origin":"*"
                }
            });
    
            if (response.data.status === "ok") {
                alert("Registration successful")
                try {
                    await AsyncStorage.setItem('@token', response.data.token)
                    await AsyncStorage.setItem('@email', email)
                    await AsyncStorage.setItem('@fname', response.data.fname)
                    await AsyncStorage.setItem('@lname', response.data.lname)
                    await AsyncStorage.setItem('@_id', response.data._id)
                } catch (error) {
                    console.error('AsyncStorage error: ', error)
                }
                setUserLoggedIn(true)
            } else if(response.data.msg === 'User already exists') {
                alert('This email is already registered')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const _signOut = async () => {
        try {
            await AsyncStorage.removeItem('@token')
            await AsyncStorage.removeItem('@email')
            await AsyncStorage.removeItem('@_id')
            await AsyncStorage.removeItem('@fname')
            await AsyncStorage.removeItem('@lname')
            alert('logout')
        } catch(error) {
            console.error('Error:', error)
        }
        setUserLoggedIn(false)
    }

    return {
        _signIn,
        _signOut,
        _signUp,
        isUserLoggedIn
    }
}

export default useMongoAuth

