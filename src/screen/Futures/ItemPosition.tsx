import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { capitalizeFirst, converPostirions, numberCommasDot } from '@method/format'
import { navigate } from '@navigation/navigationRef'
import BoxLine from '@reuse/BoxLine'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React from 'react'
import { StyleSheet } from 'react-native'
import { ICoins, IPositions } from 'src/model/futuresModel'
import { Profile } from 'src/model/userModel'

interface Props {
    t: any;
    theme: any;
    coins: ICoins[];
    profile: Profile;
    item: IPositions;
    onMoveOnTrade?: Function;
    onClosePosition?: Function;
    onSetClosePosition?: Function;
    onSetShowModalCore?: Function;
    onShowModalStopProfit?: Function;
    onShowModalTPSLPosition?: Function;
}

const ItemPosition = ({
    t,
    coins,
    theme,
    profile,
    onMoveOnTrade,
    item: position,
    onClosePosition,
    onSetClosePosition,
    onSetShowModalCore,
    onShowModalStopProfit,
    onShowModalTPSLPosition,
}: Props) => {

    position = converPostirions(position, coins, profile.balance)
    return (
        <Box
            marginTop={10}
            paddingTop={10}
            borderTopWidth={1}
            borderColor={theme.gray}
        >
            <Box row justifySpaceBetween alignCenter>
                <Box row alignCenter>
                    <Btn
                        row
                        alignCenter
                        disabled={!onMoveOnTrade}
                        onPress={() => onMoveOnTrade && onMoveOnTrade(position)}
                    >
                        <Box
                            width={20}
                            height={20}
                            alignCenter
                            justifyCenter
                            marginRight={10}
                            backgroundColor={position?.side === 'buy' ? colors.green2 : colors.red3}
                        >
                            <Txt color={colors.white} size={13}>
                                {capitalizeFirst(position?.side?.charAt(0))}
                            </Txt>
                        </Box>
                        <Txt size={16} fontFamily={fonts.SGM} color={theme.black}>
                            {`${position.symbol} ${t('Perpetual')}`}
                        </Txt>
                    </Btn>

                    <Txt size={12} fontFamily={fonts.RM} color={colors.gray5} marginLeft={10}>
                        {capitalizeFirst(position.regime)}
                    </Txt>
                    <Txt size={12} fontFamily={fonts.AS} color={colors.gray5} marginLeft={5}>
                        {position.core}X
                    </Txt>
                    <Txt size={28} marginBottom={-10} marginLeft={7} color={colors.gray5}>
                        <Txt size={28} color={colors.greenCan}>ᵎ</Txt>ᵎᵎᵎ
                    </Txt>
                </Box>

                <Btn onPress={() => {
                    if (onSetClosePosition) {
                        navigate(screen.SHARE_POSITIONS,
                            {
                                position: {
                                    ...position,
                                    roe: position?.ROE,
                                    liq_price: position?.LIQ_PRICE,
                                }
                            }
                        )
                    }
                }}
                >
                    <Icon
                        source={require('@images/future/share.png')}
                        size={17}
                    />
                </Btn>
            </Box>

            <Box row justifySpaceBetween marginVertical={10}>
                <Box>
                    <BoxLine title={`PNL (USDT)`} size={12} />
                    <Txt
                        marginTop={7}
                        size={21}
                        fontFamily={'Myfont24-Regular'}
                        color={position?.PNL >= 0 ? colors.green2 : colors.red3}
                    >
                        {numberCommasDot(position?.PNL?.toFixed(2))}
                    </Txt>
                </Box>

                <Box alignEnd>
                    <Txt color={colors.gray5} size={12} marginTop={2}>
                        ROE
                    </Txt>
                    <Txt
                        size={20}
                        fontFamily={'Myfont24-Regular'}
                        color={position?.PNL >= 0 ? colors.green2 : colors.red3}
                        marginTop={5}
                    >
                        {position?.ROE >= 0 ?
                            `+${numberCommasDot(position?.ROE.toFixed(2))}%` :
                            `${numberCommasDot(position?.ROE.toFixed(2))}%`
                        }
                    </Txt>
                </Box>
            </Box>

            <Box row justifySpaceBetween>
                <Box flex={1}>
                    <Box alignSelf={'flex-start'}>
                        <BoxLine title={`${t('Size')} (USDT)`} numberOfLines={1} />
                    </Box>
                    <Txt style={[styles.txtValue, { color: theme.black }]}>
                        {numberCommasDot((position?.SIZE).toFixed(2))}
                    </Txt>

                    <Box alignSelf={'flex-start'}>
                        <BoxLine title={`${t('Entry Price')} (USDT)`} numberOfLines={1} />
                    </Box>
                    <Box width={'90%'}>
                        <Txt style={[styles.txtValue, { color: theme.black }]}>
                            {numberCommasDot(position.entryPrice.toFixed(position?.ROUND))}
                        </Txt>
                    </Box>
                </Box>
                <Box marginHorizontal={5} flex={1}>
                    <Txt style={styles.title} numberOfLines={1}>Margin (USDT)</Txt>
                    <Txt style={[styles.txtValue, { color: theme.black }]}>{numberCommasDot(position.margin.toFixed(2))}</Txt>

                    <Txt style={[styles.title, { marginTop: -1, marginBottom: 1 }]} numberOfLines={1}>
                        {`${t('Mark Price')} (USDT)`}
                    </Txt>
                    <Txt style={[styles.txtValue, { marginTop: 3, color: theme.black }]}>
                        {numberCommasDot(position?.MARK_PRICE.toFixed(position?.ROUND))}
                    </Txt>
                </Box>

                <Box alignEnd flex={1}>
                    <Txt style={[styles.title]}>{t('Risk')}</Txt>
                    <Txt
                        style={styles.riskTitle}
                        color={position?.RISK > 35 ? colors.yellow : colors.green2}
                    >
                        {position.regime === 'cross' ? '0,01' : position?.RISK.toFixed(2)}
                        <Txt
                            fontFamily={fonts.FSCR}
                            color={position?.RISK > 35 ? colors.yellow : colors.green2}
                        >
                            {' %'}
                        </Txt>
                    </Txt>

                    <Txt style={styles.title} numberOfLines={1}>{`${t(`Liq. Price`)}(USDT)`}</Txt>
                    {isNaN(position?.liquidationPrice) ?
                        <Box width={'100%'} alignEnd marginTop={3}>
                            <Txt color={'#aaaaaa'}>--</Txt>
                            <Txt color={'#aaaaaa'} size={10} marginTop={-9} marginRight={1} bold>{'- -'}</Txt>
                        </Box> :
                        <Txt style={[styles.txtValue, { color: theme.black }]}>
                            {numberCommasDot(position?.LIQ_PRICE.toFixed(2))}
                        </Txt>
                    }
                </Box>
            </Box>

            {onSetClosePosition &&
                <Box row alignCenter marginTop={-5}>
                    <Txt style={styles.title}>
                        {'TP/SL: '}
                    </Txt>
                    <Txt style={[styles.txtValue, { color: theme.black }]}>
                        {`${position.TP || '--'} / ${position.SL || '--'}`}
                    </Txt>
                    <Btn onPress={() => onShowModalTPSLPosition && onShowModalTPSLPosition(position)}>
                        <Icon
                            size={12}
                            marginLeft={5}
                            tintColor={'#858d9b'}
                            source={require('@images/home/pen.png')}
                        />
                    </Btn>
                </Box>
            }

            {onSetClosePosition &&
                <Box row>
                    <Btn
                        flex={1}
                        radius={4}
                        height={35}
                        backgroundColor={theme.gray8}
                        onPress={() => {
                            if (onSetShowModalCore) onSetShowModalCore(position)
                        }}
                    >
                        <Txt fontFamily={fonts.SGM} size={12} numberOfLines={1} color={theme.black}>
                            {t('Adjust Leverage')}
                        </Txt>
                    </Btn>
                    <Btn
                        flex={1}
                        radius={4}
                        height={35}
                        marginHorizontal={10}
                        paddingHorizontal={5}
                        backgroundColor={theme.gray8}
                        onPress={() => {
                            if (onShowModalStopProfit) onShowModalStopProfit(position)
                        }}
                    >
                        <Txt fontFamily={fonts.SGM} size={12} numberOfLines={1} color={theme.black}>
                            {t('Stop Profit & Loss')}
                        </Txt>
                    </Btn>
                    <Btn
                        flex={1}
                        radius={4}
                        height={35}
                        backgroundColor={theme.gray8}
                        onPress={() => {
                            if (onSetClosePosition) onSetClosePosition(position)
                        }}
                    >
                        <Txt fontFamily={fonts.SGM} size={12} numberOfLines={1} color={theme.black}>
                            {t('Close Position')}
                        </Txt>
                    </Btn>
                </Box>
            }
        </Box>
    )
}

export default ItemPosition

const styles = StyleSheet.create({
    riskTitle: {
        fontFamily: 'Myfont23-Regular',
        marginBottom: 5,
        fontSize: 16,
        marginTop: 4
    },
    txtValue2: {
        fontFamily: 'Myfont23-Regular',
        marginBottom: 5,
        fontSize: 16,
        color: colors.green2,
        marginTop: 4
    },
    txtValue: {
        fontFamily: 'Myfont23-Regular',
        marginBottom: 10,
        fontSize: 16,
        marginTop: 7,
    },
    title: {
        color: colors.gray5,
        fontSize: 13,
    }
})