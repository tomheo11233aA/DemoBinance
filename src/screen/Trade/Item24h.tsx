import { useTheme } from '@hooks/index'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Text, View } from 'react-native'

interface Props {
    title: any | string;
    value: string;
    topValue?: number;
    marginTop?: number;
}

const Item24h = ({ title, value, topValue = 0, marginTop = 0 }: Props) => {
    const theme = useTheme()

    const number = title.slice(0, 2)
    const text = title.slice(2, title.length)

    return (
        <View style={{ marginVertical: 5, marginTop }}>
            <Text
                style={{
                    fontSize: 11,
                    fontFamily: fonts.M17,
                    color: '#7c828e',
                }}
            >
                {number}
                <Text
                    style={{
                        fontSize: 9,
                        fontFamily: fonts.IBMPR,
                        color: '#7c828e',
                    }}
                >
                    {text}
                </Text>
            </Text>
            <Text
                style={{
                    fontSize: 10,
                    color: theme.black,
                    fontFamily: fonts.M23,
                    marginTop: topValue + 3,
                }}
            >
                {value.replace('M', '')}
                {value.includes('M') &&
                    <Text style={{
                        color: theme.black,
                        fontSize: 9,
                        fontFamily: fonts.FSCR,
                    }}>
                        M
                    </Text>
                }
            </Text>
        </View>
    )
}

export default Item24h