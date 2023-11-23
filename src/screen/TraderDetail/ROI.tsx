import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch } from '@hooks/index'
import { delay } from '@method/alert'
import { setShowModalListDay } from '@slice/copyTradeSlice'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import LineChartROI from './LineChartROI'

export const convertDayValue = (dayChoosed: number) => {
    switch (dayChoosed) {
        case 7: return 'Last 7D';
        case 30: return 'Last 30D';
        case 90: return 'Last 90D';
        case 180: return 'Last 180D';
        default: return 'Last 7D';
    }
}

const ROI = ({ theme, t, hotTrader, dayChoosed }: any) => {
    const dispatch = useAppDispatch()

    const [tabChoosed, setTabChoosed] = useState<string>('ROI')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        delay(500).then(() => setLoading(false))
    }, [dayChoosed])

    const chartView = hotTrader.chartView.slice(hotTrader.chartView.length - dayChoosed, hotTrader.chartView.length)

    const max = chartView.length < 1 ? 0 : Math.max.apply(Math, chartView.map((item: any) => item.ROE))
    const min = chartView.length < 1 ? 0 : Math.min.apply(Math, chartView.map((item: any) => item.ROE))

    const data: any = {
        indexColumn: {
            max: max <= 0 ? 2 : max,
            min: min,
            total: 5,
            fixed: 2,
        },
        lineYellow: chartView.map((item: any) => item.ROE),
        indexRow: {
            total: 2,
            data: chartView.map((item: any) => item.created_at)
        }
    }

    const tabs = ['ROI', 'Cumulative PnL', 'Account Assets']

    return (
        <Box>
            <Box row alignCenter justifySpaceBetween>
                <Txt color={theme.black} size={16} fontFamily={fonts.IBMPM}>
                    ROI
                </Txt>
                <Btn
                    onPress={() => dispatch(setShowModalListDay(true))}
                    row
                    radius={20}
                    paddingVertical={10}
                    paddingHorizontal={15}
                    backgroundColor={theme.gray2}
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
                <LineChartROI
                    indexRow={data.indexRow}
                    lineYellow={data.lineYellow}
                    indexColunm={data.indexColumn}
                />
            }

            <Box row alignCenter marginTop={20}>
                {tabs.map((tab) =>
                    <Btn
                        key={tab}
                        radius={20}
                        paddingVertical={5}
                        paddingHorizontal={10}
                        backgroundColor={tab == tabChoosed ? theme.gray2 : theme.bg}
                    >
                        <Txt color={theme.black} size={12} fontFamily={fonts.IBMPR}>
                            {t(tab)}
                        </Txt>
                    </Btn>
                )}
            </Box>
        </Box>
    )
}

export default ROI