import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { TFunction } from 'i18next'
import React from 'react'

interface Props {
    t: TFunction<"translation">,
    theme: any,
}

const symbols: string[] = ['USDⓢ-M', 'COIN-M', 'Options', 'Strategy', 'Leaderborad']

const Symbol = ({ t, theme }: Props) => {
    return (
        <Scroll
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            <Box
                row
                borderWidth={1}
                borderColor={theme.white4}
                radius={3}
            >

                {symbols.map((symbol: string) =>
                    <Box
                        key={symbol}
                        backgroundColor={symbol === 'USDⓢ-M' ? theme.black2 : theme.gray2}
                        paddingHorizontal={10}
                        paddingTop={5}
                        paddingBottom={2}
                        radius={3}
                    >
                        <Txt
                            color={symbol === 'USDⓢ-M' ? theme.black : colors.grayBlue}
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
                    </Box>
                )}
            </Box>
        </Scroll>
    )
}

export default Symbol