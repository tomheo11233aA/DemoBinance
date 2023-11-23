import Box from "@commom/Box";
import Btn from "@commom/Btn";
import Input from "@commom/Input";
import Txt from "@commom/Txt";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import { Profile } from "src/model/userModel";

interface Props {
    t: any;
    coin: any;
    theme: any;
    amount: string;
    setAmount: Function;
}

export default ({
    t,
    coin,
    theme,
    amount,
    setAmount,
}: Props) => {
    return (
        <Box>
            <Txt
                marginTop={25}
                color={colors.grayBlue2}
                size={12}
                marginBottom={7}
                fontFamily={fonts.RM}
            >
                {t('Amount')}
            </Txt>
            <Box
                backgroundColor={theme.gray2}
                row
                alignCenter
                height={40}
                radius={5}
                paddingHorizontal={10}
            >
                <Box flex={1}>
                    <Input
                        fontSize={16}
                        value={amount}
                        font={fonts.M24}
                        paddingRight={10}
                        color={theme.black}
                        onChangeText={setAmount}
                        keyboardType={'decimal-pad'}
                    />
                </Box>
                <Box row alignCenter>
                    <Txt color={colors.grayBlue2} fontFamily={fonts.RM} size={15}>
                        {'USDT  '}
                    </Txt>
                    <Btn
                        onPress={() => setAmount(coin.balance.toString())}
                    >
                        <Txt color={'#cb9d36'} fontFamily={fonts.RM} size={15}>
                            {t('MAX')}
                        </Txt>
                    </Btn>
                </Box>
            </Box>
        </Box>
    )
}