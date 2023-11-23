import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import React from 'react'

const Warn = ({ title }: any) => {
  const theme = useTheme()

  return (
    <Box backgroundColor={theme.yellow} marginVertical={5} padding={10}>
      <Txt color={colors.yellowBold}>
        {title}
      </Txt>
    </Box>
  )
}

export default Warn