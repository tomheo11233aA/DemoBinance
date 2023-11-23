import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

const Coins = () => {
    const theme = useTheme()
    const coins = ['USDT', 'BTC', 'BUSD', 'BNB', 'ETH', 'C98', 'XRP', 'ADA']

    return (
        <Box borderBottomWidth={1} borderColor={theme.gray2} marginTop={15}>
            <Scroll horizontal showsHorizontalScrollIndicator={false}>
                {coins.map((coin) =>
                    <Box
                        key={coin}
                        marginRight={20}
                        alignCenter
                    >
                        <Txt
                            color={coin === 'USDT' ? theme.black : colors.grayBlue}
                            fontFamily={fonts.IBMPM}
                        >
                            {coin}
                        </Txt>
                        {coin === 'USDT' &&
                            <Box
                                width={20}
                                height={2}
                                marginTop={7}
                                backgroundColor={colors.yellow}
                            />
                        }
                    </Box>
                )}
            </Scroll>
        </Box>
    )
}

export default Coins