import { getPositionThunk } from '@asyncThunk/futuresAsyncThunk'
import Box from '@commom/Box'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import NotPosition from '@reuse/NotPosition'
import ItemPosition from '@screen/Futures/ItemPosition'
import { coinsFuturesChartSelector, positionsFuturesSelector, symbolFuturesSelector } from '@selector/futuresSelector'
import { profileUserSelector } from '@selector/userSelector'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { IPositions } from 'src/model/futuresModel'
import { Profile } from 'src/model/userModel'

const PositionsFuture = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const symbol = useAppSelector(symbolFuturesSelector)
    const coins = useAppSelector(coinsFuturesChartSelector)
    const positions = useAppSelector(positionsFuturesSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    useEffect(() => {
        handleGetPosition()
    }, [profile])

    const handleGetPosition = async () => {
        await dispatch(getPositionThunk(symbol))
    }

    return (
        <>
            {positions.length > 0 ?
                <Box>
                    {positions.map((item: IPositions) =>
                        <ItemPosition
                            t={t}
                            key={item.id}
                            item={item}
                            coins={coins}
                            profile={profile}
                            theme={theme}
                        />
                    )}
                </Box>
                :
                <NotPosition />
            }
        </>
    )
}

export default PositionsFuture

