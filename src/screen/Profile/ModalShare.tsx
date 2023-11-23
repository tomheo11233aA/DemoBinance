import { getProfileThunk } from "@asyncThunk/userAsyncThunk"
import Box from "@commom/Box"
import Btn from "@commom/Btn"
import Icon from "@commom/Icon"
import Input from "@commom/Input"
import Txt from "@commom/Txt"
import { useAppDispatch, useTheme } from "@hooks/index"
import Modality from "@reuse/Modality"
import { setBalance } from "@service/walletService"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"
import { height, width } from "@util/responsive"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Alert, KeyboardAvoidingView } from "react-native"

interface Props {
    isShow: boolean,
    setShow: Function,
}

export default ({ isShow, setShow }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [amount, setAmount] = useState('')

    const handleSetBalance = async () => {
        if (amount !== '') {
            const res = await setBalance(Number(amount))
            if (res.status) {
                await dispatch(getProfileThunk())
                setShow(false)
            }
        }
    }

    return (
        <Modality
            show={isShow}
            animation={'slide'}
        >
            <KeyboardAvoidingView behavior={"position"}>
                <Box width={width} height={height}>
                    <Btn flex={1} onPress={() => setShow(false)} />

                    <Box
                        absolute
                        bottom={0}
                        padding={15}
                        width={'100%'}
                        paddingBottom={70}
                        borderTopLeftRadius={15}
                        borderTopRightRadius={15}
                        backgroundColor={theme.bg}
                    >
                        <Box
                            row
                            alignCenter
                            marginBottom={20}
                            justifySpaceBetween
                        >
                            <Box />
                            <Txt fontFamily={fonts.AS} size={12} color={theme.black}>
                                {t('Share the app')}
                            </Txt>
                            <Btn onPress={() => setShow(false)}>
                                <Icon
                                    size={10}
                                    source={require('@images/future/close.png')}
                                />
                            </Btn>
                        </Box>

                        <Input
                            height={40}
                            fontSize={16}
                            value={amount}
                            font={fonts.M24}
                            color={theme.black}
                            paddingHorizontal={10}
                            onChangeText={setAmount}
                            backgroundColor={theme.gray2}
                            keyboardType={'numbers-and-punctuation'}
                        />

                        <Btn
                            height={35}
                            marginTop={10}
                            onPress={handleSetBalance}
                            backgroundColor={colors.yellow}
                        >
                            <Txt size={12} fontFamily={fonts.IBMPM}>
                                {t('Confirm')}
                            </Txt>
                        </Btn>
                    </Box>
                </Box>
            </KeyboardAvoidingView>
        </Modality>
    )
}