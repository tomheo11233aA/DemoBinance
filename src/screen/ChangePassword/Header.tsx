import Box from '@commom/Box'
import Icon from '@commom/Icon'
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
    <Box row justifySpaceBetween>
      <Back size={16} />
      <Txt color={theme.black} fontFamily={fonts.AS} size={16}>
        {t('Change Password')}
      </Txt>
      <Icon
        size={12}
        opacity={0}
        source={require('@images/trade/more.png')}
      />
    </Box>
  )
}

export default Header