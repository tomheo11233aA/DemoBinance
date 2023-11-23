import KeyBoardSafe from '@reuse/KeyBoardSafe'
import React, { useState } from 'react'
import Header from '../payment/Header'
import Box from '@commom/Box'
import { styled } from '@theme/styled'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import Warn from '../payment/Warn'
import Btn from '@commom/Btn'
import { colors } from '@theme/colors'
import Txt from '@commom/Txt'
import { fonts } from '@theme/fonts'
import { useTranslation } from 'react-i18next'
import BuyOrSell from '../payment/BuyOrSell'
import Icon from '@commom/Icon'
import ImageCropPicker from 'react-native-image-crop-picker'
import Img from '@commom/Img'
import { uploadImageDeposiVND } from '@service/fundingService'
import { transferInfoDepositFundingSelector } from '@selector/fundingSelector'
import { Alert, Platform } from 'react-native'
import { checkTransactionDepositVndThunk } from '@asyncThunk/fundingAsyncThunk'
import { cannotConnect } from '@method/alert'
import LoadingBlack from '@reuse/LoadingBlack'

const SendImage = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [uri, setUri] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const transferInfo = useAppSelector(transferInfoDepositFundingSelector)

    const handleOpenImagePicker = () => {
        ImageCropPicker.openPicker({
            width: 300,
            height: 400,
            cropping: false,
            multiple: false,
        }).then(image => {
            setUri(image.path)
        }).catch(err => console.log(err))
    }

    const handleUploadImageDeposiVND = async () => {
        setLoading(true)
        let formdata = new FormData()
        formdata.append('userid', transferInfo?.userid)
        formdata.append('idTransaction', transferInfo?.id)
        formdata.append('image', { uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri, name: 'image.jpg', type: 'image/jpg' })

        const res = await uploadImageDeposiVND(formdata)
        if (res.status) {
            dispatch(checkTransactionDepositVndThunk())
        } else {
            Alert.alert(t(cannotConnect()))
        }
        setLoading(false)
    }

    return (
        <KeyBoardSafe>
            <Header />
            <Box paddingHorizontal={15}>
                <BuyOrSell />
                <Box
                    radius={10}
                    padding={20}
                    marginTop={20}
                    marginBottom={20}
                    style={styled.shadow}
                    backgroundColor={theme.white5}
                >
                    <Txt fontFamily={fonts.AS} color={theme.black} size={18} marginBottom={10}>
                        {t('Send proof of transfer')}
                    </Txt>
                    <Warn title={t('Please use transaction screenshots')} />
                    <Btn
                        height={150}
                        padding={10}
                        marginTop={10}
                        borderWidth={1}
                        borderColor={colors.gray10}
                        onPress={handleOpenImagePicker}
                    >
                        {uri ?
                            <>
                                <Img
                                    flex={1}
                                    width={'100%'}
                                    height={'100%'}
                                    source={{ uri: uri }}
                                    resizeMode={'contain'}
                                />
                            </> :
                            <>
                                <Icon
                                    size={45}
                                    tintColor={theme.black}
                                    source={require('@images/profile/img_upload.png')}
                                />
                                <Txt
                                    size={12}
                                    marginTop={20}
                                    color={theme.black}
                                >
                                    {t('Click here to upload photos')}
                                </Txt>
                            </>
                        }
                    </Btn>
                    {uri &&
                        <Btn
                            radius={3}
                            height={40}
                            marginTop={30}
                            disabled={loading}
                            backgroundColor={colors.yellow}
                            onPress={handleUploadImageDeposiVND}
                        >
                            {loading ? <LoadingBlack /> :
                                <Txt fontFamily={fonts.AS}>
                                    {t('Send image')}
                                </Txt>
                            }
                        </Btn>
                    }
                </Box>
            </Box>
        </KeyBoardSafe>
    )
}

export default SendImage