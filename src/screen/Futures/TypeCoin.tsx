import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { width } from '@util/responsive'

const TypeCoin = ({ theme }: any) => {
    const data = ['Favorites list', 'All', 'Perpetual', 'Period']

    return (
        <Box>
            <Box
                row
                paddingHorizontal={15}
                marginTop={10}
                justifySpaceAround
                alignStart
            >
                {data.map((item: string) =>
                    <Box key={item} alignCenter marginRight={10}>
                        <Txt
                            color={item === 'Favorites list' ? theme.black : colors.gray5}
                            fontFamily={fonts.SGM}
                            size={14}
                        >
                            {item}
                        </Txt>
                        {item === 'Favorites list' &&
                            <Box width={20} height={3} backgroundColor={colors.yellow} marginTop={5} />
                        }
                    </Box>
                )}
            </Box>
            <Box width={width} height={0.5} backgroundColor={theme.gray2} />
        </Box>
    )
}

export default TypeCoin