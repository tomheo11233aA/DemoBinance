import { useTheme } from '@hooks/index'
import { useRoute } from '@react-navigation/native'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import React, { useEffect, useState } from 'react'
import Code from './Code'
import Infomation from './Infomation'
import ListDetail from './ListDetail'
import TopBar from './TopBar'
import { getHistoryOrderToIdPosition } from '@service/walletService'

const PositionHistoryDetail = () => {
    const theme = useTheme()
    const route = useRoute<any>()
    const { positionItem } = route.params
    const [listDetail, setListDetail] = useState([])

    useEffect(() => {
        handleGetHistoryOrderToIdPosition()
    }, [])

    const handleGetHistoryOrderToIdPosition = async () => {
        const res = await getHistoryOrderToIdPosition({
            limit: 1000,
            page: 1,
            id: positionItem.id
        })
        setListDetail(res.data.array)
    }

    return (
        <KeyBoardSafe bg={theme.gray5}>
            <TopBar />
            <Code {...{ positionItem }} />
            <Infomation {...{ positionItem }} />
            <ListDetail {...{ listDetail, positionItem }} />
        </KeyBoardSafe>
    )
}

export default PositionHistoryDetail