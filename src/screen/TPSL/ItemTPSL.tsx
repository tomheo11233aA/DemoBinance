import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { capitalizeFirst, numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, TextInput } from 'react-native'
import Animated from 'react-native-reanimated'
import MarkOrLast from './MarkOrLast'

interface Props {
    trigger: any;
    title: string;
    amount: number;
    status?: string;
    zIndex?: number;
    lastItem?: boolean;
    setTrigger: Function;
    side: 'buy' | 'sell';
    amountTrigger: string;
    setAmountTrigger: Function;
}

const HEGIHT_LINE = 4

const ItemTPSL = ({
    side,
    title,
    amount,
    trigger,
    setTrigger,
    zIndex = 1,
    amountTrigger,
    lastItem = false,
    setAmountTrigger,
    status = 'Pending',
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [marginBottom, setMarginBottom] = useState(0)

    const color = side === 'buy' ? colors.green2 : colors.red3

    return (
        <Animated.View
            style={[
                {
                    zIndex,
                    marginBottom,
                    width: '100%',
                    marginTop: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                }
            ]}

            onLayout={(e) => {
                if (lastItem) {
                    const value = -(e.nativeEvent.layout.height / 2 - (HEGIHT_LINE / 2))
                    setMarginBottom(value)
                }
            }}
        >
            <Box width={20} height={HEGIHT_LINE} backgroundColor={theme.gray2} />

            <Box
                row
                flex={1}
                paddingVertical={15}
                paddingHorizontal={13}
                backgroundColor={theme.gray2}
            >
                <Box flex={1}>
                    <Txt color={theme.black} fontFamily={fonts.IBMPM} size={13}>
                        {title}
                    </Txt>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12} marginTop={13}>
                        {t('Side')}
                    </Txt>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12} marginTop={5}>
                        {t('Amount')}
                    </Txt>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12} marginTop={5}>
                        {t('Price Actived')}
                    </Txt>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12} marginTop={6}>
                        {t('Price')}
                    </Txt>
                </Box>

                <Box width={90}>
                    <Txt
                        size={11}
                        color={colors.grayBlue}
                        fontFamily={fonts.IBMPR}
                    >
                        {t(status)}
                    </Txt>
                    <Txt
                        size={11}
                        marginTop={13}
                        color={color}
                        fontFamily={fonts.IBMPR}
                    >
                        {t(capitalizeFirst(side))}
                    </Txt>
                    <Txt
                        size={13}
                        marginTop={5}
                        color={theme.black}
                        fontFamily={fonts.M23}
                    >
                        {numberCommasDot(amount?.toFixed(1))}
                        <Txt color={theme.black} size={11}>{' USDT'}</Txt>
                    </Txt>
                    <Box
                        row
                        radius={3}
                        padding={4}
                        marginTop={5}
                        backgroundColor={theme.gray}
                        height={Platform.OS === 'android' && 25}
                    >
                        <TextInput
                            keyboardType={'decimal-pad'}
                            selectionColor={colors.yellow}
                            placeholderTextColor={colors.grayBlue}
                            value={Number(amountTrigger).toFixed(3)}
                            onChangeText={(txt) => setAmountTrigger(txt)}
                            style={{
                                flex: 1,
                                fontSize: 10,
                                paddingRight: 4,
                                color: theme.black,
                                fontFamily: fonts.M23,
                                paddingVertical: 0,
                            }}
                        />
                        <Txt color={theme.black} size={11}>USDT</Txt>
                    </Box>
                    <MarkOrLast {...{ trigger, setTrigger }} />
                </Box>
            </Box>
        </Animated.View>
    )
}

export default ItemTPSL