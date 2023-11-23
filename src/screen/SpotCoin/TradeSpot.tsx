import Box from "@commom/Box";
import Txt from "@commom/Txt";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import { numberCommasDot } from "@method/format";
import { coinsFuturesChartSelector } from "@selector/futuresSelector";
import futuresSlice from "@slice/futuresSlice";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import contants from "@util/contants";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { ICoins } from "src/model/futuresModel";

const data = [
    {
        name: 'BTC/USDT',
        value: '26.780,98',
        percent: '-3,18',
    },
    {
        name: 'ETH/USDT',
        value: '1.853,83',
        percent: '-2,31',
    },
    {
        name: 'XRP/USDT',
        value: '0,5083',
        percent: '-3,43',
    },
]

export default ({ theme, t }: any) => {
    const dispatch = useAppDispatch()
    const coins = useAppSelector(coinsFuturesChartSelector)
    useEffect((): any => {
        const newSocket = io(contants.HOSTING)

        newSocket.on('listCoin', (coins: ICoins[]) => {
            if (coins) {
                dispatch(futuresSlice.actions.setCoins(coins))
            }
        })

        return () => newSocket.disconnect()
    }, [])

    return (
        <Box marginTop={20}>
            <Box row alignCenter justifySpaceBetween>
                <Txt fontFamily={fonts.IBMPM} size={13} color={theme.black}>
                    {t('Spot Trade')}
                </Txt>
                <Txt size={12} fontFamily={fonts.IBMPM} color={colors.yellow}>
                    {t('More')}
                </Txt>
            </Box>

            <Box row justifySpaceBetween>
                {coins.slice(0, 3).map((item, index) =>
                    <Box
                        backgroundColor={theme.gray3}
                        paddingHorizontal={10}
                        paddingVertical={15}
                        marginTop={15}
                        radius={5}
                        key={item?.currency}
                        flex={1}
                        marginHorizontal={index === 1 ? 5 : 0}
                    >
                        <Txt size={11} fontFamily={fonts.SGM} color={colors.grayBlue2}>
                            {item?.currency + '/USDT'}
                        </Txt>
                        <Txt marginVertical={5} fontFamily={fonts.M24} size={15} color={theme.black}>
                            {numberCommasDot(item?.close?.toFixed(2))}
                        </Txt>
                        <Txt
                            fontFamily={fonts.M24}
                            size={15}
                            color={item?.percentChange >= 0 ? colors.green2 : colors.red3}
                        >
                            {numberCommasDot(item?.percentChange?.toFixed(2))}
                            <Txt
                                color={item?.percentChange >= 0 ? colors.green2 : colors.red3}
                            >
                                %
                            </Txt>
                        </Txt>
                    </Box>
                )}
            </Box>
        </Box >
    )
}
