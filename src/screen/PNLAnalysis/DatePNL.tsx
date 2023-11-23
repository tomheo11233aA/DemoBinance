import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { fonts } from '@theme/fonts'
import React, { useEffect } from 'react'
import ItemUSDT from './ItemUSDT'
import { chartStatisticsUserSelector } from '@selector/fundingSelector'
import { colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { getChartStatisticsUserThunk } from '@asyncThunk/fundingAsyncThunk'
import { Alert } from 'react-native'
import { IChartStatisticsUser } from 'src/model/fundingModel'

const DatePNL = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const chartStatisticsUser = useAppSelector(chartStatisticsUserSelector)

    const dates = [
        { number: '7 ', title: 'day', value: '7day', miliSecond: 604_800_000 },
        { number: '1 ', title: 'month', value: '1month', miliSecond: 2_629_746_000 },
        { number: '3 ', title: 'month', value: '3month', miliSecond: 7_889_238_000 },
        { number: '1 ', title: 'year', value: '1year', miliSecond: 31_556_952_000 },
    ]

    useEffect(() => {
        handleGetChartStatisticsUser(dates[0])
    }, [])

    const handleGetChartStatisticsUser = async (date: any) => {
        const currentDate = new Date()
        const end = currentDate.getTime()
        const start = end - date.miliSecond
        const { payload } = await dispatch(getChartStatisticsUserThunk({
            start,
            end,
            day: date.value,
        }))
        if (!payload.status) {
            Alert.alert(t(payload.message))
        }
    }

    const totalPNL = chartStatisticsUser.data.reduce((total, item: IChartStatisticsUser) => {
        return total + item.PnL;
    }, 0);
    const totalProfit = Math.max(totalPNL, 0)
    const totalLoss = Math.min(0, totalPNL)
    let netProfitLoss = 0
    if (totalProfit > 0) {
        netProfitLoss = totalProfit
    } else if (totalLoss > 0) {
        netProfitLoss = totalLoss
    } else if (totalProfit == 0 && totalLoss == 0) {
        netProfitLoss = 0
    }

    return (
        <Box paddingHorizontal={15}>
            <Box row paddingVertical={10} alignCenter>
                <Box row flex={1} justifySpaceBetween>
                    {dates.map((date) => {
                        const color = chartStatisticsUser.day == date.value ? theme.black : colors.grayBlue
                        const bg = chartStatisticsUser.day == date.value ? theme.gray : theme.gray2
                        return (
                            <Btn
                                row
                                radius={2}
                                alignCenter
                                key={date.value}
                                paddingVertical={5}
                                backgroundColor={bg}
                                paddingHorizontal={15}
                                onPress={() => handleGetChartStatisticsUser(date)}
                            >
                                <Txt
                                    color={color}
                                    fontFamily={fonts.M24}
                                    marginBottom={-2}
                                    size={15}
                                >
                                    {date.number}
                                </Txt>
                                <Txt
                                    color={color}
                                    fontFamily={fonts.IBMPM}
                                >
                                    {t(date.title)}
                                </Txt>
                            </Btn>
                        )
                    })}
                </Box>
                <Icon
                    size={15}
                    marginLeft={15}
                    source={require('@images/wallet/gift.png')}
                />
            </Box>
            <Box marginTop={10}>
                <ItemUSDT
                    value={totalProfit}
                    title={'Total profit'}
                />
                <ItemUSDT
                    value={totalLoss}
                    title={'Total loss'}
                />
                <ItemUSDT
                    value={netProfitLoss}
                    title={'Net profit/loss'}
                />
            </Box>
            <Box rotateZ={'90deg'} alignSelf={'center'} marginTop={20}>
                <Icon
                    size={12}
                    resizeMode={'contain'}
                    source={require('@images/wallet/right_arrow.png')}
                />
            </Box>
        </Box>
    )
}

export default DatePNL