import Box from "@commom/Box";
import Txt from "@commom/Txt";
import Back from "@reuse/Back";
import { fonts } from "@theme/fonts";

export default ({ theme, t }: any) =>
    <Box marginTop={10}>
        <Back size={18} color='#868d98' />
        <Txt
            size={23}
            marginTop={18}
            fontFamily={fonts.AS}
            color={theme.black}
        >
            {t('Convert')}
        </Txt>
    </Box>