import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const ItemHistory = ({ history, t, theme }: any) => {
    return (
        <TouchableOpacity style={{ alignItems: 'center' }}>
            <Text
                style={{
                    color: history.id === 0 ? theme.black : colors.grayBlue,
                    marginHorizontal: 5,
                    fontFamily: fonts.IBMPM,
                    fontSize: 14.5,
                }}
            >
                {t(history.name)}
            </Text>
            {history.id === 0 &&
                <View
                    style={{
                        width: 30,
                        height: 3,
                        backgroundColor: colors.yellow,
                        marginTop: 5,
                    }}
                />
            }
        </TouchableOpacity>
    )
}

export default ItemHistory