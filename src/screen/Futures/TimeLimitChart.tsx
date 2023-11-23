import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { listTimeLimitFuturesSelector, symbolFuturesSelector, timeLimitFuturesSelector } from '@selector/futuresSelector'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import React, { useEffect } from 'react'
import { AppState, AppStateStatus, TouchableOpacity } from 'react-native'
import { io } from 'socket.io-client'
import { ITimeLimit } from 'src/model/tradeModel'

interface Props {
    setOpenChart: Function,
}

const TimeLimitChart = ({ setOpenChart }: Props) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const symbol = useAppSelector(symbolFuturesSelector)
    const timeLimit = useAppSelector(timeLimitFuturesSelector)
    const listTimeLimit = useAppSelector(listTimeLimitFuturesSelector)

    useEffect((): any => {
        const newSocket = io(contants.HOSTING)

        newSocket.on(`${symbol}UPDATESPOT`, (times: ITimeLimit[]) => {
            if (times.length > 0 && listTimeLimit.length === 0) {
                dispatch(futuresSlice.actions.setListTimeLimit(times))
                newSocket.disconnect()
            }
        })

        AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
            if (nextAppState === 'inactive') {
                newSocket.disconnect()
            }
            // if (nextAppState === 'active') {
            //     newSocket.connect()
            // }
        });

        return () => newSocket.disconnect()
    }, [])

    return (
        <Box row alignCenter paddingVertical={7}>
            <Scroll
                horizontal
                row
                borderRightWidth={1}
                borderColor={colors.gray3}
                showsHorizontalScrollIndicator={false}
            >
                {listTimeLimit.map((time: ITimeLimit) => {
                    return (
                        <Btn
                            onPress={() => dispatch(futuresSlice.actions.setTimeLimit(time))}
                            key={time.timeString}
                            alignCenter
                            marginHorizontal={8}
                        >
                            <Txt
                                size={12}
                                color={time.timeString === timeLimit?.timeString ? theme.black : colors.grayBlue}
                                fontFamily={fonts.IBMPR}
                            >
                                {time.timeString}
                            </Txt>
                            {time.timeString === timeLimit?.timeString &&
                                <Box height={2} width={20} backgroundColor={colors.yellow} />}
                        </Btn>
                    )
                })}
            </Scroll>

            <TouchableOpacity
                onPress={() => setOpenChart(false)}
                style={{
                    height: '100%'
                }}
            >
                <Box
                    rotateZ={'-90deg'}
                    marginLeft={10}
                >
                    <Icon
                        source={require('@images/back.png')}
                        size={10}
                    />
                </Box>
            </TouchableOpacity>
        </Box>
    )
}

export default TimeLimitChart