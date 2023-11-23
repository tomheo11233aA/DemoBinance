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

const Trending = ({ coins, theme, t }: Props) => {
    return (
        <Box>
            <Txt fontFamily={fonts.AS} size={16} marginTop={30} color={theme.black}>
                {t('Trending')}
            </Txt>
            <Box row wrap marginTop={20}>
                {coins.map((coin: Coin) =>
                    <Btn
                        onPress={() => navigate(screen.DEPOSIT_CRYPTO, { coin })}
                        key={coin.id}
                        marginRight={20}
                        paddingHorizontal={15}
                        height={30}
                        radius={3}
                        backgroundColor={theme.gray3}
                        marginVertical={10}
                    >
                        <Txt color={colors.grayBlue3} fontFamily={fonts.AS} size={13}>
                            {coin.currency}
                        </Txt>
                    </Btn>
                )}
                {/* <Box
                    marginRight={20}
                    paddingHorizontal={15}
                    height={30}
                    radius={3}
                    backgroundColor={theme.gray3}
                    alignCenter
                    justifyCenter
                >
                    <Txt color={colors.grayBlue3} fontFamily={fonts.AS}>USDT</Txt>
                </Box>
                <Box
                    marginRight={20}
                    paddingHorizontal={15}
                    height={30}
                    radius={3}
                    backgroundColor={theme.gray3}
                    alignCenter
                    justifyCenter
                >
                    <Txt color={colors.grayBlue3} fontFamily={fonts.AS}>BNB</Txt>
                </Box> */}
            </Box>
        </Box>
    )
}

export default Trending