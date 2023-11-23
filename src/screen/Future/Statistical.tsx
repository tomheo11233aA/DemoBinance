import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import BoxLine from '@reuse/BoxLine'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { StyleSheet } from 'react-native'

const size_text_box = 11
const size_text_box2 = 10

const Statistical = ({
    t,
    totalPNL,
    wallet_balance,
    balance: TOTAL_MARGIN,
}: any) => {
    const theme = useTheme()
    return (
        <Box
            borderTopWidth={1}
            borderBottomWidth={1}
            borderColor={theme.gray}
            marginTop={15}
        >
            <Box
                row
                borderBottomWidth={1}
                borderColor={theme.gray}
            >
                <Box
                    flex={1}
                    borderRightWidth={1}
                    paddingVertical={10}
                    marginHorizontal={15}
                    borderColor={theme.gray}
                >
                    <BoxLine
                        title={`${t('Margin balance')} (USDT)`}
                        color={colors.gray5}
                        size={size_text_box2}
                        size2={size_text_box}
                        font={fonts.IBMPR}
                    />
                    <Txt style={[styles.txtValue1, { color: theme.black }]}>
                        {numberCommasDot(TOTAL_MARGIN.toFixed(2))}
                    </Txt>
                    <Txt style={styles.txtValue2}>
                        ≈ {numberCommasDot(TOTAL_MARGIN.toFixed(2))}
                        <Txt style={styles.txtDolar}>{' $'}</Txt>
                    </Txt>
                </Box>

                <Box flex={1} paddingVertical={10}>
                    <BoxLine
                        title={`${t('Wallet balance')} (USDT)`}
                        color={colors.gray5}
                        size={size_text_box2}
                        size2={size_text_box}
                        font={fonts.IBMPR}
                    />
                    <Txt style={[styles.txtValue1, { color: theme.black }]}>
                        {numberCommasDot(wallet_balance?.toFixed(2))}
                    </Txt>
                    <Txt style={styles.txtValue2}>
                        ≈ {numberCommasDot(wallet_balance?.toFixed(2))}
                        <Txt style={styles.txtDolar}>{' $'}</Txt>
                    </Txt>
                </Box>
            </Box>

            <Box paddingVertical={10} paddingHorizontal={15}>
                <BoxLine
                    title={`${t('Total Unrealized PNL')} (USDT)`}
                    color={colors.gray5}
                    size={size_text_box2}
                    size2={size_text_box}
                    font={fonts.IBMPR}
                />
                <Txt style={[styles.txtValue1, { color: theme.black }]}>
                    {numberCommasDot(totalPNL?.toFixed(2))}
                </Txt>
                <Txt style={styles.txtValue2}>
                    ≈ {numberCommasDot(totalPNL.toFixed(2))}
                    <Txt style={styles.txtDolar}>{' $'}</Txt>
                </Txt>
            </Box>
        </Box>
    )
}

export default Statistical

const styles = StyleSheet.create({
    txtValue1: {
        fontFamily: 'Myfont24-Regular',
        fontSize: 14,
        marginTop: 10,
    },
    txtValue2: {
        color: colors.gray5,
        fontSize: 12,
        fontFamily: 'Myfont23-Regular'
    },
    txtDolar: {
        color: colors.gray5,
        fontFamily: fonts.IBMPR,
        fontSize: 10,
    }
})