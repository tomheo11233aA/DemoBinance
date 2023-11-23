import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { converNetwork } from '@method/format'
import { colors } from '@theme/colors'
import React from 'react'

const ItemHistory = ({ history, onShowDetailHistory, t }: any) => {
    const sizeText = 13

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
                <Txt size={sizeText}>{converNetwork(history?.coin_key)}</Txt>
            </Box>

            <Box
                paddingHorizontal={5}
                width={'29%'}
            >
                <Txt size={sizeText} bold color={colors.greenCan}>
                    ${history?.amount}
                </Txt>
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
                    backgroundColor={colors.yellow}
                >
                    <Txt size={sizeText} color={colors.white}>{t('Success')}</Txt>
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