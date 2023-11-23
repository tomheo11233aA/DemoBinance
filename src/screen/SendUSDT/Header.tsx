import Box from "@commom/Box";
import Btn from "@commom/Btn";
import Icon from "@commom/Icon";
import Txt from "@commom/Txt";
import { navigate } from "@navigation/navigationRef";
import Back from "@reuse/Back";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import contants from "@util/contants";
import { screen } from "@util/screens";

export default ({ theme, t, coin }: any) =>
    <Box marginTop={10}>
        <Box row alignCenter justifySpaceBetween>
            <Back size={16} color='#868d98' />
            <Box row alignCenter>
                <Icon
                    source={require('@images/future/book.png')}
                    size={16}
                    marginRight={10}
                    resizeMode={'contain'}
                />
                <Btn onPress={() => navigate(screen.CHANGE_BALANCE_HISTORY)}>
                    <Icon
                        source={require('@images/future/page-oclock.png')}
                        size={16}
                        resizeMode={'contain'}
                    />
                </Btn>
            </Box>
        </Box>
        <Txt
            size={23}
            fontFamily={fonts.AS}
            marginTop={18}
            color={theme.black}
        >
            {t('Convert')}
        </Txt>
        {coin.currency != contants.HX &&
            <Txt size={10} fontFamily={fonts.SGM} color={colors.grayBlue2}>
                {t('Send USDT to Binance account')}
            </Txt>
        }
    </Box>