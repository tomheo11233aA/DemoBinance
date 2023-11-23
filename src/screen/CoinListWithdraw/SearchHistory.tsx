import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { navigate } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React from 'react'
import { Coin } from 'src/model/tradeModel'

interface Props {
    t: any;
    theme: any;
    coins: Coin[];
}

const SearchHistory = ({ coins, theme, t }: Props) => {
    return (
        <Box>
            <Txt fontFamily={fonts.AS} size={18} marginTop={20} color={theme.black}>
                {t('Search History')}
            </Txt>
            <Box row wrap marginTop={20}>
                {coins.map((coin: Coin) =>
                    <Btn
                        radius={3}
                        height={30}
                        key={coin.id}
                        marginRight={20}
                        paddingHorizontal={15}
                        backgroundColor={theme.gray2}
                        onPress={() => navigate(screen.DEPOSIT_CRYPTO, { coin })}
                    >
                        <Txt color={colors.grayBlue} fontFamily={fonts.AS}>{coin.currency}</Txt>
                    </Btn>
                )}
            </Box>
        </Box>
    )
}

export default SearchHistory