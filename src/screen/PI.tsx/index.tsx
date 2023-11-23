import { useAppDispatch, useAppSelector } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { getChart } from '@service/tradeService'
import { setChart, setChartFromSocket } from '@slice/piSlice'
import React, { useEffect } from 'react'
import { RootState } from 'src/redux/store'
import PiChart from './PiChart'
import { io } from 'socket.io-client'
import contants from '@util/contants'

export const LENGHT_CHART = 20

const PI = () => {
    const dispatch = useAppDispatch()

    const chart = useAppSelector((state: RootState) => state.pi.chart)
    const chartLagre = useAppSelector((state: RootState) => state.pi.chartLagre)

    useEffect((): any => {
        handleGetChart()

        const newSocket = io(contants.HOSTING_CHART)

        newSocket.on(`BTCUSDTUPDATESPOT`, data => {
            if (data.length > 0) {
                dispatch(setChartFromSocket(data[0]))
            }
        })

        return () => newSocket.disconnect()
    }, [])

    const handleGetChart = async () => {
        const res = await getChart({
            limit: 500,
            symbol: 'BTCUSDT',
            time: 60,
        })
        if (res.status) {
            dispatch(setChart(res.data.array))
        }
    }
    return (
        <KeyBoardSafe>
                <PiChart
                    data={chart}
                    chartLagre={chartLagre}
                /> 
        </KeyBoardSafe>
    )
}

export default PI