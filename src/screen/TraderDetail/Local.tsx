import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

const Local = ({ theme, t }: any) => {
    return (
        <Box marginTop={15} marginHorizontal={15}>
            <Box row alignCenter>
                <Icon
                    size={12}
                    tintColor={colors.grayBlue}
                    source={require('@images/future/circle.png')}
                />
                <Txt
                    size={12}
                    marginLeft={10}
                    color={theme.black}
                    fontFamily={fonts.IBMPR}
                >
                    {/* US */} {'--'}
                </Txt>
            </Box>
            <Box row marginTop={10}>
                <Icon
                    size={12}
                    tintColor={colors.grayBlue}
                    source={require('@images/future/menu.png')}
                />
                <Box flex={1} marginLeft={10}>
                    <Txt
                        size={12}
                        color={theme.black}
                        fontFamily={fonts.IBMPR}
                    >
                        {/* Ok guys, I scalp trade pumps and dumps so I suggest you set your margin low enough for me to open 4-7 trades at one point and don't worry about stop loss I will set it on my ... */}
                        {'--'}
                    </Txt>
                    <Btn alignSelf={'flex-start'} marginTop={10}>
                        <Txt color={colors.yellowBold} size={12} fontFamily={fonts.IBMPR}>
                            {t('See more')}
                        </Txt>
                    </Btn>
                </Box>
            </Box>
        </Box>
    )
}

export default Local