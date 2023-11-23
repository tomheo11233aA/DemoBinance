import { socketLimitDeposit, useTheme } from '@hooks/index'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import TabCustom from '@reuse/TabCustom'
import { screen } from '@util/screens'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ImageRequireSource, StyleSheet } from 'react-native'
import FuturesStack from './FuturesStack'
import HomeStack from './HomeStack'
import MarketsStack from './MarketsStack'
import TradesStack from './TradesStack'
import WalletStack from './WalletStack'
import { navigationRef } from './navigationRef'

interface ITab {
    name: string;
    component: JSX.Element | any;
    title: string,
    icon: ImageRequireSource,
    iconFocus: ImageRequireSource;
}

const tabs: ITab[] = [
    {
        name: screen.HOME_STACK,
        component: HomeStack,
        title: 'Home',
        icon: require('@images/tab/home2.png'),
        iconFocus: require('@images/tab/home1.png'),
    },
    {
        name: screen.MARKETS_STACK,
        component: MarketsStack,
        title: 'Markets',
        icon: require('@images/tab/market1.png'),
        iconFocus: require('@images/tab/market2.png'),
    },
    {
        name: screen.TRADES_STACK,
        component: TradesStack,
        title: 'Coppy Trade',
        icon: require('@images/tab/trade1.png'),
        iconFocus: require('@images/tab/trade2.png'),
    },
    {
        name: screen.FUTURES_STACK,
        component: FuturesStack,
        title: 'Futures',
        icon: require('@images/tab/future1.png'),
        iconFocus: require('@images/tab/future2.png'),
    },
    {
        name: screen.WALLET_STACK,
        component: WalletStack,
        title: 'Wallets',
        icon: require('@images/tab/wallet1.png'),
        iconFocus: require('@images/tab/wallet2.png'),
    },
]

export const HEIGHT_BOTTOM_TAB = 70

const Tab = createBottomTabNavigator()

const Container = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    socketLimitDeposit()

    return (
        <NavigationContainer ref={navigationRef}>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        paddingTop: 10,
                        borderTopWidth: 0,
                        position: "absolute",
                        height: HEIGHT_BOTTOM_TAB,
                        backgroundColor: theme.bg,
                    }
                }}
            >
                {tabs.map((tab: ITab) =>
                    <Tab.Screen
                        key={tab.name}
                        name={tab.name}
                        component={tab.component}
                        options={{
                            tabBarIcon: ({ focused }: { focused: boolean }): JSX.Element => {
                                return (
                                    focused ?
                                        <TabCustom
                                            icon={tab.iconFocus}
                                            title={t(tab.title)}
                                            forcus={true}
                                        /> :
                                        <TabCustom
                                            icon={tab.icon}
                                            title={t(tab.title)}
                                            forcus={false}
                                        />
                                )
                            }
                        }}
                    />
                )}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Container

export const styles = StyleSheet.create({
    container: {
        left: 0,
        right: 0,
        bottom: 0,
        paddingTop: 10,
        borderTopWidth: 0,
        position: "absolute",
        height: HEIGHT_BOTTOM_TAB,
    },
    noneContainer: {
        display: 'none'
    }
})