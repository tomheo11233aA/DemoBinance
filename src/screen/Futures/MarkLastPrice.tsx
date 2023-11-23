import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { triggerTPSLFutureSelector } from '@selector/futuresSelector'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface IData {
    title: string;
    value: 'Mark' | 'Last';
}

const data: IData[] = [
    { title: 'Mark Price', value: 'Mark' },
    { title: 'Last Price', value: 'Last' },
]

const MarkLastPrice = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const triggerTPSL = useAppSelector(triggerTPSLFutureSelector)

    return (
        <Box flex={1} alignEnd>
            <Box absolute>
                <Btn
                    onPress={() => {
                        dispatch(futuresSlice.actions.setTriggerTPSL({
                            tpsl: triggerTPSL.tpsl,
                            value: triggerTPSL.value,
                            showOption: !triggerTPSL.showOption,
                        }))
                    }}
                    row
                    radius={3}
                    alignCenter
                    paddingVertical={3}
                    paddingHorizontal={7}
                    alignSelf={'flex-end'}
                    backgroundColor={theme.gray2}
                >
                    <Txt
                        size={11}
                        color={theme.black}
                        fontFamily={fonts.IBMPM}
                    >
                        {t(triggerTPSL.value)}
                    </Txt>
                    <Icon
                        size={12}
                        source={require('@images/trade/more.png')}
                    />
                </Btn>

                {triggerTPSL.showOption &&
                    <Box
                        marginTop={5}
                        paddingHorizontal={25}
                        backgroundColor={theme.gray}
                    >
                        {data.map((item) =>
                            <Btn
                                onPress={() => {
                                    dispatch(futuresSlice.actions.setTriggerTPSL({
                                        showOption: false,
                                        value: item.value,
                                        tpsl: triggerTPSL.tpsl,
                                    }))
                                }}
                                key={item.title}
                                paddingVertical={10}
                            >
                                <Txt
                                    size={11}
                                    fontFamily={fonts.IBMPM}
                                    color={triggerTPSL.value === item.value ? colors.yellow : colors.grayBlue}
                                >
                                    {t(item.title)}
                                </Txt>
                            </Btn>
                        )}
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default MarkLastPrice