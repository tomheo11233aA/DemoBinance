import Box from '@commom/Box'
import { useTheme } from '@hooks/index'
import React from 'react'
import AmountSlider from './AmountSlider'
import Avbl from './Avbl'
import BuyOrSell from './BuyOrSell'
import BuySellButton from './BuySellButton'
import Calc from './Calc'
import Limit from './Limit'
import Price from './Price'

const BuySellLong = () => {
  const theme = useTheme()
  return (
    <Box width={'63%'} paddingHorizontal={10}>
      <BuyOrSell theme={theme} />
      <Avbl theme={theme} />
      <Limit theme={theme} />
      <Price theme={theme} />
      <AmountSlider />
      <Calc theme={theme}/>
      <BuySellButton  />
    </Box>
  )
}

export default BuySellLong