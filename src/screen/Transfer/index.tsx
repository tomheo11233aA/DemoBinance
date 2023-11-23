import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { hideBottomTab, useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Convert from './Convert'
import Header from './Header'

const Transfer = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    hideBottomTab()

    return (
        <Box flex={1} backgroundColor={theme.bg} paddingHorizontal={15}>
            <KeyBoardSafe>
                <Header {...{ theme, t }} />
                <Convert {...{ theme, t }} />
            </KeyBoardSafe>
            <Btn
                radius={5}
                height={45}
                marginTop={10}
                marginBottom={40}
                backgroundColor={theme.gray2}
            >
                <Txt color={'#b7bac3'} fontFamily={fonts.IBMPM} size={15}>
                    {t('Transfer confirm')}
                </Txt>
            </Btn>
        </Box>
    )
}

export default Transfer