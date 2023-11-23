import Box from "@commom/Box";
import Icon from "@commom/Icon";
import Txt from "@commom/Txt";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import { Profile } from "src/model/userModel";

interface Props {
    t: any;
    coin: any;
    theme: any;
}

export default ({ theme, t, coin }: Props) =>
    <Box>
        <Box row marginTop={25}>
            <Txt
                color={colors.grayBlue2}
                size={12}
                marginBottom={7}
                fontFamily={fonts.RM}
            >
                {t('Send from')}
            </Txt>
        </Box>

        <Box
            row
            radius={5}
            alignCenter
            height={40}
            paddingHorizontal={10}
            backgroundColor={theme.gray2}
        >
            <Box flex={1}>
                <Txt fontFamily={fonts.SGM} color={theme.black}>
                    {t('Spot Wallet')}
                </Txt>
            </Box>
        </Box>

        <Box row marginTop={8} alignCenter>
            <Txt color={colors.grayBlue2} size={11}>
                {`${t('Available')}:  `}
            </Txt>

            <Txt fontFamily={fonts.M23} size={13} color={theme.black}>
                {coin.balance.toFixed(2)}
                <Txt size={10} color={theme.black}>{` ${coin.currency}`}</Txt>
            </Txt>
        </Box>
    </Box>
