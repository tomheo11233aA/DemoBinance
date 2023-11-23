import Box from '@commom/Box'
import React, { useState } from 'react'
import DownItem from './DownItem'
import ModalAssetTransaction from './ModalAssetTransaction'
import { useAppDispatch } from '@hooks/index'
import { getHistoryChangeBalanceThunk } from '@asyncThunk/fundingAsyncThunk'

const Header = () => {
    const dispatch = useAppDispatch()
    const [typeTrade, setTypeTrade] = useState('All')
    const [isShowModalType, setShowModalType] = useState(false)

    const handleGetHistoryChangeBalance = async (symbol: string) => {
        await dispatch(getHistoryChangeBalanceThunk({
            limit: 1000,
            page: 1,
            symbol: symbol == 'All' ? undefined: symbol,
        }))
    }

    const handleSetTypeTrade = (typeTrade: string) => {
        handleGetHistoryChangeBalance(typeTrade)
        setTypeTrade(typeTrade)
        setShowModalType(false)
    }

    return (
        <Box row alignCenter marginTop={10}>
            <DownItem
                title={'Asset: '}
                value={'All'}
                onPress={() => setShowModalType(true)}
            />
            <ModalAssetTransaction
                type={typeTrade}
                show={isShowModalType}
                setShow={setShowModalType}
                onSetType={handleSetTypeTrade}
            />
        </Box>
    )
}

export default Header