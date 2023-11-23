import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { Pressable } from 'react-native'
import Chart from './Chart'
import { coinChoosedSpotSelector } from '@selector/spotSelector'
import { useTranslation } from 'react-i18next'

const OpenCloseChart = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const [openChart, setOpenChart] = useState(false)
    const coinChoosed = useAppSelector(coinChoosedSpotSelector)

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
                            {`${coinChoosed.currency + '/USDT'} ${t('Chart')}`}
                        </Txt>
                        <Box rotateZ={'90deg'}>
                            <Icon
                                source={require('@images/back.png')}
                                size={14}
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