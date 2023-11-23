import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { goBack } from '@navigation/navigationRef'
import Back from '@reuse/Back'
import { colors } from '@theme/colors'
import React from 'react'
import { useTranslation } from 'react-i18next'

const color = colors.gray10
const Header = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Box
      row
      padding={15}
      justifySpaceBetween
      borderBottomWidth={0.5}
      borderColor={theme.gray}
    >
      <Back color={color} />
      <Txt color={color} size={16}>
        {t('Deposit VND')}
      </Txt>
      <Btn onPress={() => goBack()}>
        <Icon
          size={15}
          source={require('@images/future/close.png')}
          tintColor={color}
        />
      </Btn>
    </Box>
  )
}

export default Header