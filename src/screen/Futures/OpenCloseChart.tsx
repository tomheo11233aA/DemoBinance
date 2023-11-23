import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import { symbolFuturesSelector } from '@selector/futuresSelector'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable } from 'react-native'
import Chart from './Chart'
import { useNavigation } from '@react-navigation/native'

const OpenCloseChart = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const [openChart, setOpenChart] = useState(false)
    const symbol = useAppSelector(symbolFuturesSelector)

    const navigation = useNavigation()

    useEffect(() => {
        navigation.addListener('focus', () => {
            if (openChart) {
                setOpenChart(false)
            }
        })
    }, [])

    return (
        <>
            {!openChart ?
                <Pressable
                    onPress={() => setOpenChart(true)}
                >
                    <Box
                        row
                        justifySpaceBetween
                        paddingHorizontal={10}
                        backgroundColor={theme.bg}
                        borderTopWidth={0.5}
                        borderColor={theme.gray2}
                        borderBottomWidth={0.5}
                        paddingVertical={7}
                    >
                        <Txt size={12} fontFamily={fonts.SGM} color={theme.black}>
                            {`${symbol} ${t('Perpetual Chart')}`}
                        </Txt>
                        <Box rotateZ={'90deg'}>
                            <Icon
                                size={14}
                                source={require('@images/back.png')}
                            />
                        </Box>
                    </Box>
                </Pressable> :
                <Chart {...{ setOpenChart }} />
            }
        </>
    )
}

export default OpenCloseChart