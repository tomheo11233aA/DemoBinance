import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { HEIGHT_BOTTOM_TAB } from '@navigation/Container'
import { navigate } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { heightBottomTab } from '@util/responsive'
import { screen } from '@util/screens'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Login = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  return (
    <Box
      flex={1}
      paddingHorizontal={10}
      backgroundColor={theme.bg}
      paddingBottom={HEIGHT_BOTTOM_TAB + 10}
    >
      <Box flex={1} alignCenter justifyCenter marginTop={40}>
        <Box backgroundColor={colors.gray2} width={170} height={170} radius={170} alignCenter justifyCenter>
          <Img
            source={require('@images/wallet/phone.png')}
            width={200}
            height={200}
          />
        </Box>
        <Txt marginTop={40} bold size={25} color={theme.black}>
          {t('Welcome to Binance')}
        </Txt>
      </Box>

      <Box row alignCenter justifySpaceBetween marginTop={10} marginBottom={10}>
        <Btn
          height={50}
          radius={20}
          width={'48%'}
          backgroundColor={theme.gray2}
        >
          <Txt bold size={17} color={theme.black}>
            {t('Sing Up')}
          </Txt>
        </Btn>

        <Btn
          height={50}
          radius={20}
          width={'48%'}
          backgroundColor={colors.yellow}
          onPress={() => navigate(screen.LOGIN)}
        >
          <Txt bold size={17}>{t('Log In')}</Txt>
        </Btn>
      </Box>
    </Box>
  )
}

export default Login