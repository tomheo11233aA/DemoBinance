import Box from '@commom/Box'
import { useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { heightBottomTab } from '@util/responsive'
import React from 'react'
import Header from './Header'
import ListCoin from './ListCoin'
import Options from './Options'

const Earn = () => {
  const theme = useTheme()

  return (
    <KeyBoardSafe
      bg={theme.gray5}
      paddingBottom={heightBottomTab()}
    >
      <Header />
      <Box
        flex={1}
        marginTop={30}
        borderTopLeftRadius={20}
        borderTopRightRadius={20}
        backgroundColor={theme.bg}
      >
        <Options />
        <ListCoin />
      </Box>
    </KeyBoardSafe>
  )
}

export default Earn