import Box from '@commom/Box'
import React from 'react'
import DownItem from '../TransactionHistory/DownItem'
import Item from './Item'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@hooks/index'

const TradeHistory = () => {
  const theme = useTheme()
  const { t } = useTranslation()

  const data = [
    {
      side: 'Sell',
      role: 'Taker',
      amount: '0,001',
      fee: '0,01082384',
      price: '27.059,6',
      symbol: 'BTCUSDT',
      profit: '-0,00379999',
      date: '2023-05-16 13:56:57',
    },
    {
      side: 'Buy',
      role: 'Taker',
      amount: '0,001',
      fee: '0,01082384',
      price: '27.059,6',
      symbol: 'BTCUSDT',
      profit: '-0,00379999',
      date: '2023-05-16 13:56:57',
    },
    {
      side: 'Sell',
      role: 'Taker',
      amount: '0,001',
      fee: '0,01082384',
      price: '27.059,6',
      symbol: 'BTCUSDT',
      profit: '-0,00379999',
      date: '2023-05-16 13:56:57',
    },
  ]

  return (
    <Box>
      <Box row alignCenter marginTop={10}>
        <DownItem
          title={'Asset: '}
          value={'All'}
        />
        <DownItem
          title={'Type: '}
          value={'All'}
        />
      </Box>
      {data.map((item) =>
        <Item
          t={t}
          item={item}
          theme={theme}
          key={Math.random()}
        />
      )}
    </Box>
  )
}

export default TradeHistory