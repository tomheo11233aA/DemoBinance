import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Options = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const options = [
        {
            title: 'ETH Staking',
            icon: require('@images/p2p/coin.png'),
        },
        {
            title: 'Simple Earn',
            icon: require('@images/p2p/cointwo.png'),
        },
        {
            title: 'BNB Vault',
            icon: require('@images/p2p/coinsquare.png'),
        },
        {
            title: 'Auto-Invest',
            icon: require('@images/p2p/coinround.png'),
        },
        {
            title: 'Earn Wallet',
            icon: require('@images/tab/wallet2.png'),
        },
    ]

    return (
        <Box
            row
            alignCenter
            marginTop={10}
            paddingTop={20}
            paddingBottom={20}
            justifySpaceAround
            borderBottomWidth={5}
            borderColor={theme.gray2}
        >
            {options.map((option) =>
                <Box
                    alignCenter
                    key={option.title}
                >
                    <Icon
                        size={20}
                        marginBottom={10}
                        source={option.icon}
                        resizeMode={'contain'}
                    />
                    <Txt color={theme.black} size={11} fontFamily={fonts.IBMPR}>
                        {t(option.title)}
                    </Txt>
                </Box>
            )}
        </Box>
    )
}

export default Options