import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import React from 'react'
import { ICoins } from 'src/model/futuresModel'

interface Props {
    theme: any;
    type: string;
    coin: ICoins;
    onSetType: Function;
}

const ItemModalAsset = ({
    coin,
    type,
    theme,
    onSetType,
}: Props) => {
    return (
        <Btn
            row
            justifySpaceBetween
            paddingVertical={20}
            borderBottomWidth={1}
            borderColor={theme.gray2}
            onPress={() => onSetType(coin.symbol)}
        >
            <Txt color={colors.grayBlue}>
                {coin.currency}
            </Txt>
            {coin.symbol === type &&
                <Txt size={15} bold color={colors.yellow}>
                    ✓
                </Txt>
            }
        </Btn>
    )
}

export default ItemModalAsset