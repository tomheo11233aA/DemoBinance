import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { colors } from '@theme/colors'
import React from 'react'
import BuySell from './BuySell'
import Header from './Header'
import { heightBottomTab } from '@util/responsive'

const P2p = () => {
  return (
    <KeyBoardSafe
      bg={colors.yellow2}
      paddingBottom={heightBottomTab()}
    >
      <Header />
      <BuySell />
    </KeyBoardSafe>
  )
}

export default P2p