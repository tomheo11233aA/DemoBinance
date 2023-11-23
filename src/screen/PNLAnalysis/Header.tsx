import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import Back from '@reuse/Back'
import { getChartStatisticsUser } from '@service/walletService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import PNLToday from './PNLToday'

const MILLISECOND_30DAY = 2_592_000_000
const MILLISECOND_1DAY = 86_400_000
const DAY_IN_WEEK = 7

const Header = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [data, setData] = useState<any>({
        totalRoe7: 0,
        totalPnl7: 0,
        totalRoe30: 0,
        totalPnl30: 0,
    })

    useEffect(() => {
        handleGetChartStatisticsUser()
    }, [])

    const handleGetChartStatisticsUser = async () => {
        const currentDate = new Date()
        const end = currentDate.getTime()
        const start = end - MILLISECOND_30DAY

        const res = await getChartStatisticsUser({
            start,
            end,
        })

        if (!res.status) {
            Alert.alert(t(res.message))
        } else {
            let [totalRoe30, totalPnl30, totalRoe7, totalPnl7] = [0, 0, 0, 0]
            for (let i = 0; i < res.data.length; i++) {
                const roe = res.data[i].ROE
                const pnl = res.data[i].PnL
                totalRoe30 += roe
                totalPnl30 += pnl
                const millisecond = res.data[i].created_at
                if (((end - millisecond) / MILLISECOND_1DAY) < DAY_IN_WEEK) {
                    totalRoe7 += roe
                    totalPnl7 += pnl
                }
            }
            setData({
                totalRoe7,
                totalPnl7,
                totalRoe30,
                totalPnl30,
            })
        }
    }

    return (
        <Box
            borderBottomWidth={4}
            paddingBottom={25}
            paddingHorizontal={15}
            borderColor={theme.gray}
        >
            <Box row justifySpaceBetween alignCenter>
                <Back size={14} />
                <Txt color={theme.black} fontFamily={fonts.IBMPM} size={15}>
                    {t('Analysis of PNL futures contracts')}
                </Txt>
                <Icon
                    size={13}
                    source={require('@images/future/share.png')}
                />
            </Box>

            {/* <Animated.View
                style={{
                    padding: 1,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    backgroundColor: theme.gray2,
                    overflow: 'hidden',
                    borderRadius: 3,
                    marginTop: 20,
                }}
            >
                <Box
                    paddingVertical={5}
                    paddingHorizontal={10}
                    backgroundColor={theme.bg}
                >
                    <Txt color={theme.black} fontFamily={fonts.IBMPM} size={13}>
                        USDⓢ-M
                    </Txt>
                </Box>
                <Box
                    paddingVertical={5}
                    paddingHorizontal={10}
                >
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM} size={13}>
                        COIN-M
                    </Txt>
                </Box>
            </Animated.View> */}

            <PNLToday />

            <Box row marginTop={20}>
                <Box flex={1} alignCenter>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        {t(`PNL for 7 days`)}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M24} marginTop={7} size={16}>
                        {`${numberCommasDot(data?.totalRoe7?.toFixed(2))} %`}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M17} marginTop={7}>
                        {`${numberCommasDot(data?.totalPnl7?.toFixed(2))}`}
                        <Txt color={theme.black} size={11} fontFamily={fonts.IBMPR}>
                            {' USDT'}
                        </Txt>
                    </Txt>
                </Box>

                <Box flex={1} alignCenter>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        {t(`PNL for 30 days`)}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M24} marginTop={7} size={16}>
                        {`${numberCommasDot(data?.totalRoe30?.toFixed(2))} %`}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M17} marginTop={7}>
                        {`${numberCommasDot(data?.totalPnl30?.toFixed(2))}`}
                        <Txt color={theme.black} size={11} fontFamily={fonts.IBMPR}>
                            {' USDT'}
                        </Txt>
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default Header