import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Text } from 'react-native'
import ItemPaymeny from './ItemPaymeny'
import Btn from '@commom/Btn'
const SIZE = 11
const BuyItem = ({
    t,
    item,
    theme,
    tabBuySell,
}: any) => {
    return (
        <Box
            row
            justifySpaceBetween
            paddingVertical={15}
            borderBottomWidth={1}
            borderColor={theme.gray2}
        >
            <Box>
                <Box row alignCenter>
                    <Box
                        backgroundColor={colors.grayBlue}
                        width={17}
                        height={17}
                        alignCenter
                        justifyCenter
                        radius={50}
                        marginRight={5}
                    >
                        <Txt color={'white'} size={10}>
                            {item?.name?.slice(0, 1)}
                        </Txt>
                    </Box>
                    <Txt fontFamily={fonts.IBMPR} color={theme.black}>
                        {item?.name}
                    </Txt>
                </Box>

                <Box marginTop={5}>
                    <Txt fontFamily={fonts.M24} size={13} color={colors.grayBlue}>
                        {item.order}
                        <Txt size={SIZE} color={colors.gray5}>
                            {` ${t('Trades')} | `}
                        </Txt>
                        <Txt size={11} color={colors.gray5}>
                            {`${t('Completion')} `}
                        </Txt>
                        <Txt fontFamily={fonts.M24} size={13} color={colors.grayBlue}>
                            {`${numberCommasDot(item.completionRate)}%`}
                        </Txt>
                    </Txt>
                </Box>

                <Box marginTop={5}>
                    <Txt fontFamily={fonts.M17} size={13} color={colors.gray5}>
                        <Icon
                            size={12}
                            source={require('@images/p2p/like.png')}
                            tintColor={'#949ca7'}
                        />
                        {`  ${numberCommasDot(item.like)}%  `}
                        <Icon
                            size={12}
                            source={require('@images/p2p/oclock.png')}
                            tintColor={'#949ca7'}
                            resizeMode={'contain'}
                        />
                        <Txt fontFamily={fonts.M17} size={13} color={colors.gray5}>
                            {`  ${item.time} `}
                        </Txt>
                        <Txt size={11} color={colors.gray5}>{t('min')}</Txt>
                    </Txt>
                </Box>

                <Box row alignEnd marginTop={8}>
                    <Text
                        style={{
                            fontSize: SIZE,
                            color: theme.black,
                            fontFamily: fonts.AS,
                            textDecorationLine: 'underline',
                        }}
                    >
                        {'đ '}
                    </Text>
                    <Txt size={20} fontFamily={fonts.M24} color={theme.black}>
                        {numberCommasDot(item.price)}
                    </Txt>
                </Box>

                <Box marginTop={8}>
                    <Txt size={SIZE} color={colors.gray5}>
                        {`${t('Amount')} `}
                        <Txt fontFamily={fonts.M24} size={13} color={theme.black}>
                            {numberCommasDot(item.amount)}
                        </Txt>
                        <Txt size={SIZE} fontFamily={fonts.IBMPM} color={theme.black}>
                            {' USDT'}
                        </Txt>
                    </Txt>

                    <Txt size={SIZE} color={colors.gray5} marginTop={5}>
                        {`${t('Limit')} `}
                        <Text
                            style={{
                                textDecorationLine: 'underline',
                                color: theme.black,
                                fontSize: SIZE,
                                fontFamily: fonts.LR,
                            }}
                        >
                            {'đ '}
                        </Text>
                        <Txt fontFamily={fonts.M24} size={13} color={theme.black}>
                            {`${numberCommasDot(item.limitFrom.toFixed(2))} - `}
                        </Txt>
                        <Text
                            style={{
                                fontSize: SIZE,
                                color: theme.black,
                                fontFamily: fonts.LR,
                                textDecorationLine: 'underline',
                            }}
                        >
                            {'đ '}
                        </Text>
                        <Txt fontFamily={fonts.M24} size={13} color={theme.black}>
                            {numberCommasDot(item.limitTo.toFixed(2))}
                        </Txt>
                    </Txt>
                </Box>
            </Box>

            <Box justifyEnd>
                <ItemPaymeny
                    title='Viettel Money'
                />
                <ItemPaymeny
                    color={colors.greenCan}
                    title='Viettel Money'
                />
                <Btn
                    radius={5}
                    padding={7}
                    marginTop={10}
                    backgroundColor={tabBuySell === 'buy' ? colors.greenCan : colors.red3}
                >
                    <Txt fontFamily={fonts.SGM} color={colors.white}>
                        {t(tabBuySell === 'buy' ? 'Buy' : 'Sell')}
                    </Txt>
                </Btn>
            </Box>
        </Box>
    )
}

export default BuyItem