import KeyBoardSafe from '@reuse/KeyBoardSafe'
import React from 'react'
import Search from './Search'
import Type from './Type'
import Box from '@commom/Box'
import SpotFutures from './SpotFutures'
import Coins from './Coins'
import { height, heightBottomTab } from '@util/responsive'
import { useTheme } from '@hooks/index'
import { useTranslation } from 'react-i18next'

const Markets = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  return (
    <KeyBoardSafe
      bg={theme.bg}
      paddingBottom={heightBottomTab()}
    >
      <Search theme={theme} />
      <Type t={t} theme={theme}
      />
      <Box
        paddingTop={15}
        height={height}
        paddingHorizontal={15}
        borderTopLeftRadius={15}
        borderTopRightRadius={15}
        backgroundColor={theme.bg}
      >
        <SpotFutures theme={theme} t={t} />
        <Coins />
      </Box>
    </KeyBoardSafe>
  )
}

export default Markets