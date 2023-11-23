import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Markets from '@screen/Markets'
import { screen } from '@util/screens'
import React from 'react'

const Stack = createNativeStackNavigator()

const MarketsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screen.MARKETS} component={Markets} />
    </Stack.Navigator>
  )
}

export default MarketsStack