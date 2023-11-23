import Box from "@commom/Box"
import Btn from "@commom/Btn"
import Icon from "@commom/Icon"
import Txt from "@commom/Txt"
import { useTheme } from "@hooks/index"
import { navigate } from "@navigation/navigationRef"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"
import { screen } from "@util/screens"
import { useTranslation } from "react-i18next"

const data = [
    {
        icon: require('@images/profile/hc.png'),
        title: 'Rewards Hub',
    },
    {
        icon: require('@images/wallet/hand-coin2.png'),
        title: 'Pay',
    },
    {
        icon: require('@images/profile/security.png'),
        title: 'Security',
    },
    {
        icon: require('@images/profile/bell.png'),
        title: 'Notifications',
    },
]

export default ({ t }: any) => {
    const theme = useTheme()

    return (
        <Box
            row
            marginTop={20}
            justifySpaceAround
        >
            {data.map((item, index) =>
                <Btn
                    onPress={() => navigate(screen.COMMING_SOON)}
                    alignCenter
                    key={item.title}
                    width={'20%'}
                >
                    <Box
                        radius={50}
                        padding={7}
                        backgroundColor={theme.gray2}
                    >
                        <Icon
                            size={18}
                            source={item.icon}
                            resizeMode={'contain'}
                        />
                    </Box>
                    <Txt size={10} marginTop={10} color={theme.black} center fontFamily={fonts.IBMPR}>
                        {t(item.title)}
                    </Txt>
                    {index === 3 &&
                        <Box
                            absolute
                            width={9}
                            height={9}
                            right={10}
                            radius={50}
                            backgroundColor={colors.red}
                        />
                    }
                </Btn>
            )}
        </Box>
    )
}