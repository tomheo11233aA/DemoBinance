import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

export default ({ theme, t }: any) => {
    return (
        <Box marginTop={22}>
            <Txt fontFamily={fonts.AS} size={13} color={theme.black}>
                Earn
            </Txt>

            <LinearGradient
                colors={[theme.gray2, theme.yellow4]}
                start={{ x: 0.2, y: 0.5 }} end={{ x: 1, y: 0 }}
                style={{
                    padding: 13,
                    marginTop: 12,
                    width: '100%',
                    borderRadius: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Icon
                    size={24}
                    marginRight={10}
                    resizeMode={'contain'}
                    source={require('@images/wallet/hand-money.png')}
                />
                <Box alignStart>
                    <Txt fontFamily={fonts.RM} size={11} color={theme.black}>
                        Binance Earn
                    </Txt>
                    <Box row alignEnd>
                        <Txt color={colors.grayBlue2} fontFamily={fonts.SGM} size={10}>
                            {'APR USDT '}
                        </Txt>
                        <Txt fontFamily={fonts.M23} color={colors.greenCan}>
                            {'0,83'}
                        </Txt>
                        <Txt color={colors.greenCan} size={11}>
                            {'%'}
                        </Txt>
                        <Txt fontFamily={fonts.M23} color={colors.greenCan}>
                            {'-481,07'}
                        </Txt>
                        <Txt color={colors.greenCan} size={11}>
                            {'%'}
                        </Txt>
                    </Box>
                </Box>

                <Box absolute top={2} right={2}>
                    <Txt size={10} color={colors.yellowBold}>{t('Recommended')}</Txt>
                </Box>
            </LinearGradient>
        </Box>
    )
}