import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import React from 'react'
import { ICoins } from 'src/model/futuresModel'
import CoinItem from './CoinItem'
import { coinsSpotSelector } from '@selector/spotSelector'
import { setCoinChoosed } from '@slice/spotSlice'

const ListCoin = ({ close }: { close: Function }) => {
    const theme = useTheme()
    const dispatch = useAppDispatch()
    const coins = useAppSelector(coinsSpotSelector)

    const handleChooseCoin = (coin: ICoins) => {
        dispatch(setCoinChoosed(coin))
        close()
    }

    return (
        <Box paddingHorizontal={15}>
            <Box row alignCenter justifySpaceBetween marginTop={10}>
                <Box row alignCenter>
                    <Txt size={11} color={colors.gray5}>Name</Txt>
                    <Icon
                        source={require('@images/future/updown.png')}
                        size={10}
                        resizeMode={'contain'}
                    />
                </Box>

                <Box row alignCenter>
                    <Box row alignCenter>
                        <Txt size={11} color={colors.gray5}>Price</Txt>
                        <Icon
                            source={require('@images/future/updown.png')}
                            size={10}
                            resizeMode={'contain'}
                        />
                    </Box>

                    <Box row alignCenter>
                        <Txt size={11} color={colors.gray5}>/ Vol 24h</Txt>
                        <Icon
                            source={require('@images/future/updown.png')}
                            size={10}
                            resizeMode={'contain'}
                        />
                    </Box>
                </Box>
            </Box>

            <Box marginTop={5}>
                {coins.map((coin: ICoins) =>
                    <CoinItem
                        key={coin.id}
                        coin={coin}
                        theme={theme}
                        onChooseCoin={handleChooseCoin}
                    />
                )}
            </Box>
        </Box>
    )
}

export default ListCoin