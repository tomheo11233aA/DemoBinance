import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const TypeCoin = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const list: string[] = ['All List Coin']

    return (
        <Box marginTop={20}>
            <Scroll horizontal showsHorizontalScrollIndicator={false}>
                {list.map((item, index) =>
                    <Box
                        key={item}
                        marginRight={20}
                        backgroundColor={index == 0 && theme.gray2}
                        paddingHorizontal={8}
                        paddingVertical={3}
                        radius={3}
                    >
                        <Txt
                            size={13}
                            fontFamily={fonts.RM}
                            color={index == 0 ? theme.black : colors.gray5}
                        >
                            {t(item)}
                        </Txt>
                    </Box>
                )}
            </Scroll>
        </Box>
    )
}

export default TypeCoin