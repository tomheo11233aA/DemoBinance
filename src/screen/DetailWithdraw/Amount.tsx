import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { convertCoinkey } from '@method/convert'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Amount = ({ withdrawItem }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box
            alignCenter
            marginTop={40}
            paddingHorizontal={15}
            borderBottomWidth={1}
            borderColor={theme.gray2}
        >
            <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={13}>
                {t('Amount')}
            </Txt>
            <Box row alignCenter>
                <Txt color={theme.black} size={26} fontFamily={fonts.M24} marginVertical={10}>
                    {numberCommasDot(withdrawItem?.amount)}
                </Txt>
                <Txt color={theme.black} size={13} fontFamily={fonts.IBMPR}>
                    {` ${withdrawItem.symbol}`}
                </Txt>
            </Box>
            <Box row alignCenter>
                <Icon
                    size={16}
                    marginRight={5}
                    source={require('@images/profile/check.png')}
                />
                <Txt color={colors.green2} fontFamily={fonts.IBMPM}>
                    {t('Completed')}
                </Txt>
            </Box>
            <Txt size={11} center fontFamily={fonts.IBMPR} color={colors.grayBlue} marginTop={20}>
                {t('Crypto transferred out of Binance. Please contact the recipient platform for your transaction receipt.')}
            </Txt>
            <Txt color={colors.yellow} size={11} fontFamily={fonts.IBMPM} marginTop={5} marginBottom={30}>
                {t("Why hasn't my withdrawal arrived?")}
            </Txt>
        </Box>
    )
}

export default Amount