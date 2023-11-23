import { getHistoryChangeBalanceThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { historyChangeBalanceFundingSeletor } from '@selector/fundingSelector'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, FlatList, RefreshControl } from 'react-native'
import Header from './Header'
import Item from './Item'

const TransactionHistory = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const historyChangeBalance = useAppSelector(historyChangeBalanceFundingSeletor)

    useEffect(() => {
        handleGetHistoryChangeBalance()
    }, [])

    const handleGetHistoryChangeBalance = async () => {
        const { payload } = await dispatch(getHistoryChangeBalanceThunk({
            limit: 1000,
            page: 1,
            symbol: undefined,
        }))

        if (!payload.status) {
            Alert.alert(t(payload.message))
        }
    }

    const hanldeRefesh = async () => {
        handleGetHistoryChangeBalance()
    }

    return (
        <Box>
            <Header />
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={hanldeRefesh}
                    />
                }
                renderItem={
                    ({ item }) =>
                        <Item
                            t={t}
                            theme={theme}
                            item={item}
                        />
                }
                initialNumToRender={10}
                data={historyChangeBalance.data}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 200 }}
            />
        </Box>
    )
}

export default TransactionHistory