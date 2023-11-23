import { getProfileThunk } from "@asyncThunk/userAsyncThunk";
import Box from "@commom/Box";
import Btn from "@commom/Btn";
import Txt from "@commom/Txt";
import { useAppDispatch } from "@hooks/index";
import LoadingBlack from "@reuse/LoadingBlack";
import { widthdraw } from "@service/walletService";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import { useState } from "react";
import { Alert } from "react-native";

interface Props {
    t: any;
    theme: any;
    symbol: string;
    amount: string;
    netWork: string;
    toAddress: string;
}

export default ({
    t,
    theme,
    symbol,
    amount,
    netWork,
    toAddress,
}: Props) => {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)

    const handleWithdraw = async () => {
        setLoading(true)
        const res = await widthdraw({
            symbol,
            amount,
            network: netWork,
            toAddress,
        })
        Alert.alert(t(res.message))
        setLoading(false)
        if (res.status) {
            dispatch(getProfileThunk())
        }
    }

    const check = (amount.trim() !== '' && toAddress.trim() !== ''
        && symbol.trim() !== '' && netWork.trim() !== '') ? true : false

    return (
        <Box
            row
            padding={15}
            paddingBottom={40}
            backgroundColor={theme.bg}
            borderTopWidth={0.5}
            borderColor={theme.gray2}
        >
            <Box flex={1}>
                <Txt
                    color={colors.grayBlue2}
                    size={12}
                    marginBottom={7}
                    fontFamily={fonts.RM}
                >
                    {t('Total amount')}
                </Txt>
                <Txt fontFamily={fonts.M24} size={20} color={theme.black}>
                    {Number(amount)?.toFixed(2) || 0}
                    <Txt fontFamily={fonts.RM} color={theme.black}>
                        {` ${symbol}`}
                    </Txt>
                </Txt>
                <Txt
                    color={colors.grayBlue2}
                    size={12}
                    marginTop={2}
                    fontFamily={fonts.RM}
                >
                    {t('Network free')}
                </Txt>
            </Box>

            <Btn
                onPress={handleWithdraw}
                backgroundColor={!check ? theme.gray11 : colors.yellow}
                paddingHorizontal={40}
                paddingVertical={9}
                radius={5}
                alignSelf={'center'}
                disabled={!check}
            >
                {loading ?
                    <LoadingBlack size={20} /> :
                    <Txt
                        fontFamily={fonts.RM}
                        color={!check ? colors.grayBlue : colors.black}
                    >
                        {t('Send')}
                    </Txt>
                }
            </Btn>
        </Box>
    )
}