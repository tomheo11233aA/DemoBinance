import { loginThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { cannotConnect } from '@method/alert'
import { goBack, navigate } from '@navigation/navigationRef'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import LoadingBlack from '@reuse/LoadingBlack'
import TextError from '@reuse/TextError'
import { loadingUserSelector } from '@selector/userSelector'
import { checkUser2fa } from '@service/userService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { RootState } from 'src/redux/store'
import ModalOTP2FA from './ModalOTP2FA'
import Option from './Option'

const Login = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [otp, setOtp] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [security, setSecurity] = useState<boolean>(true)
  const [checkForm, setCheckForm] = useState<boolean>(false)
  const [isShowModalOTP2FA, setShowModalOTP2FA] = useState<boolean>(false)

  const loading = useAppSelector<boolean>(loadingUserSelector)
  const logOut = useAppSelector<boolean>((state: RootState) => state.user.logOut)

  const handleLogin = async () => {
    if (email.trim() === '' || password.trim() === '') {
      return setCheckForm(true)
    }

    const res = await checkUser2fa(email)
    if (!res.error) {
      if (!res.status) {
        login()
      } else {
        setShowModalOTP2FA(true)
      }
    } else {
      Alert.alert(t(cannotConnect()))
    }
  }

  const login = async () => {
    const { payload } = await dispatch(loginThunk({ email, password }))
    if (payload.status) {
      if (logOut) {
        navigate(screen.HOME)
      } else {
        goBack()
      }
    }
    !payload.status && Alert.alert(t(payload.message))
  }

  const handleLoginWith2FA = async () => {
    setShowModalOTP2FA(false)
    const { payload } = await dispatch(loginThunk({ email, password, otp }))
    if (payload.status) {
      if (logOut) {
        navigate(screen.HOME)
      } else {
        goBack()
      }
    }
    !payload.status && Alert.alert(t(payload.message))
  }

  return (
    <KeyBoardSafe>
      <Box paddingHorizontal={20}>
        <Option theme={theme} />
        <Txt marginTop={40} bold size={25} fontFamily={fonts.AS} color={theme.black}>
          {t('Binance Login')}
        </Txt>
        <Box marginTop={30}>
          <Txt
            size={16}
            marginBottom={5}
            color={colors.grayBlue}
            fontFamily={fonts.IBMPM}
          >
            Email
          </Txt>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={[styles.emailInput, { backgroundColor: theme.gray, color: theme.black }]}
          />
          {(checkForm && email.trim() === '') && <TextError text={t('Email is empty')} />}
        </Box>

        <Box marginTop={20}>
          <Txt
            marginBottom={5}
            size={16}
            color={colors.grayBlue}
            fontFamily={fonts.IBMPM}
          >
            {t('Password')}
          </Txt>
          <Box>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={security}
              style={[styles.passwordInput, { backgroundColor: theme.gray, color: theme.black }]}
            />
            <TouchableOpacity
              onPress={() => setSecurity(!security)}
              style={styles.buttonEye}
            >
              <Img
                width={25}
                height={25}
                source={security ? require('@images/login/hidden.png') : require('@images/login/view.png')}
              />
            </TouchableOpacity>
          </Box>
          {(checkForm && password.trim() === '') && <TextError text={t('Password is empty')} />}
        </Box>

        <Btn
          height={45}
          marginTop={30}
          width={'100%'}
          onPress={handleLogin}
          backgroundColor={colors.yellow}
        >
          {loading ?
            <LoadingBlack /> :
            <Txt size={16} fontFamily={fonts.AS}>
              {t('Log In')}
            </Txt>
          }
        </Btn>
        <Btn
          onPress={() => navigate(screen.SIGN_UP)}
          alignCenter={false}
        >
          <Txt marginTop={40} color={'#cd9f1b'} size={16} fontFamily={fonts.AS}>
            {t('Create a Binance Account')}
          </Txt>
        </Btn>

        {/* <Btn
          onPress={() => navigate(screen.FORGOT_PASSWORD)}
          alignCenter={false}
        >
          <Txt marginTop={15} color={colors.grayBlue} fontFamily={fonts.IBMPM}>
            {t('Forgot Password')}
          </Txt>
        </Btn> */}
      </Box>

      <ModalOTP2FA
        otp={otp}
        setOtp={setOtp}
        show={isShowModalOTP2FA}
        setShow={setShowModalOTP2FA}
        onLoginWith2FA={handleLoginWith2FA}
      />
    </KeyBoardSafe>
  )
}

export default Login

const styles = StyleSheet.create({
  passwordInput: {
    width: '100%',
    height: 40,
    color: colors.black,
    backgroundColor: colors.gray3,
    paddingLeft: 10,
    paddingRight: 50,
  },
  buttonEye: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    right: 10,
  },
  emailInput: {
    width: '100%',
    height: 40,
    color: colors.black,
    backgroundColor: colors.gray3,
    paddingHorizontal: 10,
  }
})