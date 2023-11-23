import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import Modality from '@reuse/Modality'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { height, width } from '@util/responsive'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable } from 'react-native'
import { listDay } from '.'
import { dayChoosedCopyTradeSelector, showModalListDayCopyTradeSelector } from '@selector/copyTradeSelector'
import Btn from '@commom/Btn'
import { setDayChoosed, setShowModalListDay } from '@slice/copyTradeSlice'

const ModalShowDay = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const dayChoosed = useAppSelector(dayChoosedCopyTradeSelector)
    const showModalListDay = useAppSelector(showModalListDayCopyTradeSelector)

    return (
        <Modality
            close={false}
            show={showModalListDay}
        >
            <Pressable
                onPress={() => dispatch(setShowModalListDay(false))}
            >
                <Box width={width} height={height} opacity={0} />
            </Pressable>
            <Box
                absolute
                bottom={0}
                width={width}
                paddingTop={30}
                paddingBottom={40}
                paddingHorizontal={30}
                borderTopLeftRadius={10}
                borderTopRightRadius={10}
                backgroundColor={theme.bg}
            >
                {listDay.map((item) => {
                    return (
                        <Btn
                            row
                            radius={5}
                            padding={15}
                            key={item.value}
                            marginVertical={5}
                            justifySpaceBetween
                            onPress={() => dispatch(setDayChoosed(item.value))}
                            backgroundColor={dayChoosed == item.value ? theme.gray2 : theme.bg}
                        >
                            <Txt color={theme.black} fontFamily={fonts.IBMPR}>
                                {t(item.title)}
                            </Txt>
                            {dayChoosed == item.value &&
                                <Txt color={colors.yellow}>✓</Txt>
                            }
                        </Btn>
                    )
                })}
            </Box>
        </Modality>
    )
}

export default ModalShowDay