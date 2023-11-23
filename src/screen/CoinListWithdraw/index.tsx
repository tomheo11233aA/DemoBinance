import Box from '@commom/Box'
import { useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { getListCoin } from '@service/tradeService'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Coin } from 'src/model/tradeModel'
import Coins from './Coins'
import Header from './Header'
import SearchHistory from './SearchHistory'
import Tab from './Tab'
import Trending from './Trending'

const CoinListWithdraw = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [coins, setCoins] = useState<Coin[]>([])
    const [tab, setTab] = useState<'Crypto' | 'Cash'>('Crypto')

    useEffect(() => {
        handleGetListCoin()
    }, [])

    const handleGetListCoin = async () => {
        const res = await getListCoin()
        if (res.status) {
            setCoins(res.data)
        }
    }

    return (
        <KeyBoardSafe>
            <Box paddingHorizontal={10}>
                <Header {...{ theme, t }} />
                <Tab {...{ tab, setTab, theme, t }} />
                {tab === 'Crypto' ?
                    <Box>
                        <SearchHistory {...{ coins, theme, t }} />
                        <Trending {...{ coins, theme, t }} />
                        <Coins {...{ coins, theme }} />
                    </Box>
                    :
                    <></>
                }
            </Box>
        </KeyBoardSafe>
    )
}

export default CoinListWithdraw