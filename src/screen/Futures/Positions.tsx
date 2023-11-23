import { closeMarketFutureAllThunk, closeMarketFutureThunk } from '@asyncThunk/futuresAsyncThunk'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import NotPosition from '@reuse/NotPosition'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import futuresSlice from '@slice/futuresSlice'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, ScrollView } from 'react-native'
import { IPositions } from 'src/model/futuresModel'
import { Profile } from 'src/model/userModel'
import ItemPosition from './ItemPosition'
import ModalCloseAllPosition from './ModalCloseAllPosition'
import { navigate } from '@navigation/navigationRef'
import { screen } from '@util/screens'

interface Props {
    positions: IPositions[];
}

const Positions = ({ positions }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const coins = useAppSelector(coinsFuturesChartSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    const [isShowModalCloseAllPosition, setShowModalCloseAllPosition] = useState(false)

    const handleClosePosition = async (id: number) => {
        const { payload } = await dispatch(closeMarketFutureThunk(id))
        if (payload.status) {
            await dispatch(getProfileThunk())
        } else {
            Alert.alert(payload.message)
        }
    }

    const handleCloseAll = async () => {
        setShowModalCloseAllPosition(true)
    }

    const closeAllPosition = async () => {
        const { payload } = await dispatch(closeMarketFutureAllThunk())
        if (payload.status) {
            await dispatch(getProfileThunk())
        }
        if (payload.error) {
            Alert.alert(t(payload.message))
        }
        setShowModalCloseAllPosition(false)
    }

    const handleSetClosePosition = async (position: IPositions) => {
        dispatch(futuresSlice.actions.setPosition(position))
    }

    const handleSetShowModalCore = async (position: IPositions) => {
        dispatch(futuresSlice.actions.setLeverAdjustment({
            showModal: true,
            core: position.core,
            idPosition: position.id,
        }))
    }

    const handleShowModalStopProfit = async (position: IPositions) => {
        dispatch(futuresSlice.actions.setStopProfit({
            showModal: true,
            position: position,
        }))
    }

    const handleShowModalTPSLPosition = async (position: IPositions) => {
        dispatch(futuresSlice.actions.setTPSLPosition({
            position,
            showModal: true,
        }))
    }

    const handleMoveOnTrade = async (position: IPositions) => {
        dispatch(futuresSlice.actions.setSymbol({
            symbol: position.symbol,
            currency: position.symbol.replace('USDT', '')
        }))
        navigate(screen.TRADE)
    }

    return (
        <>
            {positions.length > 0 ?
                <Box>
                    <Box row alignCenter justifySpaceBetween marginTop={10}>
                        <Box row alignCenter>
                            <Box
                                width={14}
                                height={14}
                                radius={50}
                                borderWidth={1}
                                marginRight={10}
                                borderColor={theme.gray7}
                                backgroundColor={theme.gray2}
                            />
                            <Txt color={theme.black}>{t('Hide Other Symbols')}</Txt>
                        </Box>
                        <Btn
                            radius={3}
                            paddingVertical={7}
                            paddingHorizontal={10}
                            onPress={handleCloseAll}
                            backgroundColor={theme.gray2}
                        >
                            <Txt size={12} fontFamily={fonts.SGM} color={theme.black}>
                                {t('Close All')}
                            </Txt>
                        </Btn>
                    </Box>
                    <ScrollView
                        contentContainerStyle={{
                            backgroundColor: theme.bg,
                        }}
                    >
                        {positions.map((item: IPositions) =>
                            <ItemPosition
                                t={t}
                                item={item}
                                coins={coins}
                                theme={theme}
                                key={item.id}
                                profile={profile}
                                onMoveOnTrade={handleMoveOnTrade}
                                onClosePosition={handleClosePosition}
                                onSetClosePosition={handleSetClosePosition}
                                onSetShowModalCore={handleSetShowModalCore}
                                onShowModalStopProfit={handleShowModalStopProfit}
                                onShowModalTPSLPosition={handleShowModalTPSLPosition}
                            />
                        )}
                    </ScrollView>
                </Box>
                :
                <NotPosition />
            }
            <ModalCloseAllPosition
                show={isShowModalCloseAllPosition}
                setShow={setShowModalCloseAllPosition}
                closeAllPosition={closeAllPosition}
            />
        </>
    )
}

export default Positions

