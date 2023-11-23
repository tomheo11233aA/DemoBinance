import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import CheckItem from './CheckItem'
import { useTranslation } from 'react-i18next'

const Side = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box marginTop={40}>
            <Box
                paddingVertical={10}
                borderBottomWidth={1}
                borderColor={theme.gray2}
            >
                <Txt color={colors.grayBlue} fontFamily={fonts.AS}>
                    {t('Direction')}
                </Txt>
            </Box>
            <Box row>
                <Box flex={1}>
                    <CheckItem title={'Buy'} />
                </Box>
                <Box flex={1}>
                    <CheckItem title={'Sell'} />
                </Box>
            </Box>

            <Box row marginTop={30}>
                <Box
                    flex={1}
                    radius={3}
                    alignCenter
                    marginRight={10}
                    paddingVertical={10}
                    backgroundColor={theme.gray2}
                >
                    <Txt color={theme.black} fontFamily={fonts.RM}>
                        {t('Reset')}
                    </Txt>
                </Box>
                <Box
                    flex={1}
                    radius={3}
                    alignCenter
                    paddingVertical={10}
                    backgroundColor={colors.yellow}
                >
                    <Txt color={colors.black} fontFamily={fonts.RM}>
                        {t('Confirm')}
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default Side