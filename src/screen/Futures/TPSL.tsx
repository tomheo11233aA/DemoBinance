import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppSelector } from '@hooks/index'
import BoxLine from '@reuse/BoxLine'
import { slFutureSelector, tpFutureSelector } from '@selector/futuresSelector'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, StyleSheet, TextInput } from 'react-native'
import { useDispatch } from 'react-redux'
import { ITriggerTPSL } from 'src/model/futuresModel'
import MarkLastPrice from './MarkLastPrice'

interface Props {
    theme: any;
    triggerTPSL: ITriggerTPSL;
}

const TPSL = ({ triggerTPSL, theme }: Props) => {
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const tp = useAppSelector(tpFutureSelector)
    const sl = useAppSelector(slFutureSelector)

    const tpsl = triggerTPSL.tpsl

    return (
        <Box zIndex={1}>
            <Box row justifySpaceBetween zIndex={1}>
                <Btn
                    row
                    alignEnd
                    marginBottom={10}
                    alignSelf={'flex-start'}
                    onPress={() => {
                        dispatch(futuresSlice.actions.setTriggerTPSL({
                            ...triggerTPSL,
                            tpsl: (tpsl === 'RO' || tpsl === '') ? 'TPSL' : ''
                        }))
                    }}
                >
                    {tpsl === 'TPSL' ?
                        <Box
                            width={12}
                            height={12}
                            radius={50}
                            alignCenter
                            justifyCenter
                            marginRight={7}
                            borderColor={theme.gray6}
                            backgroundColor={colors.yellow}
                        >
                            <Txt size={10} color={colors.white}>✓</Txt>
                        </Box>
                        :
                        <Box
                            width={12}
                            height={12}
                            radius={50}
                            borderWidth={1}
                            marginRight={7}
                            borderColor={theme.gray6}
                            backgroundColor={theme.gray3}
                        />
                    }

                    <BoxLine title={'TP/SL'} />
                </Btn>
                {tpsl === 'TPSL' &&
                    // <Txt color={colors.yellowBold} size={12} fontFamily={fonts.RM}>{t('Advanced')}</Txt>
                    <MarkLastPrice />
                }
            </Box>

            {tpsl === 'TPSL' &&
                <Box row marginBottom={10}>
                    <TextInput
                        value={tp.toString()}
                        onChangeText={(txt: string) => {
                            dispatch(futuresSlice.actions.setTP(txt))
                        }}
                        style={
                            [styles.input, {
                                color: theme.black,
                                backgroundColor: theme.gray2,
                                fontSize: tp.toString() === '' ? 15 : 18,
                                textAlign: tp.toString().length < 10 ? 'center' : 'auto',
                                fontFamily: tp.toString() === '' ? fonts.RM : 'Myfont20-Regular',
                            }]
                        }
                        keyboardType={'decimal-pad'}
                        selectionColor={colors.yellow}
                        placeholder={t('Take Profit')}
                        placeholderTextColor={colors.grayBlue}
                    />
                    <TextInput
                        value={sl.toString()}
                        onChangeText={(txt: string) => {
                            dispatch(futuresSlice.actions.setSL(txt))
                        }}
                        style={
                            [styles.input, {
                                marginLeft: 7,
                                color: theme.black,
                                backgroundColor: theme.gray2,
                                fontSize: sl.toString() === '' ? 15 : 18,
                                textAlign: sl.toString().length < 10 ? 'center' : 'auto',
                                fontFamily: sl.toString() === '' ? fonts.RM : 'Myfont20-Regular',
                            }]
                        }
                        placeholder={t('Stop Loss')}
                        keyboardType={'decimal-pad'}
                        selectionColor={colors.yellow}
                        placeholderTextColor={colors.grayBlue}
                    />
                </Box>
            }
        </Box>
    )
}

export default TPSL

const styles = StyleSheet.create({
    input: {
        flex: 1,
        paddingHorizontal: 5,
        height: Platform.OS === 'ios' ? 40 : 40,
    },
})