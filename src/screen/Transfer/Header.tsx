import Box from "@commom/Box";
import Icon from "@commom/Icon";
import Txt from "@commom/Txt";
import Back from "@reuse/Back";
import { fonts } from "@theme/fonts";

export default ({ theme, t }: any) =>
    <Box marginTop={10}>
        <Box row alignCenter justifySpaceBetween>
            <Back size={18} color='#868d98' />
            <Icon
                source={require('@images/wallet/oclock.png')}
                size={10}
            />
        </Box>

        <Txt
            size={23}
            marginTop={18}
            color={theme.black}
            fontFamily={fonts.AS}
        >
            {t('Transfer')}
        </Txt>
    </Box>