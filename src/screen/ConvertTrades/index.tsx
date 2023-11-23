import Box from '@commom/Box'
import { hideBottomTab, useAppSelector, useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { coinsSpotSelector } from '@selector/spotSelector'
import { heightBottomTab } from '@util/responsive'
import React, { useState } from 'react'
import { ICoins } from 'src/model/futuresModel'
import FromCoin from './FromCoin'
import Header from './Header'
import Keyboard from './Keyboard'
import MarketAndLimit from './MarketAndLimit'
import ModalListCoin from './ModalListCoin'
import ModalPreviewConversion from './ModalPreviewConversion'
import ToCoin from './ToCoin'

const ConvertTrades = () => {
    const theme = useTheme()

    const coins = useAppSelector(coinsSpotSelector)

    const [coinTo, setCoinTo] = useState(coins[1])
    const [coinFrom, setCoinFrom] = useState(coins[0])
    const [textToInput, setTextToInput] = useState('')
    const [textFromInput, setTextFromInput] = useState('')
    const [isShowModalPreview, setShowModalPreview] = useState(false)
    const [isShowModalListCoin, setShowModalListCoin] = useState(false)
    const [coinChoosed, setCoinChoosed] = useState<'from' | 'to'>('from')
    const [inputChoosed, setInputChoosed] = useState<'from' | 'to'>('from')

    hideBottomTab()

    const handleSetTextInput = (text: any) => {
        if (inputChoosed === 'from') {
            if (text.value === '.' && textFromInput.includes('.')) return
            if (text.value === 'delete') {
                const textValue = textFromInput.slice(0, textFromInput.length - 1) || ''
                setTextFromInput(textValue)
            } else {
                const textValue = textFromInput + text.value
                setTextFromInput(textValue)
            }
        } else {
            if (text.value === '.' && textToInput.includes('.')) return
            if (text.value === 'delete') {
                const textValue = textToInput.slice(0, textToInput.length - 1) || ''
                setTextToInput(textValue)
            } else {
                const textValue = textToInput + text.value
                setTextToInput(textValue)
            }
        }
    }

    const handleSetShowModalListCoin = (value: 'to' | 'from') => {
        setCoinChoosed(value)
        setShowModalListCoin(true)
    }

    const handleSetCoin = (coin: ICoins) => {
        if (coinChoosed === 'from') {
            if (coin.symbol === coinTo.symbol) {
                setCoinTo(coinFrom)
            }
            setCoinFrom(coin)
        } else {
            if (coin.symbol === coinFrom.symbol) {
                setCoinFrom(coinTo)
            }
            setCoinTo(coin)
        }
        setShowModalListCoin(false)
    }

    const handleSwapCoin = () => {
        setCoinFrom(coinTo)
        setCoinTo(coinFrom)
    }

    return (
        <KeyBoardSafe
            bg={theme.bg}
            paddingBottom={heightBottomTab()}
        >
            <Box flex={1} paddingHorizontal={15}>
                <Header />
                <MarketAndLimit />
                <FromCoin
                    {...{
                        coinFrom,
                        textFromInput,
                        setTextToInput,
                        setInputChoosed,
                        handleSetShowModalListCoin,
                    }}
                />
                <ToCoin
                    {...{
                        coinTo,
                        textToInput,
                        handleSwapCoin,
                        setInputChoosed,
                        setTextFromInput,
                        handleSetShowModalListCoin,
                    }}
                />
            </Box>
            <Keyboard {...{ handleSetTextInput, setShowModalPreview }} />
            <ModalListCoin
                {...{
                    coins,
                    coinTo,
                    coinFrom,
                    coinChoosed,
                    handleSetCoin,
                    setCoinChoosed,
                    isShowModalListCoin,
                    setShowModalListCoin,
                }}
            />
            <ModalPreviewConversion
                {...{
                    coinTo,
                    coinFrom,
                    isShowModalPreview,
                    setShowModalPreview,
                }}
            />
        </KeyBoardSafe>
    )
}

export default ConvertTrades