import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Tabs from './src/navigation/Tabs'
import { AuthProvider } from './src/components/AuthContext'
import { StatusBar } from 'react-native'
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
