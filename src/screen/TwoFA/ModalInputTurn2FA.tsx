import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { useAppDispatch, useTheme } from '@hooks/index'
import LoadingBlack from '@reuse/LoadingBlack'
import Modality from '@reuse/Modality'
import { turn2FA as turn2FAUser } from '@service/userService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, KeyboardAvoidingView } from 'react-native'
import { TURN_ON } from '.'
import { height, width } from '@util/responsive'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'

interface Props {
    show: boolean;
    turn2FA: string;
    setShow: Function;
    handleCheckuser2fa: Function;
}

const ModalInputTurn2FA = ({
    show,
    setShow,
    turn2FA,
    handleCheckuser2fa,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)

    const handleTurn2FA = async () => {
        setLoading(true)
        const res = await turn2FAUser(code)
        res.error && Alert.alert(res.message)
        if (!res.status) {
            Alert.alert(res.message)
        } else {
            setShow(false)
            handleCheckuser2fa()
            dispatch(getProfileThunk())
        }
        setLoading(false)
    }

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
                                value={code}
                                fontSize={16}
                                marginTop={10}
                                font={fonts.M24}
                                color={theme.black}
                                onChangeText={setCode}
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
                                    disabled={loading}
                                    paddingHorizontal={25}
                                    onPress={handleTurn2FA}
                                    backgroundColor={colors.yellow}
                                >
                                    {loading ? <LoadingBlack /> :
                                        <Txt fontFamily={fonts.AS}>
                                            {t(turn2FA !== TURN_ON ? 'Turn on 2FA' : 'Turn off 2FA')}
                                        </Txt>
                                    }
                                </Btn>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </KeyboardAvoidingView>
        </Modality>
    )
}

export default ModalInputTurn2FA