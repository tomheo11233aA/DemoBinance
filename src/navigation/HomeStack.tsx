import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountInfo from '@screen/AccountInfo'
import Appearance from '@screen/Appearance'
import ChangeLanguage from '@screen/ChangeLanguage'
import ChangePassword from '@screen/ChangePassword'
import ComingSoon from '@screen/ComingSoon'
import Deposit from '@screen/Deposit'
import DepositCrypto from '@screen/DepositCrypto'
import DepositVND from '@screen/DepositVND'
import Earn from '@screen/Earn'
import ForgotPassword from '@screen/ForgotPassword'
import Hello from '@screen/Hello'
import Home from '@screen/Home'
import KYC from '@screen/KYC'
import Login from '@screen/Login'
import P2pTab from '@screen/P2pTab'
import PI from '@screen/PI.tsx'
import Profile from '@screen/Profile'
import Setting from '@screen/Setting'
import SignUp from '@screen/SignUp'
import SpotCoin from '@screen/SpotCoin'
import Trade from '@screen/Trade'
import Transfer from '@screen/Transfer'
import TwoFA from '@screen/TwoFA'
import Withdraw from '@screen/Withdraw'
import { screen } from '@util/screens'
import React from 'react'

const Stack = createNativeStackNavigator()

const HomeStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screen.HELLO} component={Hello} />
            <Stack.Screen name={screen.HOME} component={Home} />
            <Stack.Screen name={screen.LOGIN} component={Login} />
            <Stack.Screen name={screen.PROFILE} component={Profile} />
            <Stack.Screen name={screen.DEPOSIT} component={Deposit} />
            <Stack.Screen name={screen.TRADE} component={Trade} />
            <Stack.Screen name={screen.WITHDRAW} component={Withdraw} />
            <Stack.Screen name={screen.TRANSFER} component={Transfer} />
            <Stack.Screen name={screen.ACCOUNT_INFO} component={AccountInfo} />
            <Stack.Screen name={screen.SETTING} component={Setting} />
            <Stack.Screen name={screen.APPEARANCE} component={Appearance} />
            <Stack.Screen name={screen.P2P_TAB} component={P2pTab} />
            <Stack.Screen name={screen.CHANGE_LANGUAGE} component={ChangeLanguage} />
            <Stack.Screen name={screen.KYC} component={KYC} />
            <Stack.Screen name={screen.SIGN_UP} component={SignUp} />
            <Stack.Screen name={screen.TWO_FA} component={TwoFA} />
            <Stack.Screen name={screen.DEPOSIT_VND} component={DepositVND} />
            <Stack.Screen name={screen.EARN} component={Earn} />
            <Stack.Screen name={screen.COMMING_SOON} component={ComingSoon} />
            <Stack.Screen name={screen.CHANGE_PASSWORD} component={ChangePassword} />
            <Stack.Screen name={screen.FORGOT_PASSWORD} component={ForgotPassword} />
            <Stack.Screen name={screen.DEPOSIT_CRYPTO} component={DepositCrypto} />
            <Stack.Screen name={screen.PI} component={PI} />
        </Stack.Navigator>
    )
}

export default HomeStack