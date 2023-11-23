import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ConvertTrades from '@screen/ConvertTrades'
import CopyTrade from '@screen/CopyTrade'
import FuturesHistory from '@screen/FuturesHistory'
import HistoryCopyTrader from '@screen/HistoryCopyTrader'
import HotTeller from '@screen/HotTeller'
import P2pTab from '@screen/P2pTab'
import SignUpTrader from '@screen/SignUpTrader'
import TraderDetail from '@screen/TraderDetail'
import Trades from '@screen/Trades'
import { screen } from '@util/screens'
import React from 'react'

const Stack = createNativeStackNavigator()

const TradesStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screen.HOT_TELLER} component={HotTeller} />
      <Stack.Screen name={screen.TRADER_DETAIL} component={TraderDetail} />
      <Stack.Screen name={screen.COPY_TRADE} component={CopyTrade} />
      <Stack.Screen name={screen.SIGN_UP_TRADER} component={SignUpTrader} />
      <Stack.Screen name={screen.TRADES} component={Trades} />
      <Stack.Screen name={screen.FUTURES_HISTORY} component={FuturesHistory} />
      <Stack.Screen name={screen.P2P_TAB} component={P2pTab} />
      <Stack.Screen name={screen.CONVERT_TRADES} component={ConvertTrades} />
      <Stack.Screen name={screen.HISTORY_COPY_TRADER} component={HistoryCopyTrader} />
    </Stack.Navigator>
  )
}

export default TradesStack