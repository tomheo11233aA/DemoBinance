import { checKYCUserThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { navigate } from '@navigation/navigationRef'
import { kycUserSelector } from '@selector/userSelector'
import { setStep } from '@slice/kycSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import contants from '@util/contants'
import { screen } from '@util/screens'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const KYCStatus = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const kyc = useAppSelector(kycUserSelector)

    useEffect(() => {
        dispatch(checKYCUserThunk())
    })

    return (
        <>
            {kyc === contants.NOT_KYC &&
                <LinearGradient
                    end={{ x: 1, y: 0 }}
                    start={{ x: 0.2, y: 0.5 }}
                    style={styles.linerContainer}
                    colors={[theme.gray2, theme.yellow2]}
                >
                    <Box
                        row
                        alignCenter
                        height={'100%'}
                        justifySpaceBetween
                        paddingHorizontal={20}
                    >
                        <Box>
                            <Txt size={18} fontFamily={fonts.AS} color={theme.black}>
                                {t('Verify Your Account')}
                            </Txt>
                            <Btn
                                alignCenter={false}
                                onPress={() => {
                                    dispatch(setStep(''))
                                    navigate(screen.KYC)
                                }}
                            >
                                <Txt
                                    size={16}
                                    marginTop={7}
                                    fontFamily={fonts.AS}
                                    color={colors.yellowBold}
                                >
                                    {t('Verify Now →')}
                                </Txt>
                            </Btn>
                        </Box>
                        <Icon
                            source={require('@images/home/kyc.png')}
                        />
                    </Box>
                </LinearGradient>
            }
        </>
    )
}

export default KYCStatus

const styles = StyleSheet.create({
    linerContainer: {
        width: '100%',
        height: 120,
        borderRadius: 7,
        marginTop: 20
    }
})