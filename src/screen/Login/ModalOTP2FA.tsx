import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import Modality from '@reuse/Modality'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { height, width } from '@util/responsive'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { KeyboardAvoidingView } from 'react-native'

interface Props {
    otp: string;
    show: boolean;
    setOtp: Function;
    setShow: Function;
    onLoginWith2FA: Function;
}

const ModalOTP2FA = ({
    otp,
    show,
    setOtp,
    setShow,
    onLoginWith2FA,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Modality
            show={show}
        >
            <KeyboardAvoidingView behavior={"position"}>
                <Box width={width} height={height}>
                    <Box
                        absolute
                        bottom={0}
                        alignCenter
                        padding={20}
                        width={width}
                        borderTopLeftRadius={15}
                        borderTopRightRadius={15}
                        backgroundColor={theme.bg}
                    >
                        <Txt size={15} bold marginBottom={20} color={theme.black}>
                            {t('Two-Factor Authentication (2FA)')}
                        </Txt>
                        <Box width={'100%'}>
                            <Txt color={colors.grayBlue}>
                                {t('Enter the 6-digit code from authenticator app')}
                            </Txt>
                            <Input
                                height={40}
                                value={otp}
                                fontSize={16}
                                marginTop={10}
                                font={fonts.M24}
                                color={theme.black}
                                onChangeText={setOtp}
                                paddingHorizontal={10}
                                keyboardType={'number-pad'}
                                backgroundColor={theme.gray2}
                            />
                            <Box
                                row
                                justifyEnd
                                height={40}
                                marginTop={20}
                                width={'100%'}
                                marginBottom={20}
                            >
                                <Btn
                                    radius={5}
                                    paddingHorizontal={25}
                                    backgroundColor={theme.gray2}
                                    onPress={() => setShow(false)}
                                >
                                    <Txt color={theme.black}>{t('Cancel')}</Txt>
                                </Btn>
                                <Btn
                                    radius={5}
                                    marginLeft={10}
                                    paddingHorizontal={25}
                                    onPress={onLoginWith2FA}
                                    backgroundColor={colors.yellow}
                                >
                                    <Txt fontFamily={fonts.AS}>
                                        {t('Log In')}
                                    </Txt>
                                </Btn>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </KeyboardAvoidingView>
        </Modality>
    )
}

export default ModalOTP2FA