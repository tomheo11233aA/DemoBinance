import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import { goBack } from '@navigation/navigationRef'
import React from 'react'

interface Props {
    size?: number,
    color?: string,
}

const Back = ({ size = 20, color }: Props) => {
    return (
        <Btn
            onPress={() => goBack()}
            width={20}
        >
            <Icon
                source={require('@images/back2.png')}
                size={size}
                resizeMode={'contain'}
                tintColor={color}
            />
        </Btn>
    )
}

export default Back