import { hideBottomTab, useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import Safe from '@reuse/Safe'
import React, { useEffect, useState } from 'react'
import FundingFee from './FundingFee'
import Header from './Header'
import ModalFilter from './ModalFilter'
import OpenOrders from './OpenOrders'
import OrderHistory from './OrderHistory'
import PositionHistory from './PositionHistory'
import TWAPHistory from './TWAPHistory'
import Tabs from './Tabs'
import TradeHistory from './TradeHistory'
import TransactionHistory from './TransactionHistory'
import { io } from 'socket.io-client'
import contants from '@util/contants'
import { profileUserSelector } from '@selector/userSelector'
import { Profile } from 'src/model/userModel'
import { getHistoryChangeBalanceThunk, getHistoryOpenOrderAllThunk } from '@asyncThunk/fundingAsyncThunk'
import { AppState, AppStateStatus } from 'react-native'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import KeyBoardSafe from '@reuse/KeyBoardSafe'

const FuturesHistory = () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const [tab, setTab] = useState<string>('Open Orders')
  const [showFilter, setShowFilter] = useState<boolean>(false)

  const profile: Profile = useAppSelector<any>(profileUserSelector)

  hideBottomTab()

  useEffect((): any => {
    const newSocket = io(contants.HOSTING)
    newSocket.emit('joinUser', `${profile.id}`)

    newSocket.on("limit", (res) => {
      console.log('ress history')
      handleReCallAPI('All')
    })

    return () => newSocket.disconnect()
  }, [])

  const handleReCallAPI = async (symbol: string) => {
    dispatch(getHistoryChangeBalanceThunk({
      limit: 1000,
      page: 1,
      symbol: symbol == 'All' ? undefined : symbol,
    }))

    dispatch(getHistoryOpenOrderAllThunk({
      page: 1,
      limit: 100,
    }))

    dispatch(getProfileThunk())
  }

  return (
    <Safe bg={theme.bg} paddingHorizontal={15}>
      <Header {...{ setShowFilter }} />
      <Tabs {...{ tab, setTab }} />
      {tab === 'Open Orders' ?
        <OpenOrders /> : tab === 'Order History' ?
          <OrderHistory /> : tab === 'Position History' ?
            <PositionHistory /> : tab === 'Trade History' ?
              <TradeHistory /> : tab === 'TWAP History' ?
                <TWAPHistory /> : tab === 'Transaction History' ?
                  <TransactionHistory /> : <FundingFee />
      }
      <ModalFilter
        show={showFilter}
        setShow={setShowFilter}
      />
    </Safe>
  )
}

export default FuturesHistory