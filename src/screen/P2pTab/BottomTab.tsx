import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { bottomP2pSelector } from '@selector/p2pSelector'
import { setBottomTab } from '@slice/p2pSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const BottomTab = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const bottomTab = useAppSelector(bottomP2pSelector)

    const tabs = [
        {
            title: 'P2P',
            value: 'p2p',
            img: require('@images/p2p/twopeople.png'),
            onPres: () => {

            },
        },
        {
            title: 'Orders',
            value: 'orders',
            img: require('@images/future/page.png'),
            onPres: () => {

            },
        },
        {
            title: 'Ads',
            value: 'ads',
            img: require('@images/p2p/speaker.png'),
            onPres: () => {

            },
        },
        {
            title: 'Profile',
            value: 'profile',
            img: require('@images/profile/user.png'),
            onPres: () => {

            },
        },
    ]

    const handleSetBottomTab = (tab: any) => {
        dispatch(setBottomTab(tab.value))
    }

    return (
        <Box
            row
            height={80}
            justifySpaceAround
            paddingVertical={10}
            backgroundColor={theme.bg}
        >
            {tabs.map((tab) =>
                <Tab
                    t={t}
                    tab={tab}
                    theme={theme}
                    key={tab.value}
                    bottomTab={bottomTab}
                    onSetBottomTab={handleSetBottomTab}
                />
            )}
        </Box>
    )
}

const Tab = ({
    t,
    tab,
    theme,
    bottomTab,
    onSetBottomTab,
}: any) => {
    return (
        <Btn
            justifyStart
            onPress={() => onSetBottomTab(tab)}
        >
            <Icon
                size={16}
                source={tab.img}
                resizeMode={'contain'}
                marginBottom={5}
                tintColor={bottomTab === tab.value ? theme.black : colors.gray9}
            />
            <Txt
                size={12}
                fontFamily={fonts.IBMPR}
                color={bottomTab === tab.value ? theme.black : colors.gray9}
            >
                {t(tab.title)}
            </Txt>
        </Btn>
    )
}

export default BottomTab