import Box from '@commom/Box'
import { useAppSelector } from '@hooks/index'
import LoadingYellow from '@reuse/LoadingYellow'
import { listPositionCloseCopyCopyTradeSelector } from '@selector/copyTradeSelector'
import { profileUserSelector } from '@selector/userSelector'
import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { Profile } from 'src/model/userModel'
import ItemPositionsCopyHistory from './ItemPositionsCopyHistory'

const TabPositionCopyHistory = ({ t, theme, handleGetAPI }: any) => {
  const profile: Profile = useAppSelector<any>(profileUserSelector)
  const listPositionCloseCopy = useAppSelector(listPositionCloseCopyCopyTradeSelector)

  return (
    <Box flex={1}>
      {listPositionCloseCopy.loading ?
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
          renderItem={
            ({ item }) =>
              <ItemPositionsCopyHistory
                t={t}
                item={item}
                theme={theme}
                profile={profile}
              />
          }
          initialNumToRender={10}
          data={listPositionCloseCopy.data}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 200 }}
        />
      }
    </Box>
  )
}

export default TabPositionCopyHistory