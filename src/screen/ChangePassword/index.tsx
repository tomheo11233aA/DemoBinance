import { useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import React, { useState } from 'react'
import Header from './Header'
import Box from '@commom/Box'
import InputChangePassword from './InputChangePassword'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import LoadingBlack from '@reuse/LoadingBlack'
import { Alert } from 'react-native'
import { changePassword } from '@service/userService'

const ChangePassword = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const [loading, setLoading] = useState<boolean>(false)
    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const handleChangePassword = async () => {
        setLoading(true)
        if (newPassword !== confirmPassword) {
            Alert.alert(t('The confirmation password is not the same as the new password'))
            return
        }
        const res = await changePassword({
            password: oldPassword,
            newPassword: newPassword,
        })
        if (res.status) {
            Alert.alert(t('Password changed successfully!'))
            setOldPassword('')
            setNewPassword('')
            setConfirmPassword('')
        } else {
            Alert.alert(t(res.message))
        }
        setLoading(false)
    }

    return (
        <KeyBoardSafe paddingHorizontal={15}>
            <Header />
            <Box marginTop={20}>
                <InputChangePassword
                    title='Old Password'
                    value={oldPassword}
                    setValue={setOldPassword}
                />
                <InputChangePassword
                    title='New Password'
                    value={newPassword}
                    setValue={setNewPassword}
                />
                <InputChangePassword
                    title='New Password'
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                />
            </Box>
            <Btn
                radius={3}
                height={40}
                marginTop={30}
                disabled={loading}
                onPress={handleChangePassword}
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

export default ChangePassword