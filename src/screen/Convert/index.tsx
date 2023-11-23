import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { hideBottomTab, useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ConvertMoney from './ConvertMoney'
import Header from './Header'

const Convert = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  hideBottomTab()

  return (
    <Box
      flex={1}
      paddingHorizontal={15}
      backgroundColor={theme.bg}
    >
      <KeyBoardSafe>
        <Header {...{ theme, t }} />
        <ConvertMoney {...{ theme, t }} />
      </KeyBoardSafe>

      <Btn
        backgroundColor={theme.gray2}
        height={45}
        marginTop={10}
        radius={5}
        marginBottom={40}
      >
        <Txt color={'#b7bac3'} fontFamily={fonts.IBMPM} size={15}>
          {t('Confirm')}
        </Txt>
      </Btn>
    </Box>
  )
}

export default Convert