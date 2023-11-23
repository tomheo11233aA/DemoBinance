import { getWalletThunk } from '@asyncThunk/spotAsyncThunk'
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { convertAvblSpot, numberCommasDot } from '@method/format'
import { coinChoosedSpotSelector, sideSpotSelector, walletSpotSelector } from '@selector/spotSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect } from 'react'

const Avbl = ({ theme, t }: any) => {
    const dispatch = useAppDispatch()
    const side = useAppSelector(sideSpotSelector)
    const wallet = useAppSelector(walletSpotSelector)
    const coinChoosed = useAppSelector(coinChoosedSpotSelector)

    useEffect(() => {
        handleGetWallet()
    }, [])

    const handleGetWallet = async () => {
        await dispatch(getWalletThunk())
    }

    const avbl = convertAvblSpot(side, wallet, coinChoosed.currency)

    return (
        <Box
            row
            alignCenter
            marginTop={10}
            justifySpaceBetween
        >
            <Txt color={colors.gray5} size={12}>
                {t('Avbl')}
            </Txt>

            <Box row>
                <Txt size={13} fontFamily={'Myfont21-Regular'} color={theme.black}>
                    {numberCommasDot(avbl.toFixed(3))}
                    <Txt size={11} fontFamily={fonts.IBMPR} color={theme.black}>
                        {side === 'buy' ? ' USDT' : ` ${coinChoosed.currency}`}
                    </Txt>
                </Txt>

                <Icon
                    source={require('@images/trade/plus.png')}
                    size={11}
                    resizeMode={'contain'}
                    marginLeft={5}
                    marginTop={2}
                />
            </Box>
        </Box>
    )
}

export default Avbl