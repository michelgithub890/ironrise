import React from 'react'
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native'

const { height } = Dimensions.get('window')

const TestScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <View style={{ height: height * 0.20, backgroundColor: 'red' }}>
                {/* Your title and button here */}
                <Text>Titre</Text>
                <Button title="Bouton" onPress={() => {}} />
            </View>
            <View style={{ height: height * 0.10, backgroundColor: 'white' }}>
                {/* Your list here */}
            </View>
            <View style={{ height: height * 0.25, backgroundColor: 'blue' }}>
                {/* Your list here */}
            </View>
            <View style={{ height: height * 0.30, backgroundColor: 'green' }}>
                {/* Your tab navigation here */}
            </View>
            <View style={{ height: height * 0.15, backgroundColor: 'yellow', marginBottom:20 }}>
                {/* Your tab navigation here */}
            </View>
        </View>
    )
}

export default TestScreen
