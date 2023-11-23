import Box from '@commom/Box'
import { colors } from '@theme/colors'
import React from 'react'
import { LineChart } from 'react-native-wagmi-charts'

const Line = ({ item, theme }: any) => {
    const data = item.chartView.map((chart: any) =>
        ({ timestamp: 1625945400000, value: chart.ROE})
    )
    return (
        <Box>
            <LineChart.Provider data={data}>
                <LineChart
                    height={50}
                    width={100}
                >
                    <LineChart.Path width={1.5} color={colors.green2} >
                        <LineChart.Gradient />
                    </LineChart.Path>
                    <LineChart.CursorLine>
                        <LineChart.Tooltip
                            textStyle={{
                                color: theme.black
                            }}
                        />
                    </LineChart.CursorLine>
                </LineChart>
            </LineChart.Provider>
        </Box>
    )
}

export default Line