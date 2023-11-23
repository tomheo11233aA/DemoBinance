import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { coreFuturesSelector, regimeFuturesSelector } from '@selector/futuresSelector'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { styled } from '@theme/styled'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import CountDown from './CountDown'
import ModalCore from './ModalCore'

const Cross = () => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const [isShowRegime, setShowRegime] = useState<boolean>(false)
    const [isShowCore, setShowCore] = useState<boolean>(false)

    const regime = useAppSelector(regimeFuturesSelector)
    const core = useAppSelector(coreFuturesSelector)

    return (
        <Box row justifySpaceBetween zIndex={10}>
            <Box width={'60%'} row>
                <Box width={'44%'}>
                    <TouchableOpacity
                        onPress={() => setShowRegime(!isShowRegime)}
                        style={[
                            styles.btn,
                            {
                                width: '100%',
                                justifyContent: 'space-between',
                                paddingLeft: 10,
                                paddingRight: 5,
                                backgroundColor: theme.gray2
                            }
                        ]}
                    >
                        <Txt color={theme.black}>{regime}</Txt>
                        <Img
                            source={require('@images/trade/more.png')}
                            width={15}
                            height={15}
                        />
                    </TouchableOpacity>

                    {isShowRegime &&
                        <Box
                            width={'100%'}
                            backgroundColor={theme.gray2}
                            absolute
                            top={35}
                            style={styled.shadow}
                        >
                            <Btn
                                onPress={() => {
                                    dispatch(futuresSlice.actions.setRegime('Cross'))
                                    setShowRegime(false)
                                }}
                                marginVertical={5}
                            >
                                <Txt
                                    color={regime === 'Cross' ? colors.yellow : colors.gray5}
                                >
                                    Cross
                                </Txt>
                            </Btn>
                            <Btn
                                onPress={() => {
                                    dispatch(futuresSlice.actions.setRegime('Isolated'))
                                    setShowRegime(false)
                                }}
                                marginVertical={5}
                            >
                                <Txt
                                    color={regime === 'Isolated' ? colors.yellow : colors.gray5}
                                >
                                    Isolated
                                </Txt>
                            </Btn>
                        </Box>
                    }
                </Box>

                <TouchableOpacity
                    onPress={() => setShowCore(!isShowCore)}
                    style={[
                        styles.btn,
                        {
                            paddingLeft: 5,
                            paddingRight: 5,
                            marginHorizontal: 10,
                            backgroundColor: theme.gray2,
                        }
                    ]}
                >
                    <Txt
                        size={16}
                        marginTop={-3}
                        fontFamily={'Myfont17-Regular'}
                        color={theme.black}
                    >
                        {core}
                        <Txt size={16} fontFamily={fonts.IBMPR} color={theme.black}>
                            {' x'}
                        </Txt>
                    </Txt>
                    <Img
                        source={require('@images/trade/more.png')}
                        width={15}
                        height={15}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.btn,
                        {
                            justifyContent: 'center',
                            padding: 5,
                            backgroundColor: theme.gray2
                        }
                    ]}
                >
                    <Txt color={theme.black}>S</Txt>
                </TouchableOpacity>
            </Box>

            <CountDown />
            <ModalCore
                show={isShowCore}
                setShow={setShowCore}
            />
        </Box >
    )
}

export default Cross

const styles = StyleSheet.create({
    txt: {
        textDecorationLine: 'underline',
        color: '#90989f',
        fontSize: 11,
    },
    btn: {
        flexDirection: 'row',
        backgroundColor: colors.gray4,
        height: 27,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})