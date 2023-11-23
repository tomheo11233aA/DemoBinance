import Box from '@commom/Box'
import { useAppSelector } from '@hooks/index'
import LoadingYellow from '@reuse/LoadingYellow'
import ItemOrderHistory from '@screen/FuturesHistory/OrderHistory/ItemOrderHistory'
import { historyOrderCopyCopyTradeSelector } from '@selector/copyTradeSelector'
import React from 'react'
import { FlatList, RefreshControl } from 'react-native'

const TabOrderCopyHistory = ({ t, theme, handleGetAPI }: any) => {
    const historyOrderCopy = useAppSelector(historyOrderCopyCopyTradeSelector)
    
    return (
        <Box flex={1}>
            {historyOrderCopy.loading ?
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
                            <ItemOrderHistory
                                t={t}
                                item={item}
                                theme={theme}
                            />
                    }
                    initialNumToRender={10}
                    data={historyOrderCopy.data}
                    removeClippedSubviews={true}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item: any) => item.id.toString()}
                    contentContainerStyle={{ paddingBottom: 200 }}
                />
            }
        </Box>
    )
}

export default TabOrderCopyHistory