import Box from "@commom/Box";
import Icon from "@commom/Icon";
import Txt from "@commom/Txt";
import { numberCommasDot } from "@method/format";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";

export default ({ theme, coin, t }: any) =>
    <Box alignCenter>
        <Box row alignCenter marginTop={10}>
            <Txt size={10} fontFamily={fonts.SGM} color={colors.grayBlue2}>
                {`${t('Total')} `}
            </Txt>
            <Icon
                source={require('@images/wallet/eye-open.png')}
                size={14}
                resizeMode={'contain'}
            />
        </Box>

        <Txt fontFamily={fonts.M24} size={26} marginTop={10} color={theme.black}>
            {numberCommasDot(coin?.balance?.toFixed(2))}
        </Txt>

        <Box marginTop={10}>
            <Txt color={colors.grayBlue2} size={10}>
                {'≈ '}
                <Txt color={colors.grayBlue2} fontFamily={fonts.M23}>
                {coin?.exchangeRate?.toFixed(2)}
                </Txt>
                <Txt color={colors.grayBlue2} size={12}>
                    {' $'}
                </Txt>
            </Txt>
        </Box>
    </Box>