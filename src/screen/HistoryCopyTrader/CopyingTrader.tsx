import Box from '@commom/Box'
import { useAppSelector } from '@hooks/index'
import LoadingYellow from '@reuse/LoadingYellow'
import { copyingTraderCopyTradeSelector } from '@selector/copyTradeSelector'
import React, { useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import ItemCopyingTrader from './ItemCopyingTrader'
import ModalCancelCopyingTrader from './ModalCancelCopyingTrader'

const CopyingTrader = ({ t, theme, handleGetAPI }: any) => {
  const copyingTrader = useAppSelector(copyingTraderCopyTradeSelector)

  const [idCancel, setIDCancel] = useState<number>(0)
  const [isShowModalCancel, setShowModalCancel] = useState(false)

  const handleOpenModalCancel = async (idCopy: number) => {
    setShowModalCancel(true)
    setIDCancel(idCopy)
  }

  return (
    <Box flex={1}>
      {copyingTrader.loading ?
        <Box flex={1} alignCenter justifyCenter>
          <LoadingYellow />
        </Box>
        :
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
              onOpenModalCancel={handleOpenModalCancel}
            />
          }
          initialNumToRender={10}
          data={copyingTrader.data}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 200 }}
        />
      }
      <ModalCancelCopyingTrader
        idCancel={idCancel}
        show={isShowModalCancel}
        setShow={setShowModalCancel}
      />
    </Box>
  )
}

export default CopyingTrader