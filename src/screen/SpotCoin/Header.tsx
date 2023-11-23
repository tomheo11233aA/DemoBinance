import Box from "@commom/Box";
import Icon from "@commom/Icon";
import Txt from "@commom/Txt";
import Back from "@reuse/Back";
import contants from "@util/contants";

export default ({ theme, coin }: any) =>
    <Box
        row
        alignCenter
        justifySpaceBetween
        marginTop={5}
        paddingHorizontal={15}
    >
        <Back size={14} />
        <Box row alignCenter>
            <Icon
                source={coin.image ?
                    { uri: contants.HOSTING + '/' + coin?.image } :
                    coin.currency == contants.HX ? require('@images/Logo.png') :
                        require('@images/future/usdt.png')
                }
                size={14}
                marginRight={7}
            />
            <Txt bold color={theme.black}>{coin?.currency}</Txt>
        </Box>
        <Box />
    </Box>