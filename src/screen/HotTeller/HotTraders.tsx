import Box from '@commom/Box';
import { useAppDispatch } from '@hooks/index';
import { navigate } from '@navigation/navigationRef';
import { setHotTrader } from '@slice/copyTradeSlice';
import { screen } from '@util/screens';
import React from 'react';
import { FlatList } from 'react-native';
import TraderItem from './TraderItem';
import { RefreshControl } from 'react-native-gesture-handler';

interface Props {
    t: any;
    theme: any;
    listUserTrade: any;
    handleRefresh: () => void;
}

const HotTraders = ({ theme, t, listUserTrade, handleRefresh }: Props) => {
    const dispatch = useAppDispatch()

    const handleMoveDetailTrade = (item: any) => {
        dispatch(setHotTrader(item))
        navigate(screen.TRADER_DETAIL)
    }

    const handleOpenCopyTrade = (item: any) => {
        dispatch(setHotTrader(item))
        navigate(screen.COPY_TRADE)
    }

    return (
        <Box marginTop={15}>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={false}
                        onRefresh={handleRefresh}
                    />
                }
                renderItem={
                    ({ item }) =>
                        <TraderItem
                            {...{
                                t,
                                item,
                                theme,
                                handleOpenCopyTrade,
                                handleMoveDetailTrade,
                            }}
                        />
                }
                data={listUserTrade.data}
                initialNumToRender={10}
                removeClippedSubviews={true}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item: any) => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 200 }}
            />
        </Box>
    )
}

export default HotTraders