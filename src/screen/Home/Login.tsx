import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { navigate } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Box
      backgroundColor={theme.gray3}
      padding={10}
      radius={10}
      marginTop={20}
    >
      <Box row>
        <Box flex={1}>
          <Txt
            size={25}
            numberOfLines={10}
            bold
            fontFamily={fonts.AS}
            color={theme.black}
          >
            {t('Sign up now to get up to $100')}
          </Txt>
        </Box>

        <Img
          source={require('@images/home/bonus.png')}
          width={80}
          height={70}
        />
      </Box>

      <Box row alignCenter justifySpaceBetween marginTop={10} marginBottom={10}>
        <Btn
          onPress={() => navigate(screen.LOGIN)}
          width={'48%'}
          backgroundColor={theme.bg}
          height={50}
          radius={20}
        >
          <Txt size={17} fontFamily={fonts.AS} color={theme.black}>
            {t('Log In')}
          </Txt>
        </Btn>

        <Btn
          onPress={() => navigate(screen.SIGN_UP)}
          height={50}
          radius={20}
          width={'48%'}
          backgroundColor={colors.yellow}
        >
          <Txt fontFamily={fonts.AS} size={17}>{t('Sign Up')}</Txt>
        </Btn>
      </Box>
    </Box>
  )
}

export default Login