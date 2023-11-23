import { closeMarketFutureThunk } from '@asyncThunk/futuresAsyncThunk';
import { getProfileThunk } from '@asyncThunk/userAsyncThunk';
import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index';
import LoadingBlack from '@reuse/LoadingBlack';
import Modality from '@reuse/Modality';
import { positionFuturesSelector } from '@selector/futuresSelector';
import { orderFuture } from '@service/tradeService';
import futuresSlice from '@slice/futuresSlice';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { height, width } from '@util/responsive';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Pressable } from 'react-native';
import AmountClose from './AmountClose';
import ClosePosition from './ClosePosition';
import PriceClose from './PriceClose';
import ProfitClose from './ProfitClose';
import TypePrice from './TypePrice';
import { cannotConnect } from '@method/alert';

interface Props {
    show: boolean;
    setShow: Function;
}

const RADIUS_CONTENT = 10

const ModalClosePosition = ({ show = true, setShow }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const position = useAppSelector(positionFuturesSelector)

    const [price, setPrice] = useState('')
    const [loading, setLoading] = useState(false)
    const [percent, setPercent] = useState<number>(100)
    const [typeTrade, setTypeTrade] = useState<'Market' | 'Limit'>('Market')

    const handleClosePosition = async () => {
        setLoading(true)
        if (position) {
            const size = position.margin * position.core
            if (percent === 100) {
                const { payload } = await dispatch(closeMarketFutureThunk(position.id))
                if (!payload.status) Alert.alert(t(cannotConnect()))
            } else {
                const res = await orderFuture({
                    amount: size * percent / 100,
                    side: position.side === 'buy' ? 'sell' : 'buy',
                    regime: position.regime,
                    core: position.core,
                    symbol: position.symbol,
                    typeTrade: typeTrade,
                    priceLimit: price,
                    triggerTP: position.triggerTP,
                    triggerSL: position.triggerSL,
                    TP: position.TP,
                    SL: position.SL,
                })

                if (!res.status) Alert.alert(t(cannotConnect()))
            }
            await dispatch(getProfileThunk())
            dispatch(futuresSlice.actions.setPosition(null))
        }
        setLoading(false)
    }

    return (
        <Modality
            show={show}
            setShow={setShow}
        >
            <Pressable onPress={() => dispatch(futuresSlice.actions.setPosition(null))}>
                <Box width={width} height={height} backgroundColor={'red'} opacity={0} />
            </Pressable>
            <Box
                backgroundColor={theme.bg}
                absolute
                width={width}
                bottom={0}
                paddingBottom={50}
                borderTopLeftRadius={RADIUS_CONTENT}
                borderTopRightRadius={RADIUS_CONTENT}
                paddingTop={10}
                paddingHorizontal={15}
            >
                <ClosePosition {...{ dispatch, theme, t }} />
                <PriceClose {...{ position, t, theme }} />
                <TypePrice {...{ price, setPrice, typeTrade, setTypeTrade, theme, t }} />
                <AmountClose {...{ percent, setPercent, position, theme, t }} />
                <ProfitClose {...{ position, theme, t }} />
                <Btn
                    height={35}
                    marginTop={20}
                    disabled={loading}
                    onPress={handleClosePosition}
                    backgroundColor={colors.yellow}
                >
                    {loading ? <LoadingBlack /> : <Txt fontFamily={fonts.RM}>{t('Confirm')}</Txt>}
                </Btn>
            </Box>
        </Modality>
    )
}

export default ModalClosePosition