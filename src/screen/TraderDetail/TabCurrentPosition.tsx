import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { getCoinsFromSocket, useAppSelector } from '@hooks/index'
import { calcPNL, calcROE } from '@method/format'
import { positionToTraderCopyTraderSelector } from '@selector/copyTradeSelector'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

const TabCurrentPosition = ({ theme, t }: any) => {
    const positionToTrader = useAppSelector(positionToTraderCopyTraderSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)

    getCoinsFromSocket()

    return (
        <Box marginTop={10}>
            {positionToTrader.data.map((item, index) => {
                const close = coins.filter((coin) => coin.symbol == item.symbol)[0]?.close || 0
                const PNL = calcPNL(item, close)
                const ROE = calcROE(PNL, item)

                const side = item?.side == 'buy' ? 'Buy' : 'Sell'
                const colorSide = item?.side == 'buy' ? colors.green2 : colors.red3
                const backgroundColorSide = item?.side == 'buy' ? theme.green2 : theme.red2

                return (
                    <Box
                        key={item.id}
                        paddingBottom={20}
                        borderBottomWidth={1}
                        borderColor={theme.gray2}
                    >
                        <Box row>
                            <Box
                                marginRight={10}
                                paddingHorizontal={5}
                                backgroundColor={backgroundColorSide}
                            >
                                <Txt color={colorSide} size={12} fontFamily={fonts.IBMPR}>
                                    {t(side)}
                                </Txt>
                            </Box>
                            <Box paddingHorizontal={5} backgroundColor={theme.gray2}>
                                <Txt color={theme.black} fontFamily={fonts.M24}>
                                    {item?.core}
                                    <Txt color={theme.black} size={12}>x</Txt>
                                </Txt>
                            </Box>
                        </Box>
                        <Box row justifySpaceBetween marginTop={10} alignCenter>
                            <Txt size={12} color={colors.grayBlue} fontFamily={fonts.IBMPR}>
                                ROI
                            </Txt>
                            <Txt
                                fontFamily={fonts.M23}
                                color={ROE >= 0 ? colors.green2 : colors.red3}
                            >
                                {ROE >= 0 ? `+${ROE?.toFixed(2)}` : ROE.toFixed(2)}
                                <Txt
                                    size={12}
                                    fontFamily={fonts.IBMPM}
                                    color={ROE >= 0 ? colors.green2 : colors.red3}
                                >
                                    %
                                </Txt>
                            </Txt>
                        </Box>
                    </Box>
                )
            })}
        </Box>
    )
}

export default TabCurrentPosition