import Box from '@commom/Box'
import { hideBottomTab, useAppSelector, useTheme } from '@hooks/index'
import { stepKYCSelector } from '@selector/kycSelector'
import contants from '@util/contants'
import React from 'react'
import BackIDCard from './backIDCard/BackIDCard'
import DocumentVerification from './documentVerification/DocumentVerification'
import FrontIDCard from './frontIDCard/FrontIDCard'
import Selfie from './selfie/Selfie'
import FormInfomation from './formInfomation/FormInfomation'
import { kycUserSelector } from '@selector/userSelector'
import Safe from '@reuse/Safe'
import Back from '@reuse/Back'
import Txt from '@commom/Txt'
import { useTranslation } from 'react-i18next'
import { fonts } from '@theme/fonts'

const KYC = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const step = useAppSelector(stepKYCSelector)
    const kyc = useAppSelector(kycUserSelector)

    hideBottomTab()

    return (
        <Box flex={1}>
            {
                kyc == contants.KYC_PENDING ?
                    <Safe paddingHorizontal={15}>
                        <Back size={16} />
                        <Txt fontFamily={fonts.IBMPM} size={18} marginTop={10} color={theme.black}>
                            {t('Awaiting verification')}
                        </Txt>
                        <Txt fontFamily={fonts.IBMPR} marginTop={10} color={theme.black}>
                            {t('Your verification request is pending approval. This process can take up to 3 business days. Please wait for the results.')}
                        </Txt>
                    </Safe>
                    :
                    <>
                        {step === contants.FRONT_ID_CARD ?
                            <FrontIDCard /> : step === contants.BACK_ID_CARD ?
                                <BackIDCard /> : step === contants.SELFIE ?
                                    <Selfie /> : step === contants.FORM_KYC ?
                                        <FormInfomation /> : <DocumentVerification />
                        }
                    </>
            }
        </Box>
    )
}

export default KYC