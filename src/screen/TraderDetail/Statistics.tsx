import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { fonts } from '@theme/fonts'
import { colors } from '@theme/colors'
import Icon from '@commom/Icon'

const Statistics = ({ theme, t }: any) => {
    return (
        <Box marginHorizontal={15} marginTop={20}>
            <Box row alignCenter justifyCenter>
                <Box
                    radius={20}
                    padding={10}
                    backgroundColor={theme.gray2}
                >
                    <Txt color={theme.black} fontFamily={fonts.IBMPM}>
                        {t('Statistics')}
                    </Txt>
                </Box>
                <Box
                    radius={20}
                    padding={10}
                    marginLeft={10}
                >
                    <Txt
                        color={colors.grayBlue}
                        fontFamily={fonts.IBMPM}
                    >
                        {t('Information resource')}
                    </Txt>
                </Box>
            </Box>

            <Box
                row
                radius={5}
                padding={15}
                marginTop={20}
                justifySpaceBetween
                backgroundColor={theme.gray2}
            >
                <Box>
                    <Txt color={colors.grayBlue} size={12}>
                        {t('Copy trading account')}
                    </Txt>
                    <Box row alignEnd marginTop={7}>
                        <Icon
                            size={13}
                            marginRight={5}
                            source={require('@images/coppyTrade/medal_yellow.png')}
                        />
                        <Txt
                            size={12}
                            color={theme.black}
                            fontFamily={fonts.IBMPR}
                        >
                            {t(`Binance HD standard`)}
                        </Txt>
                    </Box>
                </Box>

                {/* <Box rotateZ={'90deg'} marginRight={10}>
                    <Icon
                        size={10}
                        resizeMode={'contain'}
                        source={require('@images/wallet/right_arrow.png')}
                    />
                </Box> */}
            </Box>
        </Box>
    )
}

export default Statistics