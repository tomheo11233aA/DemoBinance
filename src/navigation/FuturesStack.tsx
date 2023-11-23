import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Futures from '@screen/Futures'
import FuturesHistory from '@screen/FuturesHistory'
import SharePositions from '@screen/SharePositions'
import TPSL from '@screen/TPSL'
import Trade from '@screen/Trade'
import { screen } from '@util/screens'
import React from 'react'

const Stack = createNativeStackNavigator()

const FuturesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screen.FUTURES} component={Futures} />
      <Stack.Screen name={screen.SHARE_POSITIONS} component={SharePositions} />
      <Stack.Screen name={screen.FUTURES_HISTORY} component={FuturesHistory} />
      <Stack.Screen name={screen.TPSL} component={TPSL} />
      <Stack.Screen name={screen.TRADE} component={Trade} />
    </Stack.Navigator>
  )
}

export default FuturesStack