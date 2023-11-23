import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { typeTradeSpotSelector } from '@selector/spotSelector'
import { setTypeTrade } from '@slice/spotSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { styled } from '@theme/styled'
import React, { useState } from 'react'

const Limit = ({ theme }: any) => {
    const dispatch = useAppDispatch()
    const [down, setDown] = useState<boolean>(false)
    const typeTrade = useAppSelector(typeTradeSpotSelector)

    return (
        <Box zIndex={9}>
            <Btn
                onPress={() => setDown(!down)}
                backgroundColor={theme.gray2}
                height={30}
                row
                justifySpaceBetween
                paddingHorizontal={10}
            >
                <Icon
                    source={require('@images/future/info.png')}
                    size={13}
                />
                <Txt fontFamily={fonts.IBMPM} color={theme.black}>
                    {typeTrade}
                </Txt>
                <Icon
                    source={require('@images/trade/more.png')}
                    size={14}
                />
            </Btn>
            {down &&
                <Box
                    width={'100%'}
                    backgroundColor={theme.gray2}
                    absolute
                    top={35}
                    style={styled.shadow}
                >
                    <Btn
                        onPress={() => {
                            dispatch(setTypeTrade('Limit'))
                            setDown(false)
                        }}
                        marginVertical={5}
                    >
                        <Txt
                            fontFamily={fonts.RM}
                            size={14}
                            color={typeTrade === 'Limit' ? colors.yellow : colors.gray5}
                        >
                            Limit
                        </Txt>
                    </Btn>
                    <Btn
                        onPress={() => {
                            dispatch(setTypeTrade('Market'))
                            setDown(false)
                        }}
                        marginVertical={5}
                    >
                        <Txt
                            fontFamily={fonts.RM}
                            size={14}
                            color={typeTrade === 'Market' ? colors.yellow : colors.gray5}
                        >
                            Market
                        </Txt>
                    </Btn>
                </Box>
            }
        </Box>
    )
}

export default Limit