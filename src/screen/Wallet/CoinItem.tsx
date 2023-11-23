import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import { TFunction } from 'i18next'
import React from 'react'
import { Coin } from 'src/model/tradeModel'

interface Props {
    coin: Coin,
    t: TFunction<"translation", undefined, "translation">
}

const CoinItem = ({ coin, t }: Props) => {
    return (
        <Box
            width={'100%'}
            marginVertical={5}
            borderWidth={1}
            padding={10}
            borderColor={colors.gray3}
            radius={10}
        >
            <Box row alignCenter>
                <Img
                    source={{ uri: contants.HOSTING + '/' + coin.image }}
                    width={30}
                    height={30}
                    marginRight={15}
                />
                <Txt size={18} bold>{coin.currency}</Txt>
                <Txt marginLeft={5} color={colors.gray2}>{coin.currency}</Txt>
            </Box>
            <Txt numberOfLines={10} color={colors.gray2} marginVertical={10}>
                {t(coin.content)}
            </Txt>

            <Box
                row
                justifySpaceBetween
                borderTopWidth={0.5}
                borderColor={colors.gray3}
                paddingTop={10}
                alignCenter
            >
                <Txt bold size={18} fontFamily={fonts.OL}>${coin.bestAsk}</Txt>
                <Btn
                    backgroundColor={colors.yellow}
                    paddingHorizontal={40}
                    paddingVertical={10}
                    radius={20}
                >
                    <Txt bold fontFamily={fonts.AS}>{t('Buy')}</Txt>
                </Btn>
            </Box>
        </Box>
    )
}

export default CoinItem