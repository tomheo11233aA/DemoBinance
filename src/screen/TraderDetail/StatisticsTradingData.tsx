import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import BoxLine from '@reuse/BoxLine'
import { setShowModalListDay } from '@slice/copyTradeSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import RowItem from './RowItem'

const StatisticsTradingData = ({ theme, t, hotTrader, dayChoosed }: any) => {
    const dispatch = useAppDispatch()
    const [seeMore, setSeeMore] = useState(false)

    const calcROI = (field: string) => {
        const chartView = hotTrader.chartView.slice(hotTrader.chartView.length - dayChoosed, hotTrader.chartView.length)
        const lastROI = chartView.reduce((total: number, item: any) => {
            return total + item[field]
        }, 0)

        return lastROI
    }

    let lastROE = calcROI('ROE')
    const colorLastROE = lastROE >= 0 ? colors.green2 : colors.red3
    lastROE = lastROE >= 0 ?
        `+${numberCommasDot(lastROE?.toFixed(2))}` :
        `${numberCommasDot(lastROE?.toFixed(2))}`

    let cumulativePnL = calcROI('PnL')
    const colorPnL = cumulativePnL >= 0 ? colors.green2 : colors.red3
    cumulativePnL = cumulativePnL >= 0 ?
        `+${numberCommasDot(cumulativePnL?.toFixed(2))}` :
        `${numberCommasDot(cumulativePnL?.toFixed(2))}`

    const convertDayValue = () => {
        switch (dayChoosed) {
            case 7: return 'Last 7D ROI';
            case 30: return 'Last 30D ROI';
            case 90: return 'Last 90D ROI';
            case 180: return 'Last 180D ROI';
            default: return 'Last 7D ROI'
        }
    }

    return (
        <Box>
            <Box row alignCenter justifySpaceBetween marginTop={20}>
                <Box>
                    <Btn
                        row
                        onPress={() => dispatch(setShowModalListDay(true))}
                        alignCenter={false}
                    >
                        <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                            {t(convertDayValue())}
                        </Txt>
                        <Box rotateZ={'90deg'}>
                            <Icon
                                size={10}
                                resizeMode={'contain'}
                                tintColor={theme.black}
                                source={require('@images/wallet/right_arrow.png')}
                            />
                        </Box>
                    </Btn>
                    <Box row alignCenter>
                        <BoxLine
                            title={lastROE}
                            color={colorLastROE}
                            borderColor={colorLastROE}
                            font={fonts.M24}
                            size2={18}
                            size={18}
                            paddingText={5}
                            marginTop={10}
                        />
                        <Txt
                            marginTop={3}
                            marginLeft={0}
                            fontFamily={fonts.IBMPM}
                            color={colorLastROE}
                        >
                            {'%'}
                        </Txt>
                    </Box>
                </Box>

                <Box alignEnd>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        {t('Cumulative PnL')}
                    </Txt>
                    <BoxLine
                        title={cumulativePnL}
                        color={colorPnL}
                        borderColor={colorPnL}
                        font={fonts.M24}
                        size2={18}
                        size={18}
                        paddingText={5}
                        marginTop={10}
                    />
                </Box>
            </Box>

            <RowItem
                marginTop={20}
                colorValue={theme.black}
                title={t('Account Assets')}
                value={'--'}
            />
            <RowItem
                marginTop={15}
                colorValue={3.78 >= 0 ? colors.green2 : colors.red3}
                title={t('Copier Profit')}
                value={`--`}
            />
            <RowItem
                marginTop={15}
                colorValue={theme.black}
                title={t('Copiers')}
                value={hotTrader.userCopy}
            />
            <Box
                row
                alignCenter
                marginTop={15}
                justifySpaceBetween
                borderBottomWidth={seeMore ? 1 : 0}
                paddingBottom={15}
                borderColor={theme.gray2}
            >
                <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                    {t('Risk')}
                </Txt>

                <Box
                    radius={5}
                    padding={3}
                    borderWidth={1}
                    borderColor={colors.yellow}
                    backgroundColor={theme.yellow7}
                >
                    <Txt color={colors.yellow} fontFamily={fonts.M23} size={13}>
                        --
                    </Txt>
                </Box>
            </Box>

            {/* {seeMore &&
                <Box
                    paddingBottom={10}
                    borderColor={theme.gray2}
                >
                    <RowItem
                        value={'--'}
                        marginTop={15}
                        title={t('Win Ratio')}
                        colorValue={theme.black}
                    />

                    <RowItem
                        value={'--'}
                        marginTop={15}
                        title={t('Total Transactions')}
                        colorValue={theme.black}
                    />

                    <RowItem
                        value={'--'}
                        marginTop={15}
                        title={t('No. of Winning Trades')}
                        colorValue={theme.black}
                    />

                    <RowItem
                        value={'--'}
                        marginTop={15}
                        title={t('No. of Losing Trades')}
                        colorValue={theme.black}
                    />

                    <RowItem
                        value={'--'}
                        marginTop={15}
                        title={t('Average Profit')}
                        colorValue={theme.black}
                    />

                    <RowItem
                        value={'--'}
                        marginTop={15}
                        title={t('Average Losses')}
                        colorValue={theme.black}
                    />

                    <RowItem
                        value={'--'}
                        marginTop={15}
                        title={t('PnL Ratio')}
                        colorValue={theme.black}
                    />

                    <Box row alignCenter justifySpaceBetween marginTop={15}>
                        <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                            {t('Average Holding Time')}
                        </Txt>
                        <Txt color={theme.black} size={11}>
                            {'--'}
                        </Txt>
                    </Box>

                    <Box row alignCenter justifySpaceBetween marginTop={15}>
                        <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                            {t('Trade Days')}
                        </Txt>
                        <Txt color={theme.black} size={11}>
                            {'--'}
                        </Txt>
                    </Box>

                    <RowItem
                        marginTop={15}
                        colorValue={theme.black}
                        value={'--'}
                        title={t('Last Trading Time')}
                    />
                </Box>
            } */}

            {/* <Btn onPress={() => setSeeMore(!seeMore)}>
                <Box rotateZ={seeMore ? '-90deg' : '90deg'} alignSelf={'center'} marginTop={20}>
                    <Icon
                        size={10}
                        resizeMode={'contain'}
                        tintColor={theme.black}
                        source={require('@images/wallet/right_arrow.png')}
                    />
                </Box>
            </Btn> */}

            <Box
                borderTopWidth={1}
                marginTop={20}
                borderColor={theme.gray2}
            >
                <Txt marginTop={15} color={colors.grayBlue} size={12} fontFamily={fonts.IBMPR}>
                    {`${t('Currency Unit')}: USDT`}
                </Txt>

                <Box row>
                    <BoxLine
                        title={`${t('Profit Share Ratio')}: `}
                        color={colors.grayBlue}
                        borderColor={colors.grayBlue}
                        font={fonts.IBMPR}
                        size2={12}
                        size={12}
                        paddingText={4}
                        marginTop={10}
                    />
                    <BoxLine
                        title={'10.00%'}
                        color={colors.grayBlue}
                        borderColor={colors.grayBlue}
                        font={fonts.M23}
                        size2={13}
                        size={13}
                        paddingText={6}
                        marginTop={10}
                    />
                </Box>

                <Box row alignCenter marginTop={10}>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        {`${t('Update Time')}: `}
                    </Txt>
                    <Txt color={colors.grayBlue} fontFamily={fonts.M23}>
                        {t('2023/10/09 08:51:07')}
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default StatisticsTradingData