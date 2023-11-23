import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import LoadingBlack from '@reuse/LoadingBlack'
import LoadingWhite from '@reuse/LoadingWhite'
import TextError from '@reuse/TextError'
import { profileUserSelector } from '@selector/userSelector'
import { getValueConfig, withDraw } from '@service/fundingService'
import { colors } from '@theme/colors'
import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { Profile } from 'src/model/userModel'
import AmountUSDT from './AmountUSDT'
import InputWallet from './InputWallet'
import WalletType from './WalletType'
import Warning from './Warning'
export const BEP20 = 'BEP20'
export const TRC20 = 'TRC20'

const FormWithdraw = ({ t }: any) => {
    const dispatch = useAppDispatch()
    const [wallet, setWallet] = useState(BEP20)
    const [USDT, setUSDT] = useState('')
    const [amount, setAmount] = useState('')
    const [twoFA, setTwoFA] = useState('')
    const [fee, setFee] = useState(1)
    const [loading, setLoading] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const [checkForm, setCheckForm] = useState(false)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    useEffect(() => {
        handleGetValueConfig()
    }, [])

    const handleGetValueConfig = async () => {
        setLoading(true)
        const res = await getValueConfig('withdraw')
        if (res.status && res.data.length > 0) {
            setFee(res.data[0].value)
            setLoading(false)
        }
    }

    const handleWithdraw = async () => {
        if (USDT.trim() === '' || amount.trim() === '' || Number(amount) < 50
            || twoFA.trim() === '') {
            return setCheckForm(true)
        }
        setLoadingButton(true)
        const res = await withDraw({
            amount,
            network: wallet,
            otp: twoFA,
            symbol: 'USDT',
            toAddress: USDT
        })
        res.status && clearForm()

        Alert.alert(t(res.message))
        setLoadingButton(false)
    }

    const clearForm = async () => {
        setAmount('')
        setUSDT('')
        setTwoFA('')
        setCheckForm(false)
        dispatch(getProfileThunk())
    }

    return (
        <>
            {loading ? (
                <LoadingWhite />
            ) : (
                <Box>
                    <Txt bold size={18}>{t('Withdraw')}</Txt >
                    <WalletType
                        wallet={wallet}
                        setWallet={setWallet}
                        t={t}
                    />
                    <InputWallet
                        value={USDT}
                        onChangeText={setUSDT}
                        title={t('Wallet USDT')}
                        error={checkForm && USDT.trim() === ''}
                        messError={t('Wallet USDT is empty')}
                    />
                    <AmountUSDT
                        amount={amount}
                        setAmount={setAmount}
                        t={t}
                        profile={profile}
                        checkForm={checkForm}
                    />
                    {(checkForm && Number(amount) < 50 && amount.trim() !== '') &&
                        <Box marginTop={-10} marginBottom={10}>
                            <TextError text={t('Minimum amount is $50')} />
                        </Box>
                    }

                    <Box row alignCenter justifySpaceBetween marginBottom={10}>
                        <Txt>{t('Max available')}</Txt>
                        <Txt>{numberCommasDot(profile?.balance.toFixed(2))} USDT</Txt>
                    </Box>

                    <InputWallet
                        value={Number(amount) - 1 < 0 ? '0' : String(Number(amount) - 1)}
                        onChangeText={setUSDT}
                        title={t('Wallet USDT')}
                        editAble={false}
                    />

                    <InputWallet
                        value={twoFA}
                        onChangeText={setTwoFA}
                        title={t('2FA')}
                        error={checkForm && twoFA.trim() === ''}
                        messError={t('2FA is empty')}
                    />

                    <Box paddingRight={20} marginTop={10} marginBottom={20}>
                        <Warning text={t('Withdrawal fee: $') + fee} />
                        <Warning text={t('Each transaction requires a minimum amount of $50')} />
                    </Box>

                    <Btn
                        onPress={handleWithdraw}
                        width={120}
                        height={40}
                        backgroundColor={colors.yellow}
                    >
                        {loadingButton ? <LoadingBlack /> : <Txt>{t('Withdraw')}</Txt>}
                    </Btn>
                </Box >
            )}
        </>
    )
}

export default FormWithdraw

