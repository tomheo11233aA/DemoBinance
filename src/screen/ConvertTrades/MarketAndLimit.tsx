import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const MarketAndLimit = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Box
            row
            justifySpaceAround
            paddingHorizontal={20}
            marginTop={20}
            alignStart
        >
            <Btn>
                <Txt
                    size={18}
                    fontFamily={fonts.AS}
                    color={theme.black}
                >
                    {t('Market')}
                </Txt>
                <Box width={35} height={4} backgroundColor={colors.yellow} marginTop={10} />
            </Btn>

            <Btn>
                <Txt
                    size={18}
                    fontFamily={fonts.AS}
                    color={colors.gray5}
                >
                    Limit
                </Txt>
            </Btn>
        </Box>
    )
}

export default MarketAndLimit