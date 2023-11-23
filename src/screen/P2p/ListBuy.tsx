import Box from '@commom/Box'
import React from 'react'
import BuyItem from './BuyItem'
import { useAppSelector, useTheme } from '@hooks/index'
import { tabBuySellP2pSelector } from '@selector/p2pSelector'
import { useTranslation } from 'react-i18next'

const ListBuy = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const tabBuySell = useAppSelector(tabBuySellP2pSelector)
  const buys = [
    {
      name: 'TienAoGiaRe',
      order: 108,
      completionRate: 99.10,
      like: 98.79,
      time: 15,
      price: 23750,
      amount: 99.85,
      limitFrom: 150_000,
      limitTo: 151_000,
    },
    {
      name: 'Latuongvi',
      order: 117,
      completionRate: 93.60,
      like: 98.79,
      time: 15,
      price: 23_770,
      amount: 99.85,
      limitFrom: 150_000,
      limitTo: 300_000,
    },
    {
      name: 'Latuongvi',
      order: 117,
      completionRate: 93.60,
      like: 98.79,
      time: 15,
      price: 23_770,
      amount: 99.85,
      limitFrom: 150_000,
      limitTo: 300_000,
    },
    {
      name: 'Latuongvi',
      order: 117,
      completionRate: 93.60,
      like: 98.79,
      time: 15,
      price: 23_770,
      amount: 99.85,
      limitFrom: 150_000,
      limitTo: 300_000,
    },
  ]

  return (
    <Box>
      {buys.map((item) =>
        <BuyItem
          t={t}
          item={item}
          theme={theme}
          key={Math.random()}
          tabBuySell={tabBuySell}
        />
      )}
    </Box>
  )
}

export default ListBuy