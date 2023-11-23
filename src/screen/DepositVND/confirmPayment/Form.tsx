import Box from '@commom/Box'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { styled } from '@theme/styled'
import React, { useState } from 'react'
import Warn from '../payment/Warn'
import { useTranslation } from 'react-i18next'
import Content from './Content'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { transferInfoDepositFundingSelector } from '@selector/fundingSelector'
import { cancelTransactionDepositVnd, verifyTransactionDepositVnd } from '@service/fundingService'
import LoadingYellow from '@reuse/LoadingYellow'
import { checkTransactionDepositVndThunk } from '@asyncThunk/fundingAsyncThunk'
import { Alert } from 'react-native'
import { cannotConnect } from '@method/alert'
import LoadingBlack from '@reuse/LoadingBlack'

const Form = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(false)

    const transferInfo = useAppSelector(transferInfoDepositFundingSelector)

    const handleCancelTransactionDepositVnd = async () => {
        setLoading(true)
        const res = await cancelTransactionDepositVnd(transferInfo?.id || '')
        if (res.status) {
            dispatch(checkTransactionDepositVndThunk())
        } else {
            Alert.alert(t(cannotConnect()))
        }
        setLoading(false)
    }

    const handleVerifyTransactionDepositVnd = async () => {
        setLoading(true)
        const res = await verifyTransactionDepositVnd(transferInfo?.id || '')
        if (res.status) {
            dispatch(checkTransactionDepositVndThunk())
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
            <Warn title={t('You must transfer the correct order created as below information. If the transfer is wrong, the money is lost we will not be responsible.')} />
            <Box>
                <Content
                    t={t}
                    theme={theme}
                    title={'Bank'}
                    content={transferInfo?.name_banking_admin || ''}
                />
                <Content
                    t={t}
                    theme={theme}
                    title={'Account number'}
                    content={transferInfo?.number_banking_admin.toString() || ''}
                />
                <Content
                    t={t}
                    theme={theme}
                    title={'Account name'}
                    content={transferInfo?.owner_banking_admin.toString() || ''}
                />
                <Content
                    t={t}
                    theme={theme}
                    title={'Amount of money'}
                    content={transferInfo?.amount.toString() || ''}
                />
                <Content
                    t={t}
                    theme={theme}
                    title={'Note'}
                    content={transferInfo?.code_unique || ''}
                />
            </Box>

            <Btn
                radius={3}
                height={40}
                marginTop={30}
                disabled={loading}
                backgroundColor={colors.yellow}
                onPress={handleVerifyTransactionDepositVnd}
            >
                {loading ? <LoadingBlack /> :
                    <Txt fontFamily={fonts.AS}>
                        {t('I transferred the money')}
                    </Txt>
                }
            </Btn>

            <Btn
                radius={3}
                height={40}
                marginTop={20}
                disabled={loading}
                alignSelf={'center'}
                paddingHorizontal={30}
                backgroundColor={theme.gray8}
                onPress={handleCancelTransactionDepositVnd}
            >
                {loading ? <LoadingYellow /> :
                    <Txt fontFamily={fonts.AS} color={theme.black}>
                        {t('Cancel')}
                    </Txt>
                }
            </Btn>
        </Box>
    )
}

export default Form