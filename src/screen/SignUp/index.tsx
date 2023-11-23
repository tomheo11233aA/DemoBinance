import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import LoadingBlack from '@reuse/LoadingBlack'
import { signUp } from '@service/userService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import Header from './Header'
import InputSignUp from './InputSignUp'

const SignUp = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [referral, setReferral] = useState<string>('c66e2482e775')

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            Alert.alert(t('The confirmation password is not the same as the new password'))
            return
        }
        setLoading(true)
        const res = await signUp({
            email: email,
            password: password,
            userName: username,
            referral: referral,
        })
        
        if (res.status) {
            setEmail('')
            setPassword('')
            setUsername('')
            setConfirmPassword('')
        }
        
        Alert.alert(t(res.message))
        setLoading(false)
    }

    return (
        <KeyBoardSafe paddingHorizontal={15}>
            <Header />
            <Box marginTop={20}>
                <InputSignUp
                    title='Username'
                    value={username}
                    setValue={setUsername}
                />
                <InputSignUp
                    title='Email'
                    value={email}
                    
                    setValue={setEmail}
                />
                <InputSignUp
                    title='Password'
                    value={password}
                    setValue={setPassword}
                    security={true}
                />
                <InputSignUp
                    title='Confirm password'
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                    security={true}
                />
                <InputSignUp
                    value={referral}
                    setValue={setReferral}
                    title='Referral code (optional)'
                />
            </Box>
            <Btn
                radius={3}
                height={40}
                marginTop={30}
                disabled={loading}
                onPress={handleRegister}
                backgroundColor={colors.yellow}
            >
                {loading ?
                    <LoadingBlack /> :
                    <Txt fontFamily={fonts.IBMPM}>{t('Submit')}</Txt>
                }
            </Btn>
        </KeyBoardSafe>
    )
}

export default SignUp