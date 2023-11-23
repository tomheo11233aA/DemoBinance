import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { navigate } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import { TFunction } from 'i18next'
import React from 'react'

interface Props {
    theme: any,
    t: TFunction<"translation">,
}

const symbols: string[] = ['Convert', 'Spot', 'Margin', 'Flat', 'P2p', 'Auto-Invest']

const Symbol = ({ t, theme }: Props) => {
    return (
        <Box
            row
            borderWidth={1}
            borderColor={theme.white4}
            radius={3}
            width={'100%'}
            justifySpaceBetween
            backgroundColor={theme.gray2}
        >
            <Scroll
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {symbols.map((symbol: string) =>
                    <Btn
                        onPress={() => {
                            if (symbol === 'P2p') {
                                navigate(screen.P2P_TAB)
                            } else if (symbol === 'Convert') {
                                navigate(screen.CONVERT_TRADES)
                            }
                        }}
                        key={symbol}
                        backgroundColor={symbol === 'Spot' ? theme.black2 : theme.gray2}
                        paddingHorizontal={10}
                        paddingTop={5}
                        paddingBottom={2}
                        radius={2}
                        marginVertical={2}
                    >
                        <Txt
                            color={symbol === 'Spot' ? theme.black : colors.grayBlue}
                            fontFamily={fonts.RM}
                            size={12}
                        >
                            {t(symbol)}
                        </Txt>
                        {symbol === 'Options' &&
                            <Box
                                absolute
                                right={9}
                                top={-2}
                                backgroundColor={colors.yellow}
                                paddingHorizontal={2}
                                height={10}
                            >
                                <Txt size={7} fontFamily={fonts.JR}>New</Txt>
                            </Box>
                        }
                    </Btn>
                )}
            </Scroll>
        </Box>
    )
}

export default Symbol