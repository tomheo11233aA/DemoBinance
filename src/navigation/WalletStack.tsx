import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ChangeBalanceHistory from '@screen/ChangeBalanceHistory'
import CoinList from '@screen/CoinList'
import CoinListWithdraw from '@screen/CoinListWithdraw'
import Convert from '@screen/Convert'
import DepositCrypto from '@screen/DepositCrypto'
import DepositDetail from '@screen/DepositDetail'
import DetailWithdraw from '@screen/DetailWithdraw'
import FuturesHistory from '@screen/FuturesHistory'
import PositionHistoryDetail from '@screen/FuturesHistory/PositionHistoryDetail'
import KYC from '@screen/KYC'
import PNLAnalysis from '@screen/PNLAnalysis'
import SendUSDT from '@screen/SendUSDT'
import SpotCoin from '@screen/SpotCoin'
import TPSL from '@screen/TPSL'
import Wallet from '@screen/Wallet'
import WithdrawCrypto from '@screen/WithdrawCrypto'
import { screen } from '@util/screens'
import React from 'react'

const Stack = createNativeStackNavigator()

const WalletStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={screen.WALLET} component={Wallet} />
        <Stack.Screen name={screen.COIN_LIST} component={CoinList} />
        <Stack.Screen name={screen.DEPOSIT_CRYPTO} component={DepositCrypto} />
        <Stack.Screen name={screen.COIN_LIST_WITHDRAW} component={CoinListWithdraw} />
        <Stack.Screen name={screen.WITHDRAW_CRYPTO} component={WithdrawCrypto} />
        <Stack.Screen name={screen.CONVERT} component={Convert} />
        <Stack.Screen name={screen.SPOT_COIN} component={SpotCoin} />
        <Stack.Screen name={screen.SEND_USDT} component={SendUSDT} />
        <Stack.Screen name={screen.CHANGE_BALANCE_HISTORY} component={ChangeBalanceHistory} />
        <Stack.Screen name={screen.FUTURES_HISTORY} component={FuturesHistory} />
        <Stack.Screen name={screen.TPSL} component={TPSL} />
        <Stack.Screen name={screen.PNL_ANALYSIS} component={PNLAnalysis} />
        <Stack.Screen name={screen.DEPOSIT_DETAIL} component={DepositDetail} />
        <Stack.Screen name={screen.DETAIL_WITHDRAW} component={DetailWithdraw} />
        <Stack.Screen name={screen.POSITION_HISTORY_DETAIL} component={PositionHistoryDetail} />
        <Stack.Screen name={screen.KYC} component={KYC} />
    </Stack.Navigator>
  )
}

export default WalletStack