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
import { TextInput } from 'react-native'

interface Props {
    tpsl: any;
    zIndex?: number;
    setTPSL: Function;
    onChangeText: (txt: string) => void;
}

const InputTPSLPosition = ({
    tpsl,
    setTPSL,
    zIndex = 1,
    onChangeText,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const type = ['USDT', '%']
    const price = [
        { title: 'Mark Price', value: 'Mark' },
        { title: 'Last Price', value: 'Last' },
    ]

    const open = false

    return (
        <Box row marginTop={15} zIndex={zIndex}>
            <Box width={'60%'} marginRight={10}>
                <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM}>
                    {t('Take Profit')}
                </Txt>
                <Box
                    row
                    height={40}
                    marginTop={5}
                    backgroundColor={theme.gray2}
                >
                    <Box flex={1}>
                        <TextInput
                            value={tpsl.value}
                            onChangeText={onChangeText}
                            style={{
                                flex: 1,
                                color: theme.black,
                                paddingHorizontal: 10,
                                fontSize: tpsl.value.toString() === '' ? 15 : 18,
                                fontFamily: tpsl.value.toString() === '' ? fonts.RM : 'Myfont20-Regular',
                            }}
                            numberOfLines={1}
                            keyboardType={'decimal-pad'}
                            selectionColor={colors.yellow}
                            placeholder={t('Trigger Price')}
                            placeholderTextColor={colors.grayBlue}
                        />
                    </Box>

                    <Box width={60}>
                        <Btn
                            row
                            height={40}
                            alignCenter
                            justifySpaceBetween
                        >
                            <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM}>
                                USDT
                            </Txt>
                            <Icon
                                size={14}
                                source={require('@images/trade/more.png')}
                            />
                        </Btn>

                        {open &&
                            <Box
                                top={45}
                                absolute
                                right={0}
                                style={styled.shadow}
                                backgroundColor={theme.bg}
                                zIndex={2}
                            >
                                {type.map((item) =>
                                    <Btn
                                        key={item}
                                        width={100}
                                        alignCenter
                                        paddingVertical={7}
                                    >
                                        <Txt
                                            fontFamily={fonts.IBMPM}
                                            color={item === 'USDT' ? colors.yellow : colors.grayBlue}
                                        >
                                            {item}
                                        </Txt>
                                    </Btn>
                                )}
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>

            <Box flex={1}>
                <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM}>
                    {t('Trigger Type')}
                </Txt>

                <Box
                    flex={1}
                    marginTop={5}
                    backgroundColor={theme.gray2}
                >
                    <Btn
                        row
                        alignCenter
                        height={40}
                        justifySpaceBetween
                        paddingHorizontal={10}
                        onPress={() => setTPSL({ ...tpsl, down: !tpsl.down })}
                    >
                        <Txt color={theme.black} fontFamily={fonts.IBMPM}>
                            {t(tpsl.type === 'Mark' ? 'Mark Price' : 'Last Price')}
                        </Txt>
                        <Icon
                            size={14}
                            source={require('@images/trade/more.png')}
                        />
                    </Btn>

                    {tpsl.down &&
                        <Box
                            top={45}
                            absolute
                            style={styled.shadow}
                            backgroundColor={theme.bg}
                        >
                            {price.map((item) =>
                                <Btn
                                    key={item.title}
                                    paddingVertical={7}
                                    paddingHorizontal={15}
                                    onPress={() => setTPSL({ ...tpsl, type: item.value, down: false })}
                                >
                                    <Txt
                                        fontFamily={fonts.IBMPM}
                                        color={item.value === tpsl.type ? colors.yellow : colors.grayBlue}
                                    >
                                        {t(item.title)}
                                    </Txt>
                                </Btn>
                            )}
                        </Box>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default InputTPSLPosition