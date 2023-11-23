import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const IBMPM = fonts.IBMPM
const Code = ({ positionItem }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const black = theme.black

    return (
        <Box alignCenter marginTop={20}>
            <Txt color={colors.grayBlue} size={11} >
                {t('Symbol')}
            </Txt>
            <Box row alignCenter>
                <Txt color={black} fontFamily={fonts.M24} marginVertical={5} size={18}>
                    {numberCommasDot(positionItem.PNL?.toFixed(8))}
                </Txt>
                <Txt color={black} fontFamily={IBMPM} size={15}>
                    {`${positionItem.symbol} `}
                </Txt>
                <Txt color={black} fontFamily={IBMPM} size={15}>
                    {t('Perpetual')}
                </Txt>
            </Box>
            <Box row alignCenter>
                <Icon
                    size={14}
                    marginRight={5}
                    source={require('@images/profile/check.png')}
                />
                <Txt color={colors.green2} fontFamily={IBMPM} size={13}>
                    {`${t('Matched')}(100%)`}
                </Txt>
            </Box>
        </Box>
    )
}

export default Code