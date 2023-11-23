import { checkTransactionDepositVndThunk, getBankingThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { bankChoosedFundingSelector } from '@selector/fundingSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { styled } from '@theme/styled'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, Text, TextInput } from 'react-native'
import ModalBanking from './ModalBanking'
import { createDepositVND } from '@service/fundingService'
import LoadingWhite from '@reuse/LoadingWhite'
import { cannotConnect } from '@method/alert'

const Form = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const bankChoosed = useAppSelector(bankChoosedFundingSelector)

    const [amount, setAmount] = useState<string>('')
    const [isShowModalBank, setShowModalBank] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        handleGetBanking()
    }, [])

    const handleGetBanking = async () => {
        dispatch(getBankingThunk())
    }

    const handleCreateDepositVND = async () => {
        if (amount.trim() === '') {
            return Alert.alert(t('Amount is empty'))
        }
        setLoading(true)
        const res = await createDepositVND({
            idBanking: bankChoosed?.id || '',
            amount: amount,
            message: (Math.floor(100000 + Math.random() * 900000)).toString(),
        })
        if (!res.error) {
            if (res.status) {
                dispatch(checkTransactionDepositVndThunk())
            } else {
                Alert.alert(t(res.message))
            }
        } else {
            Alert.alert(t(cannotConnect()))
        }
        setLoading(false)
    }

    return (
        <Box
            radius={10}
            padding={20}
            marginTop={20}
            marginBottom={20}
            style={styled.shadow}
            backgroundColor={theme.white5}
        >
            <Txt style={styles.title}>
                {t('Amount')}
            </Txt>

            <Box
                row
                alignCenter
                backgroundColor={theme.gray}
            >
                <Text
                    style={{
                        fontSize: 15,
                        color: theme.black,
                        marginHorizontal: 10,
                        fontFamily: fonts.AS,
                        textDecorationLine: 'underline',
                    }}
                >
                    {'đ '}
                </Text>
                <Box flex={1} >
                    <TextInput
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType={'number-pad'}
                        style={{
                            height: 40,
                            paddingRight: 10,
                            color: theme.black,
                            fontFamily: fonts.M24,
                            fontSize: 18,
                        }}
                    />
                </Box>
            </Box>

            <Txt style={styles.title}>
                {t('Choose a bank')}
            </Txt>
            <Btn
                row
                height={50}
                justifySpaceBetween
                paddingHorizontal={10}
                backgroundColor={theme.gray}
                onPress={() => setShowModalBank(true)}
            >
                <Box row alignCenter>
                    <Icon
                        size={30}
                        source={bankChoosed?.image}
                    />
                    <Txt
                        marginLeft={10}
                        color={theme.black}
                        fontFamily={fonts.AS}
                    >
                        {bankChoosed?.name_banking}
                    </Txt>
                </Box>
                <Icon
                    size={15}
                    source={require('@images/trade/more.png')}
                />
            </Btn>

            <Btn
                radius={5}
                height={45}
                marginTop={20}
                disabled={loading}
                backgroundColor={colors.green2}
                onPress={handleCreateDepositVND}
            >
                {loading ? <LoadingWhite /> :
                    <Txt fontFamily={fonts.AS} color={'white'} size={16}>
                        {t('Buy')}
                    </Txt>
                }
            </Btn>

            <ModalBanking
                show={isShowModalBank}
                setShow={setShowModalBank}
            />
        </Box>
    )
}

export default Form

const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.AS,
        color: colors.grayBlue,
        marginVertical: 10,
    }
})