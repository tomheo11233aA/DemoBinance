import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import CheckItem from './CheckItem'
import { useTranslation } from 'react-i18next'

const Status = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box>
            <Box
                paddingVertical={10}
                borderBottomWidth={1}
                borderColor={theme.gray2}
            >
                <Txt color={colors.grayBlue} fontFamily={fonts.AS}>
                    {t('Status')}
                </Txt>
            </Box>

            <Box row>
                <Box flex={1}>
                    <CheckItem
                        title={'Matched'}
                    />
                    <CheckItem
                        title={'Canceled'}
                    />
                </Box>

                <Box flex={1}>
                    <CheckItem
                        title={'Partially matched'}
                    />
                    <CheckItem
                        title={'Expired'}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Status