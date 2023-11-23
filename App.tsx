import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Container from '@navigation/Container'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Container />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}

export default App