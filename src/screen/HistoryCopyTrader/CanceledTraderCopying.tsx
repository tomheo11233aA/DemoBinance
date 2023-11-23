import Box from '@commom/Box'
import { useAppSelector } from '@hooks/index'
import LoadingYellow from '@reuse/LoadingYellow'
import { listCancelCopyTraderSelector } from '@selector/copyTradeSelector'
import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import ItemCopyingTrader from './ItemCopyingTrader'

const CanceledTraderCopying = ({ t, theme, handleGetAPI }: any) => {
  const listCancelCopyTrader = useAppSelector(listCancelCopyTraderSelector)

  return (
    <Box flex={1}>
      {listCancelCopyTrader.loading ?
        <Box flex={1} alignCenter justifyCenter>
          <LoadingYellow />
        </Box> :
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={handleGetAPI}
            />
          }
          renderItem={({ item }) =>
            <ItemCopyingTrader
              t={t}
              item={item}
              theme={theme}
              showLast={false}
            />
          }
          initialNumToRender={10}
          data={listCancelCopyTrader.data}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 200 }}
        />
      }
    </Box>
  )
}

export default CanceledTraderCopying