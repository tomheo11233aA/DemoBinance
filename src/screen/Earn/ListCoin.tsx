import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { getListCoin } from '@service/tradeService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ICoins } from 'src/model/futuresModel'

const ListCoin = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [coins, setCoins] = useState<ICoins[]>([])

    useEffect(() => {
        getListCoin().then(res => setCoins(res.data))
    }, [])

    return (
        <Box padding={15}>
            <Txt color={theme.black} fontFamily={fonts.AS} size={16}>
                {t('Protected Products')}
            </Txt>
            <Box marginTop={20}>
                {coins.map((coin) => {
                    const color = coin.percentChange >= 0 ? colors.green2 : colors.red3
                    return (
                        <Box
                            row
                            alignCenter
                            key={coin.id}
                            marginVertical={20}
                            justifySpaceBetween
                        >
                            <Box row alignCenter>
                                <Icon
                                    size={24}
                                    resizeMode={'contain'}
                                    source={{ uri: contants.HOSTING + '/' + coin.image }}
                                    marginRight={15}
                                />
                                <Txt color={theme.black} fontFamily={fonts.AS}>
                                    {coin.currency}
                                </Txt>
                            </Box>
                            <Txt color={color} fontFamily={fonts.M24} size={15}>
                                {coin.percentChange}
                                <Txt color={color} size={15} fontFamily={fonts.AS}>%</Txt>
                            </Txt>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default ListCoin