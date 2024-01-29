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
import Referal from '../../assets/images/svg/referal.svg'
import Bot from '../../assets/images/svg/bot.svg'
import Pig from '../../assets/images/svg/pig.svg'
import More from '../../assets/images/svg/more.svg'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'


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
        <>
            <Box
                row
                alignStart
                marginTop={30}
                justifySpaceAround
            >
                <Btn
                    width={60}
                    alignCenter
                    onPress={() => {
                        if (!isLogin) {
                            navigate(screen.LOGIN)
                        } else {
                            navigate(screen.DEPOSIT_CRYPTO, { coin: { currency: 'USDT' } })
                        }
                    }}
                >
                    <Box
                        width={50}
                        height={50}
                        radius={15}
                        borderWidth={0.5}
                        borderColor={colors.gray3}
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <Recharge width={30} height={30} style={{
                            alignSelf: 'center',
                            marginLeft: 5,
                            marginTop: 5
                        }} />
                    </Box>
                    <Txt
                        color={theme.black}
                        numberOfLines={2}
                        size={10}
                        center
                        marginTop={5}
                        fontFamily={fonts.BNPR}
                    >
                        {t('Recharge')}
                    </Txt>
                </Btn>
                <Btn
                    width={60}
                    alignCenter
                    onPress={() => {
                        navigate(screen.COMMING_SOON)
                    }}
                >
                    <Box
                        width={50}
                        height={50}
                        radius={15}
                        borderWidth={0.5}
                        borderColor={colors.gray3}
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <Referal width={30} height={30} style={{
                            alignSelf: 'center',
                            marginLeft: 5,
                        }} />
                    </Box>
                    <Txt
                        color={theme.black}
                        numberOfLines={2}
                        size={10}
                        center
                        marginTop={5}
                        fontFamily={fonts.BNPR}
                    >
                        {t('Referral')}
                    </Txt>
                </Btn>
                <Btn
                    width={60}
                    alignCenter
                    onPress={() => {
                        navigate(screen.COMMING_SOON)
                    }}
                >
                    <Box
                        width={50}
                        height={50}
                        radius={15}
                        borderWidth={0.5}
                        borderColor={colors.gray3}
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <Bot width={30} height={30} style={{
                            alignSelf: 'center',
                            marginLeft: 5,
                            marginTop: 5
                        }} />
                    </Box>
                    <Txt
                        color={theme.black}
                        numberOfLines={2}
                        size={10}
                        center
                        marginTop={5}
                        fontFamily={fonts.BNPR}
                    >
                        {t('Bot Trading')}
                    </Txt>
                </Btn>
                <Btn
                    width={60}
                    alignCenter
                    onPress={() => {
                        handle()
                    }}
                >
                    <Box
                        width={50}
                        height={50}
                        radius={15}
                        borderWidth={0.5}
                        borderColor={colors.gray3}
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <Pig width={30} height={30} style={{
                            alignSelf: 'center',
                        }} />
                    </Box>
                    <Txt
                        color={theme.black}
                        numberOfLines={2}
                        size={10}
                        center
                        marginTop={5}
                        fontFamily={fonts.BNPR}
                    >
                        {t('Earn')}
                    </Txt>
                </Btn>

            </Box>
            <Box
                row
                marginTop={15}
                alignStart
                marginLeft={20}
            >
                <Btn
                    width={60}
                    alignCenter
                    onPress={() => {
                        handle()
                    }}
                >
                    <Box
                        width={50}
                        height={50}
                        radius={15}
                        borderWidth={0.5}
                        borderColor={colors.gray3}
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <Icon
                            source={require('@images/myHome/live.png')}
                            size={30}
                            resizeMode={'contain'}
                            style={{
                                alignSelf: 'center',
                            }}
                        />
                    </Box>
                    <Txt
                        color={theme.black}
                        numberOfLines={2}
                        size={10}
                        center
                        marginTop={5}
                        fontFamily={fonts.BNPR}
                    >
                        {t('Live')}
                    </Txt>
                </Btn>
                <Btn
                    width={60}
                    alignCenter
                    onPress={() => {
                        navigate(screen.COMMING_SOON)
                    }}
                    marginLeft={40}
                >
                    <Box
                        width={50}
                        height={50}
                        radius={15}
                        borderWidth={0.5}
                        borderColor={colors.gray3}
                        style={{
                            justifyContent: 'center',
                        }}
                    >
                        <More width={20} height={20} style={{
                            alignSelf: 'center',
                        }} />
                    </Box>
                    <Txt
                        color={theme.black}
                        numberOfLines={2}
                        size={10}
                        center
                        marginTop={5}
                        fontFamily={fonts.BNPR}
                    >
                        {t('More')}
                    </Txt>
                </Btn>
            </Box>
        </>
    )
}

export default Options