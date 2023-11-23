import Box from "@commom/Box";
import Txt from "@commom/Txt";
import { useTheme } from "@hooks/index";
import Back from "@reuse/Back";
import { fonts } from "@theme/fonts";
import { useTranslation } from "react-i18next";

export default () => {
    const { t } = useTranslation()
    const theme = useTheme()
    return (
        <Box
            marginTop={10}
            row
            alignCenter
            justifySpaceBetween
        >
            <Back size={16} color='#868d98' />
            <Txt fontFamily={fonts.RM} size={14} color={theme.black}>
                {t('Balance change history')}
            </Txt>
            <Box />
        </Box>
    )
}
