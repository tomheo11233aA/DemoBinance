import Box from '@commom/Box'
import { useAppSelector } from '@hooks/index'
import ItemOrderHistory from '@screen/FuturesHistory/OrderHistory/ItemOrderHistory'
import { futureTraderCopyTradeSelector } from '@selector/copyTradeSelector'
import React from 'react'
import { FlatList } from 'react-native'

const TabFutureHistory = ({ theme, t }: any) => {
  const futureTrade = useAppSelector(futureTraderCopyTradeSelector)

  return (
    <Box>
      {
        <FlatList
          renderItem={({ item }) =>
            <ItemOrderHistory
              t={t}
              item={item}
              theme={theme}
            />
          }
          initialNumToRender={10}
          data={futureTrade.data}
          scrollEnabled={true}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ 
            paddingBottom: 200, 
          }}
        />
      }
    </Box>
  )
}

export default TabFutureHistory