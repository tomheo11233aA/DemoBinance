import Box from "@commom/Box";
import Icon from "@commom/Icon";
import Txt from "@commom/Txt";
import { useTheme } from "@hooks/index";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import { useTranslation } from "react-i18next";

const data = [
    {
        title: 'Trading',
        icon: require('@images/wallet/two-coin3.png'),
    },
    {
        title: 'Buy crypto',
        icon: require('@images/wallet/wallet-coin.png'),
    },
    {
        title: 'Sell crypto',
        icon: require('@images/wallet/hand-coin.png'),
    },
]

export default () => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Box
            row
            justifySpaceAround
            marginTop={20}
        >
            {data.map((item) =>
                <Box key={item.title}>
                    <Box
                        alignCenter
                        justifyCenter
                        backgroundColor={theme.gray3}
                        padding={10}
                        radius={50}
                        alignSelf={'center'}
                        marginBottom={10}
                    >
                        <Icon
                            source={item.icon}
                            size={14}
                        />
                    </Box>
                    <Txt fontFamily={fonts.RM} size={11} color={theme.black}>
                        {t(item.title)}
                    </Txt>
                </Box>
            )}
        </Box>
    )
}
