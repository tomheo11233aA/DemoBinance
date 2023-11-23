import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import React from 'react'

interface Props {
    t: any;
    item: any;
    theme: any;
    type: string;
    onSetType: Function;
}

const ItemModalType = ({
    t,
    item,
    type,
    theme,
    onSetType,
}: Props) => {
    return (
        <Btn
            justifySpaceBetween
            paddingVertical={20}
            borderBottomWidth={1}
            borderColor={theme.gray2}
            onPress={() => onSetType(item)}
        >
            <Txt color={type === item ? colors.yellow : colors.grayBlue}>
                {t(item)}
            </Txt>
        </Btn>
    )
}

export default ItemModalType