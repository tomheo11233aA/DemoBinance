import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import { navigate } from '@navigation/navigationRef'
import { showBalanceSelector } from '@selector/userSelector'
import userSlice from '@slice/userSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React, { useEffect, useState } from 'react'

interface Props {
    t: any;
    balance: number;
}

const Balance = ({ balance, t }: Props) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [winingDay, setWiningDay] = useState(0)
    const showBalance = useAppSelector(showBalanceSelector)

    useEffect(() => {
        const date = new Date()
        setWiningDay(date.getDate())
    }, [])

    return (
        <Box paddingHorizontal={20}>
            <Box marginBottom={15} row alignCenter justifySpaceBetween>
                <Box row alignCenter>
                    <Box
                        paddingHorizontal={6}
                        backgroundColor={theme.gray}
                        alignCenter
                        justifyCenter
                        paddingVertical={3}
                        marginRight={10}
                        radius={3}
                    >
                        <Txt fontFamily={fonts.RM} size={12} color={theme.black}>
                            USDⓈ-M
                        </Txt>
                    </Box>
                    <Box>
                        <Txt fontFamily={fonts.RM} size={12} color={colors.gray5}>COIN-M</Txt>
                    </Box>
                </Box>

                <Btn onPress={() => navigate(screen.FUTURES_HISTORY)}>
                    <Icon
                        size={18}
                        resizeMode={'contain'}
                        source={require('@images/future/page-oclock.png')}
                    />
                </Btn>
            </Box>

            <Box row alignCenter>
                <Btn onPress={() => dispatch(userSlice.actions.setShowBalance(!showBalance))}>
                    <Icon
                        size={14}
                        source={showBalance ? require('@images/wallet/eye-open.png') : require('@images/wallet/eye-close.png')}
                    />
                </Btn>
                <Txt size={11} color={theme.black}>{t(` ${t('Total Balance')} `)} </Txt>
                <Box
                    row
                    radius={3}
                    alignCenter
                    padding={3}
                    backgroundColor={theme.gray}
                >
                    <Txt size={10} fontFamily={fonts.IBMPM} color={theme.black}>
                        {'USDT '}
                    </Txt>
                    <Icon
                        source={require('@images/trade/more.png')}
                        size={11}
                    />
                </Box>
            </Box>
            {showBalance ?
                <Box marginTop={9}>
                    <Txt
                        size={27}
                        fontFamily={'Myfont24-Regular'}
                        fontType={'500'}
                        color={theme.black}
                    >
                        {numberCommasDot(balance.toFixed(2))}
                    </Txt>
                    <Txt fontFamily={'Myfont23-Regular'} color={colors.gray5} marginTop={10} size={15}>
                        ≈ {numberCommasDot(balance.toFixed(2))}
                        <Txt color={colors.gray5} size={14} fontFamily={fonts.IBMPR}>{' $'}</Txt>
                    </Txt>
                </Box>
                :
                <>
                    <Txt size={30} marginTop={10} color={theme.white}>******</Txt>
                    <Txt fontFamily={fonts.AS} color={colors.gray5}>******</Txt>
                </>
            }
            <Btn
                row
                alignCenter
                marginTop={15}
                alignSelf={'flex-start'}
                onPress={() => navigate(screen.PNL_ANALYSIS)}
            >
                <Box
                    paddingVertical={5}
                    paddingHorizontal={8}
                    backgroundColor={theme.gray9}
                >
                    <Txt size={9} color={colors.yellowBold}>
                        {t('PNL . analysis')}
                    </Txt>
                </Box>
                <Box
                    backgroundColor={theme.green3}
                    paddingHorizontal={8}
                    paddingVertical={5}
                >
                    <Txt size={9} color={colors.green2}>
                        {`${winingDay} ${t('Winning Days')} >`}
                    </Txt>
                </Box>
            </Btn>
        </Box>
    )
}

export default Balance