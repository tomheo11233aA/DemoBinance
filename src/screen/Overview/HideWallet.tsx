import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import React from 'react'

const HideWallet = ({ t }: any) => {
  return (
    <Box row alignCenter marginBottom={10}>
      <Box
        width={15}
        height={15}
        radius={50}
        borderColor={colors.gray2}
        borderWidth={1}
      />
      <Txt color={colors.grayBlue} size={12} marginLeft={10}>{`${t('Hide')} 0 ${t('balances')}`}</Txt>
    </Box>
  )
}

export default HideWallet