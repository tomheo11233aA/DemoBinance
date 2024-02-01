import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Container from '@navigation/Container'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <SafeAreaProvider>
          <Container />
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  )
}

export default App