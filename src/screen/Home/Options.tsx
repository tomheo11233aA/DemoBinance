import Box from '@commom/Box'
import React from 'react'
import ItemOption from './ItemOption'
import Icon from '@commom/Icon'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import { useTranslation } from 'react-i18next'
import { isLoginUserSelector, profileUserSelector } from '@selector/userSelector'
import { navigate } from '@navigation/navigationRef'
import { screen } from '@util/screens'
import { Profile } from 'src/model/userModel'

const Options = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const isLogin = useAppSelector(isLoginUserSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    const handle = () => {
        if (!isLogin) {
            navigate(screen.LOGIN)
        } else {
            navigate(screen.COMMING_SOON)
        }
    }

    return (
        <Box
            row
            alignStart
            marginTop={30}
            justifySpaceAround
        >
            <ItemOption
                onPress={handle}
                title={t('Binance Academy')}
                icon={require('@images/home/hat.png')}
            />
            <ItemOption
                onPress={() => {
                    if (!isLogin) {
                        navigate(screen.LOGIN)
                    } else {
                        navigate(screen.DEPOSIT_CRYPTO, { coin: { currency: 'USDT' } })
                    }
                }}
                title={t('Deposit')}
                icon={require('@images/home/mail.png')}
            />
            <ItemOption
                onPress={() => {
                    // if (!isLogin) {
                    //     navigate(screen.LOGIN)
                    // } else {
                    //     navigate(screen.EARN)
                    // }
                    handle()
                }}
                title={t('Earn')}
                icon={require('@images/home/pig.png')}
            />
            <ItemOption
                onPress={handle}
                title={t('Referral')}
                icon={require('@images/home/referral.png')}
            />
            <Btn onPress={handle}>
                <Icon
                    source={theme.black === 'black' ?
                        require('@images/home/more.png') :
                        require('@images/home/more-dark.png')
                    }
                    size={42}
                    resizeMode={'contain'}
                />
                <Txt
                    center
                    size={10}
                    marginTop={3}
                    numberOfLines={2}
                    color={theme.black}
                >
                    {t('More')}
                </Txt>
            </Btn>
        </Box>
    )
}

export default Options