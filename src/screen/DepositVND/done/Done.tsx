import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { goBack } from '@navigation/navigationRef'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Done = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <KeyBoardSafe paddingBottom={40}>
            <Box
                flex={1}
                alignCenter
                justifyCenter
                paddingHorizontal={20}
            >
                <Icon
                    source={require('@images/funding/done.png')}
                />
                <Txt
                    size={20}
                    marginTop={10}
                    color={theme.black}
                    fontFamily={fonts.AS}
                >
                    {t('Complete')}
                </Txt>
                <Txt
                    center
                    marginTop={10}
                    color={colors.grayBlue}
                >
                    {t('The system will review your transaction and will update your account balance as soon as possible. Thank you for your transaction.')}
                </Txt>
                <Btn
                    radius={3}
                    marginTop={20}
                    paddingVertical={10}
                    paddingHorizontal={20}
                    onPress={() => goBack()}
                    backgroundColor={colors.greenCan}
                >
                    <Txt fontFamily={fonts.AS} color={'white'}>
                        {t('Done')}
                    </Txt>
                </Btn>
            </Box>
        </KeyBoardSafe>
    )
}

export default Done