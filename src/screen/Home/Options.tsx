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
import Recharge from '../../assets/images/svg/recharge.svg'
import { colors } from '@theme/colors'


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
            {/* <ItemOption
                onPress={handle}
                title={t('Binance Academy')}
                icon={require('@images/home/hat.png')}
            /> */}
            <Btn
                width={60}
                alignCenter
                onPress={() => {}}
            >
                <Box
                    width={50}
                    height={50}
                    radius={15}
                    // alignCenter
                    // justifyCenter
                    borderWidth={0.5}
                    borderColor={colors.gray3}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* <Icon
                        source={icon}
                        resizeMode={'contain'}
                        size={size}
                    /> */}
                    <Recharge width={30} height={30} />
                </Box>
                <Txt
                    color={theme.black}
                    numberOfLines={2}
                    size={10}
                    center
                    marginTop={5}
                >
                    {t('Recharge')}
                </Txt>
            </Btn>
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