import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { calcReducerOnly, capitalizeFirst, numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

const MRT_15 = 15
const Infomation = ({ positionItem }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const color = positionItem.side == 'buy' ? colors.green2 : colors.red3
    const reducerOnly = calcReducerOnly(positionItem.typeTrade) ? 'Yes' : 'No'

    return (
        <Box
            marginTop={15}
            paddingHorizontal={15}
            borderTopLeftRadius={15}
            borderTopRightRadius={15}
            backgroundColor={theme.bg}
        >
            <Box
                paddingBottom={15}
                borderBottomWidth={1}
                borderColor={theme.gray2}
            >
                <Box row marginTop={MRT_15} justifySpaceBetween alignCenter>
                    <Txt style={styles.textGray}>
                        {t('Command')}
                    </Txt>
                    <Box row alignCenter>
                        <Txt fontFamily={fonts.M23} color={theme.black}>
                            --
                        </Txt>
                        <Btn
                            marginLeft={10}
                        >
                            <Icon
                                size={12}
                                source={require('@images/wallet/copy.png')}
                            />
                        </Btn>
                    </Box>
                </Box>

                <Box row marginTop={MRT_15} justifySpaceBetween alignCenter>
                    <Txt style={styles.textGray}>
                        {t('Type')}
                    </Txt>
                    <Txt color={color} fontFamily={fonts.IBMPR} size={12}>
                        {`${t(positionItem.typeTrade || '--')}/${t(capitalizeFirst(positionItem.side))}`}
                    </Txt>
                </Box>

                <Box row marginTop={MRT_15} justifySpaceBetween alignCenter>
                    <Txt style={styles.textGray}>
                        {`${t('Matched')}/${t('Amount')} (USDT)`}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M23}>
                        {'--'}
                        <Txt color={theme.grayBlue} fontFamily={fonts.M23}>
                            {`/${numberCommasDot(positionItem.amountCoin)}`}
                        </Txt>
                    </Txt>
                </Box>

                <Box row marginTop={MRT_15} justifySpaceBetween alignCenter>
                    <Txt style={styles.textGray}>
                        {`${t('Average')}/${t('Price')}`}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M23}>
                        {'--'}
                        <Txt color={theme.grayBlue} fontFamily={fonts.M23}>
                            {`/${numberCommasDot(positionItem.closePrice)}`}
                        </Txt>
                    </Txt>
                </Box>

                <Box row marginTop={MRT_15} justifySpaceBetween alignCenter>
                    <Txt style={styles.textGray}>
                        {t('Reduce Only')}
                    </Txt>
                    <Txt color={theme.black} size={12} fontFamily={fonts.IBMPR}>
                        {t(reducerOnly)}
                    </Txt>
                </Box>
            </Box>

            <Box paddingTop={15} paddingBottom={20}>
                <Box row justifySpaceBetween alignCenter>
                    <Txt style={styles.textGray}>
                        {t('Fee')}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M23}>
                        {}
                        <Txt color={theme.black} fontFamily={fonts.M23}>
                            {numberCommasDot(positionItem.feeFutureClose)}
                        </Txt>
                    </Txt>
                </Box>

                <Box row justifySpaceBetween alignCenter marginTop={MRT_15}>
                    <Txt style={styles.textGray}>
                        {t('Profit is recorded')}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M23}>
                        {numberCommasDot(positionItem.PNL)}
                        <Txt color={theme.black} fontFamily={fonts.IBMPR} size={12}>
                            {` USDT`}
                        </Txt>
                    </Txt>
                </Box>

                <Box row justifySpaceBetween alignCenter marginTop={MRT_15}>
                    <Txt style={styles.textGray}>
                        {t('Creation time')}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M23}>
                        {positionItem.created_at}
                    </Txt>
                </Box>

                <Box row justifySpaceBetween alignCenter marginTop={MRT_15}>
                    <Txt style={styles.textGray}>
                        {t('Update time')}
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M23}>
                        {positionItem.updated_at}
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default Infomation

const styles = StyleSheet.create({
    textGray: {
        fontSize: 12,
        fontFamily: fonts.IBMPR,
        color: colors.grayBlue,
    }
})