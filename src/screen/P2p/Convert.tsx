import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import Back from '@reuse/Back'
import { fonts } from '@theme/fonts'
import React from 'react'

const Convert = () => {
    return (
        <Box row justifySpaceBetween alignCenter>
            <Back size={16} color='#929a8b' />
            <Box
                row
                radius={20}
                alignCenter
                paddingVertical={5}
                paddingHorizontal={15}
                backgroundColor={'#fcdf67'}
            >
                <Txt fontFamily={fonts.IBMPM} size={13}>VND</Txt>
                <Icon
                    tintColor={'#93988a'}
                    source={require('@images/trade/convert.png')}
                    size={12}
                    marginLeft={5}
                />
            </Box>
        </Box>
    )
}

export default Convert