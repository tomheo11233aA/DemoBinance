import Box from '@commom/Box'
import { useTheme } from '@hooks/index'
import React from 'react'
import Amount from './Amount'
import Avbl from './Avbl'
import BuyOrSell from './BuyOrSell'
import BuySellButton from './BuySellButton'
import Iceberg from './Iceberg'
import Limit from './Limit'
import Percent from './Percent'
import Price from './Price'
import { useTranslation } from 'react-i18next'

const BuySellLong = ({ toastTopRef }: any) => {
  const theme = useTheme()
  const { t } = useTranslation()

  return (
    <Box width={'63%'} paddingHorizontal={10}>
      <BuyOrSell theme={theme} />
      <Limit theme={theme} />
      <Price theme={theme} t={t}/>
      <Amount theme={theme} t={t} />
      <Percent theme={theme} t={t} />
      <Iceberg theme={theme} t={t} />
      <Avbl theme={theme} t={t} />
      <BuySellButton toastTopRef={toastTopRef} t={t} />
    </Box>
  )
}

export default BuySellLong