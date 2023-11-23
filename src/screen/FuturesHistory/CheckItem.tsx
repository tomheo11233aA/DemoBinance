import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    title: string
}

const CheckItem = ({ title }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box row alignCenter marginTop={10}>
            <Box
                width={15}
                height={15}
                radius={50}
                borderColor={theme.gray6}
                marginRight={7}
                alignCenter
                justifyCenter
                backgroundColor={colors.yellow}
            >
                <Txt size={10} color={theme.bg} bold>
                    ✓
                </Txt>
            </Box>

            <Txt color={theme.white} fontFamily={fonts.IBMPR} size={13}>
                {t(title)}
            </Txt>
        </Box>
    )
}

export default CheckItem