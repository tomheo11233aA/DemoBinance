import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { width } from '@util/responsive'
import React from 'react'

const TypeCoin = ({ theme, t }: any) => {
    const data = ['Favorites list', 'All', 'Perpetual', 'Period']

    return (
        <Box paddingHorizontal={15}>
            <Scroll
                horizontal
                showsHorizontalScrollIndicator={false}
                marginTop={10}
            >
                {data.map((item: string) =>
                    <Box key={item} alignCenter marginRight={10}>
                        <Txt
                            size={14}
                            fontFamily={fonts.SGM}
                            color={item === 'Favorites list' ? theme.black : colors.gray5}
                        >
                            {t(item)}
                        </Txt>
                        {item === 'Favorites list' &&
                            <Box width={20} height={3} backgroundColor={colors.yellow} marginTop={5} />
                        }
                    </Box>
                )}
                <Box width={width} height={0.5} backgroundColor={theme.gray2} />
            </Scroll>
        </Box>

    )
}

export default TypeCoin