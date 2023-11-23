import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { hideBottomTab, useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import LoadingBlack from '@reuse/LoadingBlack'
import { signUpCopyTrade } from '@service/copyTradeService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { heightBottomTab } from '@util/responsive'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import Header from './Header'
import Information from './Information'

const SignUpTrader = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const [loading, setLoading] = useState<boolean>(false)

  hideBottomTab()

  const handleSignUpCopyTrade = async () => {
    setLoading(true)
    const res = await signUpCopyTrade()
    if (res.status) {
      Alert.alert(t('Sign Up Success'))
    } else {
      Alert.alert(t(res.message))
    }
    setLoading(false)
  }

  return (
    <Box flex={1} backgroundColor={theme.bg}>
      <KeyBoardSafe paddingBottom={heightBottomTab()}>
        <Header {...{ theme, t }} />
        <Information {...{ theme, t }} />
      </KeyBoardSafe>
      <Box
        paddingTop={20}
        marginBottom={40}
        paddingHorizontal={15}
      >
        <Btn
          radius={3}
          disabled={loading}
          height={40}
          backgroundColor={colors.yellow}
          onPress={handleSignUpCopyTrade}
        >
          {loading ?
            <LoadingBlack /> :
            <Txt fontFamily={fonts.IBMPM}>
              {t('Apply Now')}
            </Txt>
          }
        </Btn>

        <Txt center color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12} marginTop={10}>
          {t("If you're already a widely followed trader, please ")}
          <Txt color={colors.yellowBold} size={12}>
            {t('submit your application via the KOL channel')}
          </Txt>
        </Txt>
      </Box>
    </Box>
  )
}

export default SignUpTrader