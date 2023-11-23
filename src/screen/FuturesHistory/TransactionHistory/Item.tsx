import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Box from '@commom/Box';
import Txt from '@commom/Txt';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { IHistoryChangeBalance } from 'src/model/fundingModel';
import { numberCommasDot } from '@method/format';

interface Props {
    t: any;
    item: IHistoryChangeBalance;
    theme: any;
}

const IBMPR = fonts.IBMPR
const SIZE_13 = 13

const Item = ({
    t,
    item,
    theme,
}: Props) => {
    return (
        <Box
            borderBottomWidth={1}
            borderColor={theme.gray}
            paddingVertical={20}
        >
            <Box row alignCenter justifySpaceBetween>
                <Txt color={theme.black} fontFamily={fonts.IBMPM} size={15}>
                    {item.title}
                </Txt>
                <Txt color={colors.grayBlue} fontFamily={fonts.M24} size={13}>
                    {item.created_at}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween marginVertical={10}>
                <Txt style={styles.textGray}>
                    {'Type'}
                </Txt>
                <Txt color={theme.black} fontFamily={IBMPR} size={SIZE_13}>
                    {item.type}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween marginBottom={10}>
                <Txt style={styles.textGray} >
                    {'Code'}
                </Txt>
                <Txt color={theme.black} fontFamily={IBMPR} size={SIZE_13}>
                    {`${item.symbol} ${t('Perpetual')}`}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween>
                <Txt style={styles.textGray}>
                    {'Amount'}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.M23} size={15}>
                    {numberCommasDot(item.amount)}
                </Txt>
            </Box>
        </Box>
    )
}

export default Item

const styles = StyleSheet.create({
    textGray: {
        color: colors.grayBlue,
        fontSize: 13,
        fontFamily: fonts.IBMPR
    }
})