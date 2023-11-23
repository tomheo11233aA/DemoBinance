import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import { width } from '@util/responsive'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { fonts } from '@theme/fonts'
import { colors } from '@theme/colors'
import Animated from 'react-native-reanimated'
import Back from '@reuse/Back'

interface Props {
    theme: any;
    t: any;
}

const Header = ({ theme, t }: Props) => {
    return (
        <Animated.View
            style={{ overflow: 'hidden' }}
        >
            <Box
                width={width}
                padding={15}
                backgroundColor={colors.yellow}
            >
                <Back color={'black'} size={16} />
                <Img
                    zIndex={0}
                    absolute
                    bottom={-width * 7 / 100}
                    right={-width * 30 / 100}
                    width={'100%'}
                    height={'90%'}
                    resizeMode={'contain'}
                    source={require('@images/coppyTrade/bgTrader.png')}
                />

                <Box width={'70%'} marginTop={5}>
                    <Txt
                        bold
                        size={18}
                        color={colors.black}
                    >
                        {t('Apply to be a trader')}
                    </Txt>
                    <Txt marginTop={20} marginBottom={30} fontFamily={fonts.IBMPR}>
                        {t('Binance is the world leading crypto exchange that connects millions of crypto investors around the world.')}
                    </Txt>

                    <View
                        style={{
                            marginBottom: 20,
                            paddingVertical: 10,
                            flexDirection: 'row',
                            paddingHorizontal: 15,
                            alignSelf: 'flex-start',
                            backgroundColor: colors.black,
                            transform: [{ skewX: '-10deg' }]
                        }}
                    >
                        <Box>
                            <Txt fontFamily={fonts.M31} size={16} color={colors.yellow}>
                                7896
                            </Txt>
                            <Txt fontFamily={fonts.IBMPR} size={12} color={colors.white}>
                                {t('Copiers')}
                            </Txt>
                        </Box>
                        <Box marginLeft={20}>
                            <Txt fontFamily={fonts.M31} size={16} color={colors.yellow}>
                                159.32%
                            </Txt>
                            <Txt size={12} fontFamily={fonts.IBMPR} color={colors.white}>
                                {t('30D ROI')}
                            </Txt>
                        </Box>
                    </View>
                </Box>
            </Box>
        </Animated.View>
    )
}

export default Header