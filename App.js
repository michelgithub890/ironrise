import React from 'react'
// NAVIGATION 
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './src/navigation/Tabs'
// AUTH 
import { AuthProvider } from './src/components/AuthContext'
// STATUS BAR 
import { StatusBar } from 'react-native'
// MODEL 
import { MODEL_COLORS } from './src/models/modelColors'


const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
          <StatusBar barStyle="dark-content" backgroundColor={MODEL_COLORS.light} />
          <Tabs />
      </AuthProvider>
    </NavigationContainer>
  )
}

export default App
