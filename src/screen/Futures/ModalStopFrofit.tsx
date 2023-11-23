import Box from '@commom/Box';
import { useAppDispatch, useTheme } from '@hooks/index';
import Modality from '@reuse/Modality';
import { height, width } from '@util/responsive';
import React, { useEffect, useState } from 'react';
import CloseStopProfit from './CloseStopProfit';
import { useTranslation } from 'react-i18next';
import OpenStopProfit from './OpenStopProfit';
import { Alert, Pressable } from 'react-native';
import futuresSlice from '@slice/futuresSlice';
import TakeProfit from './TakeProfit';
import StopLoss from './StopLoss';
import { ITpslPosition } from 'src/model/futuresModel';
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { setTPSLPosition } from '@service/futureService';
import LoadingBlack from '@reuse/LoadingBlack';
import { getProfileThunk } from '@asyncThunk/userAsyncThunk';

interface Props {
    stopProfit: ITpslPosition
}

const RADIUS_CONTENT = 10

const ModalStopFrofit = ({ stopProfit }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState<boolean>(false)

    const [tp, setTP] = useState<any>({ value: '', type: 'Mark', down: false })
    const [sl, setSL] = useState<any>({ value: '', type: 'Mark', down: false })

    const position = stopProfit.position

    useEffect(() => {
        setTP({ value: '', type: 'Mark' })
        setTP({ value: '', type: 'Mark' })
        if (position?.amountPnL_TP) {
            setTP({ value: position.TP, type: position?.triggerTP })
        }
        if (position?.amountPnL_SL) {
            setSL({ value: position.SL, type: position?.triggerSL })
        }
    }, [])

    const handleSetTPSL = async () => {
        setLoading(true)
        const res = await setTPSLPosition({
            idPosition: position?.id,
            TP: tp.value ? tp.value : undefined,
            triggerTP: tp.type,
            SL: sl.value ? sl.value : undefined,
            triggerSL: sl.type,
        })

        if (!res.status) {
            Alert.alert(t(res.message))
        } else {
            dispatch(futuresSlice.actions.setStopProfit({
                position: null,
                showModal: false
            }))
            dispatch(getProfileThunk())
        }
        setLoading(false)
    }

    return (
        <Modality
            show={stopProfit.showModal}
        >
            <Pressable onPress={() =>
                dispatch(futuresSlice.actions.setStopProfit({
                    ...stopProfit,
                    showModal: false,
                }))
            }
            >
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
                <CloseStopProfit  {...{ dispatch, theme, t }} />
                <OpenStopProfit {...{ theme, t, position }} />
                <TakeProfit {...{ theme, t, tp, setTP, position }} />
                <StopLoss  {...{ theme, t, sl, setSL, position }} />

                <Btn
                    radius={5}
                    height={40}
                    marginTop={10}
                    disabled={loading}
                    onPress={handleSetTPSL}
                    backgroundColor={colors.yellow}
                >
                    {loading ?
                        <LoadingBlack /> :
                        <Txt color={'black'} fontFamily={fonts.RM}>
                            {t('Confirm')}
                        </Txt>
                    }
                </Btn>
            </Box>
        </Modality>
    )
}

export default ModalStopFrofit