import { checKYCUserThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { goBack } from '@navigation/navigationRef'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import LoadingBlack from '@reuse/LoadingBlack'
import { KYCSelector } from '@selector/kycSelector'
import { profileUserSelector } from '@selector/userSelector'
import { kycUser } from '@service/userService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, Platform } from 'react-native'
import { Profile } from 'src/model/userModel'
import InputKYC from '../InputKYC'
import InputModal from '../InputModal'
import ModalGender from '../ModalGender'
import Tittle from '../Tittle'
import InputDob from './InputDob'
import TextError from '@reuse/TextError'

const FormInfomation = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const kyc = useAppSelector(KYCSelector)
  const profile: Profile = useAppSelector<any>(profileUserSelector)

  const [passport, setPassport] = useState<string>('')
  const [fullname, setFullName] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [DD, setDD] = useState<string>('')
  const [MM, setMM] = useState<string>('')
  const [YYYY, setYYYY] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [checkForm, setCheckForm] = useState<boolean>(false)
  const [isShowModalGender, setShowModalGender] = useState<boolean>(false)

  const handleChangeGender = (genderChoosed: number) => {
    setShowModalGender(false)
  }

  const handleKYCUser = async () => {
    if (fullname.trim() === '' || passport.trim() === '' || address.trim() === '' ||
      city.trim() === '' || !isValidDateOfBirth(`${DD}/${MM}/${YYYY}`)) {
      return setCheckForm(true)
    }

    setLoading(true)
    let formData = new FormData()
    formData.append('userid', profile.id)
    formData.append('fullname', fullname)
    formData.append('passport', passport)
    formData.append('dob', `${DD}-${MM}-${YYYY}`)
    formData.append('address', address)
    formData.append('city', city)
    formData.append('country', kyc.country.country)
    formData.append('photo', { uri: Platform.OS === 'ios' ? kyc.frontCard.path.replace('file://', '') : kyc.frontCard.path, name: 'image.jpg', type: 'image/jpg' })
    formData.append('photo', { uri: Platform.OS === 'ios' ? kyc.backCard.path.replace('file://', '') : kyc.backCard.path, name: 'image.jpg', type: 'image/jpg' })

    const res = await kycUser(formData)
    !res.status && Alert.alert(t(res.message))
    setLoading(false)
    dispatch(checKYCUserThunk())
    res.status && goBack()
  }

  const isValidDateOfBirth = (dateString: string) => {
    // Split the date string into day, month, and year
    var parts = dateString.split('/');
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
    var year = parseInt(parts[2], 10);

    // Create a new Date object and set the year, month (zero-based), and day
    var date = new Date(year, month - 1, day);

    // Check if the entered date components match the created Date object components
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  return (
    <KeyBoardSafe paddingHorizontal={15}>
      <Tittle
        t={t}
        theme={theme}
      />
      <Box marginTop={30}>
        <InputKYC
          value={fullname}
          title={t('Full name')}
          messError={t('Full name is empty')}
          error={checkForm && fullname.trim() === ''}
          onChangeText={(txt: string) => setFullName(txt)}
        />
        <InputKYC
          value={passport}
          title={t('Passport')}
          messError={t('Passport is empty')}
          error={checkForm && passport.trim() === ''}
          onChangeText={(txt: string) => setPassport(txt)}
        />

        <Box marginBottom={10}>
          <Txt bold color={colors.grayBlue} fontFamily={fonts.SGM}>
            {t('Date of Birth')}
          </Txt>
          <Box row marginTop={5}>
            <InputDob
              value={DD}
              theme={theme}
              onChangeText={setDD}
              placeholder={'DD'}
            />
            <InputDob
              value={MM}
              theme={theme}
              onChangeText={setMM}
              marginHorizontal={10}
              placeholder={'MM'}
            />
            <InputDob
              value={YYYY}
              theme={theme}
              placeholder={'YYYY'}
              onChangeText={setYYYY}
            />
          </Box>
          {(!isValidDateOfBirth(`${DD}/${MM}/${YYYY}`) && checkForm) &&
            <TextError text={t('Invalid date of birth')} />
          }
        </Box>

        <InputKYC
          value={address}
          title={t('Address')}
          messError={t('Address is empty')}
          error={checkForm && address.trim() === ''}
          onChangeText={(txt: string) => setAddress(txt)}
        />

        <InputKYC
          value={city}
          title={t('City')}
          messError={t('City is empty')}
          error={checkForm && city.trim() === ''}
          onChangeText={(txt: string) => setCity(txt)}
        />

        <Btn
          radius={5}
          height={45}
          marginTop={20}
          disabled={loading}
          onPress={handleKYCUser}
          backgroundColor={colors.yellow}
        >
          {loading ? <LoadingBlack /> :
            <Txt fontFamily={fonts.AS}>{t('Confirm')}</Txt>
          }
        </Btn>
      </Box>
      <ModalGender
        show={isShowModalGender}
        setShow={setShowModalGender}
        onChangeGender={handleChangeGender}
      />
    </KeyBoardSafe>
  )
}

export default FormInfomation