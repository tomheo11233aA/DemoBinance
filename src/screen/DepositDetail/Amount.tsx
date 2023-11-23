import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'
import { numberCommasDot } from '@method/format'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import Icon from '@commom/Icon'
import { fonts } from '@theme/fonts'
import { convertCoinkey } from '@method/convert'

const Amount = ({ depositItem }: any) => {
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
                    {numberCommasDot(depositItem?.usd_amount)}
                </Txt>
                <Txt color={theme.black} size={13} fontFamily={fonts.IBMPR}>
                    {` ${convertCoinkey(depositItem?.coin_key)}`}
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
            <Txt size={11} center fontFamily={fonts.IBMPR} color={colors.grayBlue} marginVertical={20}>
                {t('The cryptocurrency has been transferred to your Binance account. See your Spot account balance for more details.')}
            </Txt>
        </Box>
    )
}

export default Amount