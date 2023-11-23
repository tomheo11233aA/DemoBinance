import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch } from '@hooks/index'
import { delay } from '@method/alert'
import { setShowModalListDay } from '@slice/copyTradeSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { convertDayValue } from './ROI'
import TwoDimensionalColumnChart from './TwoDimensionalColumnChart'

const WeeklyProfit = ({ theme, t, hotTrader, dayChoosed }: any) => {
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        delay(500).then(() => setLoading(false))
    }, [dayChoosed])

    const chartView = hotTrader.chartView.slice(hotTrader.chartView.length - dayChoosed, hotTrader.chartView.length)

    const max = chartView.length < 1 ? 0 : Math.max.apply(Math, chartView.map((item: any) => item.PnL))
    const min = chartView.length < 1 ? 0 : Math.min.apply(Math, chartView.map((item: any) => item.PnL))

    const data: any = {
        indexColumn: {
            max: max,
            min: min,
            total: 6,
            fixed: 1,
        },
        columns: chartView.map((item: any) => item.PnL),
        indexRow: {
            total: 4,
            data: chartView.map((item: any) => item.created_at)
        },
    }
    return (
        <Box marginTop={40}>
            <Box row alignCenter justifySpaceBetween>
                <Txt color={theme.black} size={16} fontFamily={fonts.IBMPM}>
                    {t('Weekly Profit')}
                </Txt>
                <Btn
                    row
                    radius={20}
                    paddingVertical={10}
                    paddingHorizontal={15}
                    backgroundColor={theme.gray2}
                    onPress={() => dispatch(setShowModalListDay(true))}
                >
                    <Txt color={theme.black}>
                        {`${t(convertDayValue(dayChoosed))}  `}
                    </Txt>
                    <Box rotateZ={'90deg'}>
                        <Icon
                            size={12}
                            resizeMode={'contain'}
                            source={require('@images/wallet/right_arrow.png')} />
                    </Box>
                </Btn>
            </Box>

            {!loading &&
                <TwoDimensionalColumnChart
                    indexRow={data.indexRow}
                    columns={data.columns}
                    indexColunm={data.indexColumn}
                />
            }

            <Box row alignEnd justifyEnd marginTop={20}>
                <Box row alignCenter>
                    <Box width={10} height={4} backgroundColor={colors.green2} marginRight={5} />
                    <Txt color={colors.grayBlue} size={12} fontFamily={fonts.IBMPR}>
                        {t('Profit')}
                    </Txt>
                </Box>
                <Box row alignCenter marginLeft={10}>
                    <Box width={10} height={4} backgroundColor={colors.red3} marginRight={5} />
                    <Txt color={colors.grayBlue} size={12} fontFamily={fonts.IBMPR}>
                        {t('Loss')}
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default WeeklyProfit