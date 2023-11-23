import React from 'react'
import { Coin } from 'src/model/tradeModel'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { fonts } from '@theme/fonts'
import Icon from '@commom/Icon'
import contants from '@util/contants'
import { colors } from '@theme/colors'
import Btn from '@commom/Btn'
import { navigate } from '@navigation/navigationRef'
import { screen } from '@util/screens'
import { useTranslation } from 'react-i18next'

interface Props {
    coins: Coin[];
    theme: any;
}

const Coins = ({ coins, theme }: Props) => {
    const { t } = useTranslation()
    return (
        <Box marginTop={30}>
            <Txt fontFamily={fonts.AS} size={18} color={theme.black}>
                {t('Coin List')}
            </Txt>
            {coins.map((coin: Coin) =>
                <Btn
                    row
                    key={coin.id}
                    marginTop={30}
                    justifyCenter={false}
                    onPress={() => navigate(screen.DEPOSIT_CRYPTO, { coin })}
                >
                    <Icon
                        source={{ uri: contants.HOSTING + '/' + coin.image }}
                        size={30}
                        marginRight={15}
                    />
                    <Box>
                        <Txt color={theme.black}>{coin.currency}</Txt>
                        <Txt color={colors.gray5} size={12}>{coin.symbol}</Txt>
                    </Box>
                </Btn>
            )}
        </Box>
    )
}

export default Coins