import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useAppDispatch, useTheme } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { setSelfiePhoto, setStep } from '@slice/kycSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { HEIGHT_RECT } from './Selfie'

interface Props {
    path: string;
    setPath: Function;
}

const ShowSelfie = ({ path, setPath }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    return (
        <Box flex={1} padding={20} backgroundColor={theme.bg}>
            <KeyBoardSafe>
                <Box row justifySpaceBetween>
                    <Btn onPress={() => dispatch(setStep(contants.DOCUMENT_VERIFICATION))}>
                        <Icon
                            size={17}
                            resizeMode={'contain'}
                            source={require('@images/back2.png')}
                        />
                    </Btn>
                    <Btn onPress={() => dispatch(setStep(contants.DOCUMENT_VERIFICATION))}>
                        <Icon
                            size={17}
                            resizeMode={'contain'}
                            source={require('@images/future/close.png')}
                        />
                    </Btn>
                </Box>
                <Txt color={theme.black} fontFamily={fonts.IBMPM} size={20} marginVertical={10}>
                    {t('Confirm selfie')}
                </Txt>
                <Img
                    width={'100%'}
                    height={HEIGHT_RECT}
                    source={{ uri: path }}
                    resizeMode={'contain'}
                />
            </KeyBoardSafe>
            <Box alignCenter>
                <Btn onPress={() => dispatch(setSelfiePhoto(path))}>
                    <Txt
                        marginBottom={20}
                        color={theme.black}
                        fontFamily={fonts.SGM}
                    >
                        {t('Continue Without Retaking Photo')}
                    </Txt>
                </Btn>

                <Btn
                    radius={5}
                    height={45}
                    width={'100%'}
                    onPress={() => setPath('')}
                    backgroundColor={colors.yellow2}
                >
                    <Txt fontFamily={fonts.IBMPM}>
                        {t('Retake Photo')}
                    </Txt>
                </Btn>
            </Box>
        </Box>
    )
}

export default ShowSelfie