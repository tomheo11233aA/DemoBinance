import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Text, View } from 'react-native'

const ItemMoment = ({ item, t }: any) => {
    const number = item.day.slice(0, item.day.indexOf(" "))
    const text = item.day.slice(item.day.indexOf(" "), item.day.length)
    const n = Number.isNaN(number / 2)

    return (
        <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text
                    style={{
                        fontWeight: '400',
                        fontSize: n ? 9 : 11,
                        opacity: n ? 1 : 0.9,
                        color: colors.grayBlue,
                        transform: [{ scaleX: n ? 1 : 1.01 }],
                        fontFamily: n ? fonts.IBMPR : fonts.M17,
                    }}
                >
                    {t(number)}
                </Text>
                <Text
                    style={{
                        fontSize: 9,
                        color: colors.grayBlue,
                        fontFamily: fonts.IBMPR,
                    }}
                >
                    {t(text)}
                </Text>
            </View>

            <Text
                style={{
                    fontSize: 9,
                    fontFamily: fonts.M17,
                    color: item.value >= 0 ? colors.greenCan : colors.redCan,
                }}>
                {item.value}
                <Text
                    style={{
                        fontSize: 7,
                        fontFamily: fonts.IBMPM,
                    }}
                >
                    {'%'}
                </Text>
            </Text>
        </View>
    )
}

export default ItemMoment