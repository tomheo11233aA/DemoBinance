import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import Icon from '@commom/Icon'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { useTheme } from '@hooks/index'
import { useTranslation } from 'react-i18next'

const Convert = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Box
            alignCenter
            row
            backgroundColor={theme.gray2}
            paddingVertical={10}
            paddingHorizontal={15}
            margin={15}
            justifySpaceBetween
            radius={3}
        >
            <Txt color={colors.yellowBold} size={12} fontFamily={fonts.AS}>
                {t('Convert valuable small assets to BNB')}
            </Txt>
            <View style={{ transform: [{ rotateZ: '180deg' }], marginLeft: 5 }}>
                <Icon
                    size={10}
                    source={require('@images/back.png')}
                />
            </View>
        </Box>
    )
}

export default Convert