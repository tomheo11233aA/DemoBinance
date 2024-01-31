import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import BoxLine from '@reuse/BoxLine'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { StyleSheet } from 'react-native'
import { View } from 'react-native'

const size_text_box = 14
const size_text_box2 = 14

const formatText = (text: string) => {
    if (text.length > 3) {
        return text.substring(0, 3) + '...'
    }
    return text
}

const Statistical = ({
    t,
    totalPNL,
    wallet_balance,
    balance: TOTAL_MARGIN,
}: any) => {
    const theme = useTheme()
    return (
        <Box
            // borderTopWidth={1}
            // borderBottomWidth={1}
            // borderColor={theme.gray}
            marginTop={15}
            zIndex={-1}
        >
            <Box
                row
                // borderBottomWidth={1}
                borderColor={theme.gray}
            >
                <Box
                    flex={1}
                    // borderRightWidth={1}
                    paddingVertical={10}
                    marginHorizontal={15}
                // borderColor={theme.gray}
                >
                    <BoxLine
                        title={`${t('Wallet balance')} (USDT)`}
                        // title={`${t('Wallet balance')} ${formatText(t('(USDT)'))}`}
                        color={colors.gray77}
                        size={size_text_box2}
                        size2={size_text_box}
                        font={fonts.BNPR}
                        fontWeigth={'400'}
                    />
                    {/* <Txt color={colors.gray77} size={14} fontFamily={fonts.BNPM}>
                        {`${t('Wallet balance')} (USDT)`}
                    </Txt> */}
                    <Txt style={[styles.txtValue1, { color: theme.black }]}>
                        {/* {numberCommasDot(TOTAL_MARGIN.toFixed(2))} */}
                        {/* {TOTAL_MARGIN.toLocaleString('en-US', { maximumFractionDigits: 2 })} */}
                        {TOTAL_MARGIN === 0 ? `$` + TOTAL_MARGIN?.toFixed(8) : TOTAL_MARGIN?.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </Txt>
                    <Txt style={styles.txtValue2}>
                        ≈ {TOTAL_MARGIN.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        <Txt style={styles.txtDolar}>{' $'}</Txt>
                    </Txt>
                </Box>

                <Box flex={1} paddingVertical={10}>
                    <BoxLine
                        // title={`${t('Unrealized PNL')} (USDT)`}
                        title={`${t('Unrealized PNL')} ${formatText(t('(USDT)'))}`}
                        color={colors.gray5}
                        size={size_text_box2}
                        size2={size_text_box}
                        font={fonts.BNPR}
                        fontWeigth={'400'}
                    />
                    <Txt style={[styles.txtValue1, { color: theme.black }]}>
                        {/* {numberCommasDot(wallet_balance?.toFixed(2))} */}
                        {/* {totalPNL?.toLocaleString('en-US', { maximumFractionDigits: 2 })} */}
                        {totalPNL === 0 ? `$` + totalPNL?.toFixed(6) : totalPNL?.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    </Txt>
                    <Txt style={styles.txtValue2}>
                        ≈ {totalPNL?.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                        <Txt style={styles.txtDolar}>{' $'}</Txt>
                    </Txt>
                </Box>
            </Box>

            {/* <Box paddingVertical={10} paddingHorizontal={15}>
                <BoxLine
                    title={`${t('Total Unrealized PNL')} (USDT)`}
                    color={colors.gray5}
                    size={size_text_box2}
                    size2={size_text_box}
                    font={fonts.BNPM}
                />
                <Txt style={[styles.txtValue1, { color: theme.black }]}>
                    {totalPNL?.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </Txt>
                <Txt style={styles.txtValue2}>
                    ≈ {totalPNL?.toLocaleString('en-US', { maximumFractionDigits: 2 })}
                    <Txt style={styles.txtDolar}>{' $'}</Txt>
                </Txt>
            </Box> */}
        </Box>
    )
}

export default Statistical

const styles = StyleSheet.create({
    txtValue1: {
        // fontFamily: 'Myfont24-Regular',
        fontFamily: fonts.BNPR,
        fontWeight: '400',
        fontSize: 16,
        marginTop: 5,
    },
    txtValue2: {
        color: colors.gray77,
        fontSize: 14,
        fontFamily: fonts.BNPR
        // fontFamily: 'Myfont23-Regular'
    },
    txtDolar: {
        color: colors.gray77,
        fontFamily: fonts.BNPL,
        fontSize: 14,
    }
})