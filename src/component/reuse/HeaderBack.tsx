import Box from "@commom/Box";
import Txt from "@commom/Txt";
import { useTheme } from "@hooks/index";
import Back from "@reuse/Back";
import { fonts } from "@theme/fonts";
import { useTranslation } from "react-i18next";

interface Props {
    title: string;
}

export default ({ title }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box marginTop={10}>
            <Back size={18} color='#868d98' />
            <Txt
                size={23}
                marginTop={18}
                fontFamily={fonts.AS}
                color={theme.black}
            >
                {t(title)}
            </Txt>
        </Box>
    )
}
