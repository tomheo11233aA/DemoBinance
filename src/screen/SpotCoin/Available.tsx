import Box from "@commom/Box";
import Icon from "@commom/Icon";
import Txt from "@commom/Txt";
import { numberCommasDot } from "@method/format";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";

export default ({ theme, coin, t }: any) =>
    <Box row marginTop={20}>
        <Box flex={1} alignCenter>
            <Txt size={10} fontFamily={fonts.SGM} color={colors.grayBlue2}>
                {t('Available')}
            </Txt>
            <Txt fontFamily={fonts.M24} marginTop={5} size={15} color={theme.black}>
                {numberCommasDot(coin?.balance?.toFixed(2))}
            </Txt>
        </Box>
        <Box flex={1} alignCenter>
            <Box row alignCenter>
                <Txt size={10} fontFamily={fonts.SGM} color={colors.grayBlue2}>
                    {`${t('Unavailable')}  `}
                </Txt>
                <Icon
                    size={11}
                    source={require('@images/future/info.png')}
                />
            </Box>

            <Txt fontFamily={fonts.M24} marginTop={5} size={15} color={theme.black}>
                {numberCommasDot(coin?.balance?.toFixed(2))}
            </Txt>
        </Box>
    </Box>