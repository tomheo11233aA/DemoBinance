import Box from '@commom/Box'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    value: string;
    title: string;
    setValue: Function;
}

const InputChangePassword = ({
    value,
    title,
    setValue,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box marginTop={20}>
            <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM}>
                {t(title)}
            </Txt>
            <Input
                height={40}
                marginTop={5}
                value={value}
                security={true}
                color={theme.black}
                paddingHorizontal={10}
                onChangeText={setValue}
                backgroundColor={theme.gray2}
            />
        </Box>
    )
}

export default InputChangePassword