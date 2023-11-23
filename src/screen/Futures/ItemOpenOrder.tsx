import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { convertTPSL, numberCommasDot } from '@method/format'
import { navigate } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React from 'react'
import { StyleSheet } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { IOpenOrder } from 'src/model/fundingModel'

interface Props {
    t: any;
    theme: any;
    item: IOpenOrder;
    onCancelOpenOrder: Function;
}

const WIDTH = 80

const ItemOpenOrder = ({
    t,
    item,
    theme,
    onCancelOpenOrder,
}: Props) => {
    const side = item.side === 'buy' ? 'Buy' : 'Sell'
    const itemConver = convertTPSL(item, t)

    return (
        <Box
            marginTop={10}
            paddingTop={10}
            borderTopWidth={1}
            key={itemConver.id}
            borderColor={theme.gray2}
        >
            <Box row justifySpaceBetween alignCenter>
                <Txt size={16} fontFamily={fonts.IBMPM} color={theme.black}>
                    {`${itemConver.symbol} ${t('Perpetual')}`}
                </Txt>
                <Txt fontFamily={fonts.M23} color={colors.grayBlue} size={14}>
                    {itemConver.created_at}
                </Txt>
            </Box>
            <Txt
                size={16}
                fontFamily={fonts.IBMPM}
                color={itemConver.side === 'buy' ? colors.green2 : colors.red2}
            >
                {`${itemConver.typeTrade} / ${t(side)}`}
            </Txt >
            <Box paddingLeft={20} marginTop={10} row>
                <CircularProgress
                    value={0}
                    radius={20}
                    valueSuffix='%'
                    activeStrokeWidth={5}
                    inActiveStrokeWidth={5}
                    inActiveStrokeOpacity={0.2}
                    inActiveStrokeColor={colors.gray5}
                    activeStrokeColor={itemConver.side === 'buy' ? colors.green2 : colors.red2}
                />
                <Box marginLeft={15}>
                    {itemConver.amount === 'Close Position' ?
                        <Box row marginTop={5}>
                            <Box width={WIDTH}>
                                <Txt style={styles.textGray}>
                                    {t('Close Position')}
                                </Txt>
                            </Box>
                            <Txt fontFamily={fonts.IBMPR} color={theme.black} size={12}>
                                {t('Yes')}
                            </Txt>
                        </Box>
                        :
                        <Box row>
                            <Box width={WIDTH}>
                                <Txt style={styles.textGray}>
                                    {t('Amount')} (USDT)
                                </Txt>
                            </Box>
                            <Txt fontFamily={fonts.M23} color={theme.black}>
                                {numberCommasDot('0.0')}
                                <Txt color={colors.gray5}>
                                    {' /'} {numberCommasDot(itemConver.amount?.toFixed(1))}
                                </Txt>
                            </Txt>
                        </Box>
                    }

                    <Box row marginTop={5}>
                        <Box width={WIDTH}>
                            <Txt style={styles.textGray}>
                                {t('Price')}
                            </Txt>
                        </Box>
                        <Txt fontFamily={fonts.M23} color={theme.black}>
                            {itemConver?.orderEntryPrice ? numberCommasDot(itemConver?.orderEntryPrice?.toFixed(1)) : '--'}
                        </Txt>
                    </Box>

                    {itemConver.triggerConditionsTP &&
                        <Box row marginTop={5} alignCenter>
                            <Box width={WIDTH}>
                                <Txt style={styles.textGray}>
                                    {t('Conditions')}
                                </Txt>
                            </Box>

                            <Box row alignCenter>
                                <Txt style={[styles.textGray, { color: theme.black }]}>
                                    {itemConver.triggerConditionsTP}
                                </Txt>
                                <Txt fontFamily={fonts.M23} color={theme.black}>
                                    {numberCommasDot(itemConver.TP)}
                                </Txt>
                            </Box>
                        </Box>
                    }

                    {itemConver.triggerConditionsSL &&
                        <Box row marginTop={5} alignCenter>
                            <Box width={WIDTH}>
                                <Txt style={styles.textGray}>
                                    {t('Conditions')}
                                </Txt>
                            </Box>

                            <Box row alignCenter>
                                <Txt style={[styles.textGray, { color: theme.black }]}>
                                    {itemConver.triggerConditionsSL}
                                </Txt>
                                <Txt fontFamily={fonts.M23} color={theme.black}>
                                    {numberCommasDot(itemConver.SL)}
                                </Txt>
                            </Box>
                        </Box>
                    }

                    {itemConver.reducerOnly &&
                        <Box row marginTop={5}>
                            <Box width={WIDTH}>
                                <Txt style={styles.textGray}>
                                    {t('Reduce Only')}
                                </Txt>
                            </Box>
                            <Txt fontFamily={fonts.IBMPR} color={theme.black} size={12}>
                                {t('Yes')}
                            </Txt>
                        </Box>
                    }

                    {(itemConver.showTPSL && (itemConver.TP || itemConver.SL)) &&
                        <Box row marginTop={5}>
                            <Box width={WIDTH}>
                                <Txt style={styles.textGray}>
                                    TP/SL
                                </Txt>
                            </Box>
                            <Btn onPress={() => navigate(screen.TPSL, { itemOpenOrder: item })}>
                                <Txt fontFamily={fonts.IBMPR} color={colors.yellow} size={12}>
                                    {t('View')}
                                </Txt>
                            </Btn>
                        </Box>
                    }
                </Box>

                <Box alignEnd flex={1} justifyEnd>
                    <Btn
                        onPress={() => onCancelOpenOrder(item)}
                        radius={3}
                        paddingVertical={3}
                        paddingHorizontal={7}
                        backgroundColor={theme.gray2}
                    >
                        <Txt fontFamily={fonts.IBMPM} size={12} color={theme.black}>
                            {t('Cancel')}
                        </Txt>
                    </Btn>
                </Box>
            </Box>
        </Box >
    )
}

export default ItemOpenOrder

const styles = StyleSheet.create({
    textGray: {
        fontSize: 12,
        color: colors.gray5,
        fontFamily: fonts.IBMPR,
    }
})