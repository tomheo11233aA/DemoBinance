import { getHistoryOrderThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import { orderHistorysFundingSelector } from '@selector/fundingSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlatList } from 'react-native-gesture-handler'
import DownItem from '../TransactionHistory/DownItem'
import ModalAsset from './ModalAsset'
import ModalType from './ModalType'
import { RefreshControl, StyleSheet } from 'react-native'
import Btn from '@commom/Btn'
import ItemOrderHistory from './ItemOrderHistory'

const OrderHistory = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const orderHistory = useAppSelector(orderHistorysFundingSelector)
  const [type, setType] = useState('All')
  const [typeTrade, setTypeTrade] = useState('All')
  const [isShowModalType, setShowModalType] = useState(false)
  const [isShowModalAsset, setShowModalAsset] = useState(false)

  useEffect(() => {
    handleGetHistoryOrder()
  }, [])

  const handleGetHistoryOrder = async () => {
    dispatch(getHistoryOrderThunk({
      page: 1,
      limit: 1000,
    }))
  }

  const handleSetType = (symbol: string) => {
    if (symbol === 'All') {
      handleGetHistoryOrder()
    } else {
      dispatch(getHistoryOrderThunk({
        page: 1,
        limit: 100,
        symbol: symbol,
      }))
    }
    setType(symbol)
    setShowModalAsset(false)
  }

  const handleSetTypeTrade = (typeTrade: string) => {
    if (typeTrade === 'All') {
      handleGetHistoryOrder()
    } else {
      dispatch(getHistoryOrderThunk({
        page: 1,
        limit: 1000,
        typeTrade: typeTrade,
      }))
    }
    setTypeTrade(typeTrade)
    setShowModalType(false)
  }

  const hanldeRefesh = () => {
    handleSetType(type)
  }

  return (
    <Box>
      <Box row justifySpaceBetween>
        <Box
          row
          alignCenter
          marginTop={10}
        >
          <DownItem
            value={type}
            title={'Asset: '}
            onPress={() => setShowModalAsset(true)}
          />
          <DownItem
            value={typeTrade}
            title={'Type: '}
            onPress={() => setShowModalType(true)}
          />
        </Box>

        <Box row alignCenter marginTop={10}>
          <Box
            width={13}
            height={13}
            radius={50}
            marginRight={5}
            borderWidth={1}
            borderColor={colors.grayBlue}
          />
          <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM} size={12}>
            {t('Grid')}
          </Txt>
        </Box>
      </Box>
      {
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={hanldeRefesh}
            />
          }
          renderItem={({ item }) =>
            <ItemOrderHistory
              t={t}
              item={item}
              theme={theme}
            />
          }
          initialNumToRender={10}
          data={orderHistory.data}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 200 }}
        />
      }

      <ModalAsset
        type={type}
        show={isShowModalAsset}
        onSetType={handleSetType}
        setShow={setShowModalAsset}
      />
      <ModalType
        type={typeTrade}
        show={isShowModalType}
        setShow={setShowModalType}
        onSetType={handleSetTypeTrade}
      />
    </Box>
  )
}

export default OrderHistory

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
})