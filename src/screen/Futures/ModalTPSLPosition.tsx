import { getProfileThunk } from '@asyncThunk/userAsyncThunk';
import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Icon from '@commom/Icon';
import Txt from '@commom/Txt';
import { useAppDispatch, useTheme } from '@hooks/index';
import LoadingBlack from '@reuse/LoadingBlack';
import Modality from '@reuse/Modality';
import { getPosition, setCancelSLPosition, setCancelTPPosition, setTPSLPosition } from '@service/futureService';
import futuresSlice from '@slice/futuresSlice';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { height, width } from '@util/responsive';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { IPositions, ITpslPosition } from 'src/model/futuresModel';
import InputTPSLPosition from './InputTPSLPosition';
import MLTPSLPosition from './MLTPSLPosition';
import NoteModalTPSLPosition from './NoteModalTPSLPosition';
import StatisticalModalTPSLPosition from './StatisticalModalTPSLPosition';
import { calcPNL } from '@method/format';

interface Props {
    tpslPosition: ITpslPosition;
}

const RADIUS_CONTENT = 10

const ModalTPSLPosition = ({ tpslPosition }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState<boolean>(false)
    const [tp, setTP] = useState<any>({ value: '', type: 'Mark', down: false })
    const [sl, setSL] = useState<any>({ value: '', type: 'Mark', down: false })

    const position = tpslPosition.position

    useEffect(() => {
        const position = tpslPosition.position
        if (position?.amountPnL_TP) {
            setTP({ value: '', type: position?.triggerTP })
        }
        if (position?.amountPnL_SL) {
            setSL({ value: '', type: position?.triggerSL })
        }
    }, [])

    const handleSetTPSLPosition = async () => {
        setLoading(true)
        const res = await setTPSLPosition({
            idPosition: position?.id,
            TP: position?.amountPnL_TP ? position?.TP : tp.value ? tp.value : undefined,
            triggerTP: position?.amountPnL_TP ? position?.triggerTP : tp.type,
            SL: position?.amountPnL_SL ? position?.SL : sl.value ? sl.value : undefined,
            triggerSL: position?.amountPnL_SL ? position?.triggerSL : sl.type,
        })
        if (!res.status) {
            Alert.alert(t(res.message))
        } else {
            handleResetPositionTPSL()
        }
        setLoading(false)
    }

    const handleCloseModal = async () => {
        setTP({ value: '', type: 'Mark', down: false })
        setSL({ value: '', type: 'Mark', down: false })
        dispatch(futuresSlice.actions.setTPSLPosition({
            showModal: false,
            position: tpslPosition.position,
        }))
    }

    const handleResetPositionTPSL = async () => {
        const res = await getPosition('BTCUSDT')
        if (res.status) {
            const index = res.data.findIndex((item: IPositions) => item.symbol === position?.symbol)
            if (index >= 0) {
                dispatch(futuresSlice.actions.setTPSLPosition({
                    ...tpslPosition,
                    position: res.data[index],
                }))
            }
            dispatch(getProfileThunk())
        }
    }

    const handleCancelTP = async () => {
        const res = await setCancelTPPosition(position?.id)
        if (res.status) {
            handleResetPositionTPSL()
        } else {
            Alert.alert(t(res.message))
        }
    }

    const handleCancelSL = async () => {
        const res = await setCancelSLPosition(position?.id)
        if (res.status) {
            handleResetPositionTPSL()
        } else {
            Alert.alert(t(res.message))
        }
    }

    return (
        <Modality
            show={tpslPosition.showModal}
        >
            <Pressable onPress={handleCloseModal}>
                <Box width={width} height={height} opacity={0} />
            </Pressable>
            <Box
                absolute
                bottom={0}
                width={width}
                paddingTop={10}
                paddingBottom={50}
                paddingHorizontal={15}
                backgroundColor={theme.bg}
                borderTopLeftRadius={RADIUS_CONTENT}
                borderTopRightRadius={RADIUS_CONTENT}
            >
                <Box flex={1} marginBottom={60}>
                    <Box row justifySpaceBetween>
                        <Txt fontFamily={fonts.AS} size={16} color={theme.black}>
                            {`TP/SL ${t('position')}`}
                        </Txt>
                        <Btn onPress={handleCloseModal}>
                            <Icon
                                size={14}
                                source={require('@images/future/close.png')}
                            />
                        </Btn>
                    </Box>

                    <StatisticalModalTPSLPosition {...{ position }} />

                    <Box zIndex={2}>
                        {position?.amountPnL_TP ?
                            <MLTPSLPosition
                                title={'Take Profit'}
                                onCancel={handleCancelTP}
                                value={Number(position?.TP)}
                                trigger={`${t(position.triggerTP + ' Price')} >= `}
                            />
                            :
                            <InputTPSLPosition
                                tpsl={tp}
                                zIndex={2}
                                setTPSL={setTP}
                                onChangeText={(txt: string) => setTP({ ...tp, value: txt })}
                            />
                        }
                        <NoteModalTPSLPosition
                            typeTrade={'Take Profit Market'}
                            pnl={position?.amountPnL_TP ? position.amountPnL_TP :
                                (tp.value && position) ? calcPNL(position, tp.value) : '--'}
                            level={position?.TP || tp.value || '--'}
                            typeTrigger={position?.triggerTP ? (position?.triggerTP + ' Price') : (tp.type + ' Price')}
                        />
                    </Box>

                    <Box zIndex={1}>
                        {position?.amountPnL_SL ?
                            <MLTPSLPosition
                                title={'Stop Loss'}
                                onCancel={handleCancelSL}
                                value={Number(position?.SL)}
                                trigger={`${t(position.triggerSL + ' Price')}  <= `}
                            />
                            :
                            <InputTPSLPosition
                                tpsl={sl}
                                setTPSL={setSL}
                                onChangeText={(txt: string) => setSL({ ...sl, value: txt })}
                            />
                        }

                        <NoteModalTPSLPosition
                            typeTrade={'Stop Market'}
                            pnl={position?.amountPnL_SL ? position.amountPnL_SL :
                                (sl.value && position) ? calcPNL(position, sl.value) : '--'}
                            level={position?.SL || sl.value || '--'}
                            typeTrigger={position?.triggerSL ? (position?.triggerSL + ' Price') : (sl.type + ' Price')}
                        />
                    </Box>
                </Box>

                <Btn
                    radius={3}
                    height={40}
                    disabled={loading}
                    onPress={handleSetTPSLPosition}
                    backgroundColor={colors.yellow}
                >
                    {loading ?
                        <LoadingBlack /> :
                        <Txt fontFamily={fonts.IBMPM}>{t('Confirm')}</Txt>
                    }
                </Btn>
            </Box>
        </Modality>
    )
}

export default ModalTPSLPosition

const styles = StyleSheet.create({
    textGray: {
        fontSize: 13,
        color: colors.grayBlue,
        fontFamily: fonts.IBMPR,
    }
})