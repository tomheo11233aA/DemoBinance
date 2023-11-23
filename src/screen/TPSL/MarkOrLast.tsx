import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { styled } from '@theme/styled'
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

interface Props {
    trigger: any;
    setTrigger: Function;
}

const MarkOrLast = ({
    trigger,
    setTrigger,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box marginTop={7} width={'100%'}>
            <Box absolute width={'100%'}>
                <Btn
                    row
                    radius={3}
                    justifyStart
                    width={'100%'}
                    paddingVertical={3}
                    paddingHorizontal={5}
                    backgroundColor={theme.gray}
                    onPress={() => {
                        setTrigger({ ...trigger, show: !trigger.show })
                    }}
                >
                    <Txt fontFamily={fonts.IBMPR} size={12} color={theme.black}>
                        {t(trigger.value)}
                    </Txt>
                    <Icon
                        size={12}
                        source={require('@images/trade/more.png')}
                    />
                </Btn>

                {trigger.show &&
                    <Box
                        marginTop={3}
                        width={'100%'}
                        style={styled.shadow}
                        alignSelf={'flex-start'}
                        backgroundColor={theme.bg}
                    >
                        {data.map((item: any) =>
                            <Btn
                                key={item.title}
                                paddingVertical={7}
                                paddingHorizontal={5}
                                onPress={() => setTrigger({ value: item.value, show: false })}
                            >
                                <Txt
                                    size={12}
                                    fontFamily={fonts.IBMPR}
                                    color={item.value === trigger.value ? colors.yellow : colors.grayBlue}
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

export default MarkOrLast