import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { getListCoin } from '@service/tradeService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ICoins } from 'src/model/futuresModel'

const BuyOrSell = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [coins, setCoins] = useState<ICoins[]>([])

    useEffect(() => {
        getListCoin()
            .then(res => {
                if (res.data.length > 0) {
                    res.data.unshift({
                        ...res.data[0],
                        id: Math.random(),
                        currency: 'USDT',
                    })
                }
                setCoins(res.data)
            })
    }, [])

    return (
        <Box marginTop={30}>
            <Box row>
                <Box>
                    <Txt
                        size={16}
                        color={theme.black}
                        fontFamily={fonts.IBMPM}
                    >
                        {t('Buy')}
                    </Txt>
                </Box>

                <Box
                    width={1}
                    height={18}
                    marginHorizontal={10}
                    backgroundColor={colors.gray3}
                />

                <Box>
                    <Txt
                        size={16}
                        color={colors.gray5}
                        fontFamily={fonts.IBMPM}
                    >
                        {t('Sell')}
                    </Txt>
                </Box>
            </Box>

            <Box row wrap marginTop={20}>
                {coins.map((coin) =>
                    <Item
                        coin={coin}
                        key={coin.id}
                        theme={theme}
                    />
                )}
            </Box>
        </Box>
    )
}

const Item = ({ coin, theme }: { coin: ICoins, theme: any }) => {
    return (
        <Box
            radius={2}
            marginRight={10}
            marginVertical={5}
            paddingVertical={5}
            paddingHorizontal={20}
            backgroundColor={coin.currency === 'USDT' ? theme.yellow : theme.gray2}
        >
            <Txt
                size={16}
                fontFamily={fonts.AS}
                color={coin.currency === 'USDT' ? colors.yellowBold : colors.grayBlue}
            >
                {coin.currency}
            </Txt>
        </Box>
    )
}

export default BuyOrSell