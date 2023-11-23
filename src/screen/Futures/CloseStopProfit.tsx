import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import futuresSlice from '@slice/futuresSlice'
import { fonts } from '@theme/fonts'
import React from 'react'

interface Props {
    t: any;
    theme: any;
    dispatch: ThunkDispatch<{}, undefined, AnyAction>;
}

const CloseStopProfit = ({
    t,
    theme,
    dispatch,
}: Props) => {
    return (
        <Box row alignCenter justifySpaceBetween>
            <Txt></Txt>
            <Txt fontFamily={fonts.AS} size={18} color={theme.black}>
                {`${t('Take Profit')}/${t('Stop Loss')}`}
            </Txt>
            <Btn
                onPress={() => dispatch(
                    futuresSlice.actions.setStopProfit({
                        showModal: false,
                    })
                )}
            >
                <Icon
                    size={13}
                    source={require('@images/future/close.png')}
                />
            </Btn>
        </Box>
    )
}

export default CloseStopProfit