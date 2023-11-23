import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { colorsPie } from '@util/db'
import { width } from '@util/responsive'
import React from 'react'
import PieChart from 'react-native-pie-chart'
import { convertDayValue } from './ROI'
import Btn from '@commom/Btn'
import { useAppDispatch } from '@hooks/index'
import { setShowModalListDay } from '@slice/copyTradeSlice'

const Favorite = ({ theme, t, dayChoosed }: any) => {
    const dispatch = useAppDispatch()
    const series = [123, 321, 123, 789, 537]
    const data = [
        { name: 'STORJ', percent: 46.07, pnl: 653.26, trade: 16 },
        { name: 'BTC', percent: 46.07, pnl: 653.26, trade: 16 },
        { name: 'TRB', percent: 46.07, pnl: 653.26, trade: 16 },
        { name: 'APT', percent: 46.07, pnl: 653.26, trade: 16 },
        { name: 'Others', percent: 46.07, pnl: 653.26, trade: 16 },
    ]

    return (
        <Box marginTop={40}>
            <Box row alignCenter justifySpaceBetween>
                <Txt color={theme.black} size={16} fontFamily={fonts.IBMPM}>
                    {t('Favorite')}
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
                        {t(convertDayValue(dayChoosed))}
                    </Txt>
                    <Box rotateZ={'90deg'}>
                        <Icon
                            size={12}
                            resizeMode={'contain'}
                            source={require('@images/wallet/right_arrow.png')} />
                    </Box>
                </Btn>
            </Box>

            <Box alignCenter marginTop={20}>
                <PieChart
                    series={series}
                    coverFill={'#FFF'}
                    sliceColor={colorsPie}
                    widthAndHeight={width / 2.5}
                />
            </Box>

            <Box
                row
                marginTop={40}
                borderBottomWidth={1}
                borderColor={theme.gray2}
                paddingVertical={10}
            >
                <Box flex={1}>
                    <Txt color={colors.grayBlue} size={12} fontFamily={fonts.IBMPR}>
                        {t('Trading Pair')}
                    </Txt>
                </Box>
                <Box flex={1}>
                    <Txt color={colors.grayBlue} size={12} fontFamily={fonts.IBMPR}>
                        {t('Ratio')}
                    </Txt>
                </Box>
                <Box flex={1} alignEnd>
                    <Txt color={colors.grayBlue} size={12} fontFamily={fonts.IBMPR}>
                        {t('PnL')}
                    </Txt>
                </Box>
            </Box>
            {data.map((item, index) =>
                <Box
                    row
                    key={item.name}
                    borderBottomWidth={1}
                    borderColor={theme.gray2}
                    paddingVertical={10}
                    alignCenter
                >
                    <Box flex={1} row alignCenter>
                        <Box
                            width={7}
                            height={7}
                            radius={50}
                            marginRight={5}
                            backgroundColor={colorsPie[index]}
                        />
                        <Txt color={theme.black} size={12} fontFamily={fonts.IBMPM}>
                            {/* {item.name} */} --
                        </Txt>
                    </Box>
                    <Box flex={1}>
                        <Txt color={theme.black} fontFamily={fonts.M23}>
                            {/* {item.percent}% */} --
                        </Txt>
                        <Txt color={colors.grayBlue} fontFamily={fonts.M23} marginTop={5}>
                            {/* {item.trade} */} --
                            <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                                {/* Traders */}
                            </Txt>
                        </Txt>
                    </Box>
                    <Box flex={1} alignEnd>
                        <Txt
                            color={colors.green2}
                            fontFamily={fonts.M24}
                        >
                            {/* +{item.pnl} */} --
                        </Txt>
                    </Box>
                </Box>
            )}
        </Box>
    )
}

export default Favorite