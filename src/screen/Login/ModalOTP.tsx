import Box from "@commom/Box"
import Btn from "@commom/Btn"
import Input from "@commom/Input"
import Txt from "@commom/Txt"
import LoadingBlack from "@reuse/LoadingBlack"
import Modality from "@reuse/Modality"
import TextError from "@reuse/TextError"
import { colors } from "@theme/colors"
import { theme } from "@theme/index"

const ModalOTP = ({
    show,
    setShow,
    checkForm,
    t,
    loading,
    onLoginWithTwoFA,
    otp,
    setOtp,
}: any) => {

    return (
        <Modality show={show}>
            <Box
                width={'95%'}
                backgroundColor={colors.white}
            >
                <Box
                    row
                    alignCenter
                    padding={15}
                    justifySpaceBetween
                    borderBottomWidth={1}
                    borderColor={'#303030'}
                >
                    <Txt size={15} bold>{t('Two-Factor Authentication (2FA)')}</Txt>
                    <Btn onPress={() => setShow(false)}>
                        <Txt size={20} color={'#747e8a'}>X</Txt>
                    </Btn>
                </Box>

                <Box padding={15}>
                    <Txt>{t('You have to verify 2FA to keep your account safe')}</Txt>
                    <Input
                        value={otp}
                        onChangeText={setOtp}
                        borderWidth={1}
                        borderColor={theme.colors.gray4}
                        height={40}
                        radius={5}
                        marginVertical={10}
                        paddingHorizontal={10}
                        marginBottom={5}
                    />
                    {(checkForm && otp.trim() === '')&& <TextError text={t('Code is empty')} />}

                    <Box row justifyEnd marginTop={20}>
                        <Btn
                            onPress={() => setShow(false)}
                            borderWidth={1}
                            borderColor={theme.colors.gray4}
                            height={40}
                            width={100}
                            radius={10}
                            marginRight={10}
                        >
                            <Txt>{t('Cancel')}</Txt>
                        </Btn>

                        <Btn
                            onPress={onLoginWithTwoFA}
                            width={130}
                            height={40}
                            backgroundColor={colors.yellow}
                        >
                            {loading ? <LoadingBlack /> : <Txt>{t('Log In')}</Txt>}
                        </Btn>
                    </Box>
                </Box>
            </Box>
        </Modality>
    )
}

export default ModalOTP