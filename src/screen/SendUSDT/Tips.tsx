import Box from "@commom/Box";
import Txt from "@commom/Txt";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";

export default ({ theme, t }: any) =>
    <Box marginTop={40}>
        <Txt
            color={colors.grayBlue2}
            size={12}
            marginBottom={7}
            fontFamily={fonts.RM}
        >
            {t('Tips')}
        </Txt>
        <Box row alignCenter>
            <Txt color={colors.grayBlue2} size={5} marginRight={5}>●</Txt>
            <Box row alignCenter>
                <Txt color={colors.grayBlue2} size={10}>
                    {`${t('Fee')}: `}
                </Txt>
                <Txt size={11} fontFamily={fonts.M24} color={theme.black}>
                    {'1 '}
                    <Txt size={9} color={theme.black}>
                        USDT
                    </Txt>
                </Txt>
            </Box>
        </Box>

        {/* <Box row alignCenter>
            <Txt color={colors.grayBlue2} size={5} marginRight={5}>●</Txt>
            <Txt color={colors.grayBlue2} size={10}>
                {t('Withdrawals to Binance address will receive a refund for transaction fees')}
            </Txt>
        </Box> */}
    </Box>