import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import futuresSlice from '@slice/futuresSlice'
import { fonts } from '@theme/fonts'
import React from 'react'

interface Props {
    dispatch: ThunkDispatch<{}, undefined, AnyAction>;
    theme: any;
}

const ClosePosition = ({ dispatch, theme }: Props) => {
    return (
        <Box row alignCenter justifySpaceBetween>
            <Txt></Txt>
            <Txt fontFamily={fonts.AS} size={18} color={theme.black}>
                Close positions
            </Txt>
            <Btn
                onPress={() => dispatch(futuresSlice.actions.setPosition(null))}
            >
                <Icon
                    source={require('@images/future/close.png')}
                    size={13}
                />
            </Btn>
        </Box>
    )
}

export default ClosePosition