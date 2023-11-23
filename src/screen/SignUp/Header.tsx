import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import Back from '@reuse/Back'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <Box>
      <Back size={16} />
      <Txt marginTop={40} bold size={24} fontFamily={fonts.AS} color={theme.black}>
        {`Binance ${t('Sign Up')}`}
      </Txt>
    </Box>
  )
}

export default Header