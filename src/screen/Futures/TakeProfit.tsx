import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Icon from '@commom/Icon';
import Input from '@commom/Input';
import Txt from '@commom/Txt';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import React, { useState } from 'react';
import EditText from './EditText';
import { StyleSheet, TextInput } from 'react-native';
import { calcPNL, numberCommasDot } from '@method/format';

const TakeProfit = ({ theme, t, tp, setTP, position }: any) => {
    const [show, setShow] = useState(true)

    const handleMinus = () => {
        const value = Number(tp.value) - 1
        if (!isNaN(Number(value)) && Number(value) >= 0) {
            setTP({ ...tp, value })
        }
    }

    const handlePlus = () => {
        const value = Number(tp.value) + 1
        if (!isNaN(Number(value))) {
            setTP({ ...tp, value: String(value) })
        }
    }

    const typeTigger = [
        { title: 'Mark Price', value: 'Mark' },
        { title: 'Last Price', value: 'Last' },
    ]

    let pnl: any = tp.value ? calcPNL(position, tp.value) : '--'
    const color = Number(pnl) >= 0 ? colors.green2 : colors.red3
    pnl = !isNaN(Number(pnl)) ? numberCommasDot(pnl.toFixed(3)) : '--'

    return (
        <Box marginTop={30} zIndex={1}>
            <Btn
                row
                alignCenter
                justifyStart
                onPress={() => setShow(!show)}
            >
                <Box
                    width={15}
                    height={15}
                    radius={50}
                    alignCenter
                    justifyCenter
                    marginRight={7}
                    borderWidth={1}
                    borderColor={theme.gray}
                    backgroundColor={show ? colors.yellow : theme.bg}
                >
                    {show &&
                        <Txt size={10} color={theme.bg} bold>
                            ✓
                        </Txt>
                    }
                </Box>
                <Txt
                    color={theme.black}
                    fontFamily={fonts.IBMPM}
                >
                    {t('Take Profit')}
                </Txt>
            </Btn>
            {show &&
                <Box>
                    <Box row marginTop={20}>
                        <EditText
                            value={tp.value}
                            onPlus={handlePlus}
                            onMinus={handleMinus}
                            placeholder={`${t('Take Profit')} (USDT)`}
                            setValue={(txt: string) => setTP({ ...tp, value: txt })}
                        />
                        <Box
                            row
                            radius={3}
                            height={40}
                            alignCenter
                            width={'25%'}
                            marginLeft={10}
                            justifySpaceBetween
                            paddingHorizontal={10}
                            backgroundColor={theme.gray2}
                        >
                            <TextInput
                                defaultValue='0'
                                keyboardType={'numeric'}
                                selectionColor={colors.yellow}
                                placeholderTextColor={colors.grayBlue}
                                style={{
                                    flex: 1,
                                    fontSize: 16,
                                    height: '100%',
                                    color: theme.black,
                                    textAlign: 'center',
                                    fontFamily: fonts.M24,
                                }}
                            />
                            <Txt color={theme.black} fontFamily={fonts.AS}>
                                %
                            </Txt>
                        </Box>
                    </Box>

                    <Box row marginTop={10}>
                        <Box flex={1} backgroundColor={theme.gray} radius={3}>
                            <Input
                                height={40}
                                font={fonts.RM}
                                disabled={false}
                                color={theme.black}
                                textAlign={'center'}
                                hint={t('Market Price')}
                                keyboardType={'numeric'}
                                hintColor={colors.grayBlue}
                            />
                        </Box>

                        <Box
                            radius={3}
                            height={40}
                            alignCenter
                            justifyCenter
                            width={'25%'}
                            marginLeft={10}
                            paddingHorizontal={10}
                            backgroundColor={theme.gray2}
                        >
                            <Txt
                                fontFamily={fonts.IBMPM}
                                color={colors.grayBlue}
                            >
                                {t('Market')}
                            </Txt>
                        </Box>
                    </Box>

                    <Box marginTop={20}>
                        <Txt style={[styles.textGray, { height: 80 }]}>
                            {t('When')}
                            <Box marginBottom={-2}>
                                <Btn onPress={() => setTP({ ...tp, down: !tp.down })}>
                                    <Txt color={colors.yellow} size={12}>
                                        {t(` ${tp.type + ' Price'} `)}
                                        <Icon
                                            size={8}
                                            tintColor={colors.yellow}
                                            source={require('@images/trade/more.png')}
                                        />
                                    </Txt>
                                </Btn>

                                {tp.down &&
                                    <Box
                                        absolute
                                        top={20}
                                        backgroundColor={theme.gray2}
                                        width={120}
                                    >
                                        {typeTigger.map((item) =>
                                            <Btn
                                                key={item.title}
                                                paddingVertical={5}
                                                paddingHorizontal={10}
                                                onPress={() => setTP({ ...tp, type: item.value, down: false })}
                                            >
                                                <Txt
                                                    size={12}
                                                    fontFamily={fonts.IBMPR}
                                                    color={item.value === tp.type ? colors.yellow : colors.grayBlue}
                                                >
                                                    {item.title}
                                                </Txt>
                                            </Btn>
                                        )}
                                    </Box>
                                }
                            </Box>

                            <Txt style={styles.textGray}>
                                {` ${t('reaches')} `}
                            </Txt>
                            <Txt color={theme.black} fontFamily={fonts.M17}>
                                {tp.value ? numberCommasDot(Number(tp.value).toFixed(3)) : ' -- '}
                            </Txt>
                            <Txt style={styles.textGray}>
                                {`, ${t('it will trigger')}`}
                            </Txt>
                            <Txt color={theme.black} size={12}>
                                {`${t(' Market ')}`}
                            </Txt>
                            <Txt style={styles.textGray}>
                                {`${t('order and the estimated PNL will be')}`}
                            </Txt>
                            <Txt color={color} fontFamily={fonts.M17}>
                                {` ${pnl} `}
                            </Txt>
                            <Txt color={color} size={12}>
                                {' USDT.'}
                            </Txt>
                        </Txt>
                    </Box>
                </Box>
            }
        </Box>
    )
}

export default TakeProfit

const styles = StyleSheet.create({
    textGray: {
        fontSize: 12,
        color: colors.grayBlue,
        fontFamily: fonts.IBMPR,
    }
})