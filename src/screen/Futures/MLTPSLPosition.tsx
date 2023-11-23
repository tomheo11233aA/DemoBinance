import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    title: string;
    value: number;
    trigger: string;
    onCancel: Function;
}

const MLTPSLPosition = ({
    title,
    value,
    trigger,
    onCancel,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box paddingTop={10}>
            <Box row justifySpaceBetween>
                <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM}>
                    {t(title)}
                </Txt>
                <Btn onPress={onCancel}>
                    <Txt color={colors.yellow} fontFamily={fonts.IBMPM} size={12}>
                        {t('Cancel')}
                    </Txt>
                </Btn>
            </Box>

            <Box
                row
                alignCenter
                marginTop={10}
                paddingVertical={15}
                paddingHorizontal={10}
                backgroundColor={theme.gray2}
            >
                <Txt fontFamily={fonts.IBMPM} color={colors.grayBlue}>
                    {trigger}
                </Txt>
                <Txt fontFamily={fonts.M24} size={16} color={colors.grayBlue}>
                    {value}
                </Txt>
                <Txt fontFamily={fonts.IBMPM} color={colors.grayBlue}>
                    {' USDT'}
                </Txt>
            </Box>
        </Box>
    )
}

export default MLTPSLPosition