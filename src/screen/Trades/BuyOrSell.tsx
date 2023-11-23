import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { sideSpotSelector } from '@selector/spotSelector'
import { setSide } from '@slice/spotSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ImageBackground, StyleSheet } from 'react-native'

const BuyOrSell = ({theme}: any) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const side = useAppSelector(sideSpotSelector)

    return (
        <Box row width={'100%'} height={25} marginVertical={10}>
            {
                side === 'buy' ?
                    <>
                        <ImageBackground
                            source={require('@images/future/buy.png')}
                            style={styles.imgBackground}
                            imageStyle={{ borderRadius: 3 }}
                            resizeMode={'stretch'}
                        >
                            <Txt fontFamily={fonts.SGM} color={colors.white} marginRight={50}>
                                {t('Buy')}
                            </Txt>
                        </ImageBackground>

                        <Btn
                            onPress={() => dispatch(setSide('sell'))}
                            width={'70%'}
                            height={'100%'}
                            right={0}
                            backgroundColor={theme.gray2}
                            alignCenter
                            absolute
                            justifyCenter
                            paddingLeft={50}
                            radius={3}
                        >
                            <Txt fontFamily={fonts.SGM} color={colors.grayBlue}>
                                {t('Sell')}
                            </Txt>
                        </Btn>
                    </>
                    :
                    <>
                        <Btn
                            onPress={() => dispatch(setSide('buy'))}
                            width={'70%'}
                            height={'100%'}
                            right={0}
                            backgroundColor={theme.gray2}
                            alignCenter
                            justifyCenter
                            paddingRight={50}
                            radius={3}
                        >
                            <Txt fontFamily={fonts.SGM} color={colors.grayBlue}>
                                {t('Buy')}
                            </Txt>
                        </Btn>

                        <ImageBackground
                            source={require('@images/future/sell.png')}
                            style={styles.imgBackground2}
                            imageStyle={{ borderRadius: 3 }}
                            resizeMode={'stretch'}
                        >
                            <Txt fontFamily={fonts.SGM} color={colors.white} marginRight={20}>
                                {t('Sell')}
                            </Txt>
                        </ImageBackground>
                    </>
            }
        </Box>
    )
}

export default BuyOrSell

const styles = StyleSheet.create({
    imgBackground2: {
        width: '75%',
        height: '100%',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: -39,
    },
    imgBackground: {
        width: '75%',
        height: '100%',
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})