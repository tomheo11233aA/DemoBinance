import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import { navigate } from '@navigation/navigationRef'
import { themeUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React from 'react'
import Item from './Item'

const Other = ({ t, i18n }: any) => {
    const theme = useTheme()
    const themeUser = useAppSelector(themeUserSelector)

    return (
        <Box marginBottom={30}>
            <Box
                borderBottomWidth={1}
                borderColor={theme.line}
                paddingVertical={10}
            >
                <Txt
                    color={colors.grayBlue}
                    fontFamily={fonts.IBMPM}
                >
                    {t('Others')}
                </Txt>
            </Box>
            <Item 
                theme={theme}
                value={'******'}
                title={t('Chang Password')}
                onPress={() => navigate(screen.CHANGE_PASSWORD)}
            />
        </Box>
    )
}

export default Other