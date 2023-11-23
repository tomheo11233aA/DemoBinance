import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import BoxLine from '@reuse/BoxLine'
import { currencyFuturesSelector } from '@selector/futuresSelector'
import { funding } from '@service/futureService'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { IFunding, IMarginList } from 'src/model/futuresModel'

const CountDown = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const currency = useAppSelector(currencyFuturesSelector)
    const [db, setDb] = useState<IFunding[]>([])
    const [countDown, setCountDown] = useState<number | null>()
    const [timeAgo, setTimeAgo] = useState<number>(0)

    useEffect(() => {
        handleFunding()
    }, [currency])

    useEffect(() => {
        const interval = setInterval(() => {
            if (countDown) {
                const date = new Date(countDown)
                if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
                    handleFunding()
                    return
                }
                const timeStamp = convertTimestamp(timeAgo)
                setCountDown(timeStamp)
            }
        }, 1000)

        return () => clearInterval(interval)
    }, [countDown, timeAgo])

    const handleFunding = async () => {
        const res = await funding()
        let coins: IFunding[] = []
        if (res.status) {
            const data: IFunding[] = res.data
            for (let indexData = 0; indexData < data.length; indexData++) {
                if (data[indexData].symbol === currency) {
                    coins.push(data[indexData])
                    const margins: IMarginList[] = data[indexData].uMarginList
                    for (let indexMargin = 0; indexMargin < margins.length; indexMargin++) {
                        if (margins[indexMargin].exchangeName === 'Binance') {
                            coins[0].uMarginList = []
                            coins[0].uMarginList.push(margins[indexMargin])
                            break
                        }
                    }
                    break
                }
            }
        }

        setDb(coins)

        let nextFundingTime = coins[0]?.uMarginList[0]?.nextFundingTime
        const timeStamp = convertTimestamp(nextFundingTime)

        if (timeAgo !== nextFundingTime) {
            setCountDown(timeStamp)
            setTimeAgo(nextFundingTime)
        }
    }

    const convertTimestamp = (nextFundingTime: any) => {
        const olddate: any = new Date(nextFundingTime);
        const now = new Date()
        const minutesDecimal = now.getSeconds() / 60
        const hour = now.getHours() + ((now.getMinutes() + minutesDecimal) / 60)
        const timeStamp = olddate - hour * 60 * 60 * 1000

        return timeStamp
    }

    const time = (time: number): string => {
        const date = new Date(Number(time))
        const hour = date.getHours() < 10 ? `${'0' + date.getHours()}` : date.getHours()
        const minute = date.getMinutes() < 10 ? `${'0' + date.getMinutes()}` : date.getMinutes()
        const second = date.getSeconds() < 10 ? `${'0' + date.getSeconds()}` : date.getSeconds()

        return `${hour}:${minute}:${second}`
    }

    return (
        <Box alignEnd>
            <BoxLine
                title={t('Funding / Countdown')}
                size={11.5}
                color={'#90989f'}
            />
            <Txt
                size={14}
                fontFamily={'Myfont20-Regular'}
                marginRight={2}
                marginTop={1}
                color={theme.black}
            >
                {db[0]?.uMarginList[0]?.rate?.toFixed(4) || '0.0000'}% /
                {countDown ? time(countDown) : '00:00:00'}
            </Txt>
        </Box>
    )
}

export default CountDown