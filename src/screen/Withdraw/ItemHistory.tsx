import React from 'react'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { converNetwork } from '@method/format'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import { colors } from '@theme/colors'

export const THEME = {
    SUCCESS: {
        text: 'Success',
        color: 'white',
        border: '#274916',
        background: colors.greenCan,
    },
    CANCEL: {
        text: 'Cancell',
        color: 'white',
        border: '#58181c',
        background: '#fe5877',
    },
}

const ItemHistory = ({ history, onShowDetailHistory, t }: any) => {
    const sizeText = 13

    const status = history?.status === 1 ? THEME.SUCCESS : THEME.CANCEL

    return (
        <Box
            row
            alignCenter
            height={45}
            borderBottomWidth={0.5}
            borderColor={colors.gray2}
        >
            <Box
                paddingHorizontal={5}
                width={'29%'}
            >
                <Txt size={sizeText}>{converNetwork(history?.network)}</Txt>
            </Box>

            <Box
                paddingHorizontal={5}
                width={'29%'}
            >
                <Txt size={sizeText} bold color={colors.greenCan}>${history?.amount}</Txt>
            </Box>

            <Box
                paddingHorizontal={5}
                width={'29%'}
            >
                <Box
                    alignSelf={'flex-start'}
                    alignCenter
                    justifyCenter
                    padding={3}
                    radius={5}
                    backgroundColor={status.background}
                >
                    <Txt size={sizeText} color={status.color}>{t(status.text)}</Txt>
                </Box>
            </Box>

            <Box
                alignCenter
                width={'13%'}
            >
                <Btn
                    onPress={() => onShowDetailHistory(history)}
                    style={{
                        transform: [
                            { rotateZ: '180deg' }
                        ]
                    }}
                >
                    <Img
                        source={require('@images/back.png')}
                        width={15}
                        height={15}
                    />
                </Btn>
            </Box>
        </Box>
    )
}

export default ItemHistory