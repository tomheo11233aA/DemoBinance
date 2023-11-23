import Box from "@commom/Box"
import Btn from "@commom/Btn"
import Icon from "@commom/Icon"
import Txt from "@commom/Txt"
import { useAppSelector, useTheme } from "@hooks/index"
import { navigate } from "@navigation/navigationRef"
import { isLoginUserSelector } from "@selector/userSelector"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"
import { screen } from "@util/screens"
import { useTranslation } from "react-i18next"
import LinearGradient from "react-native-linear-gradient"

export default () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const isLogin = useAppSelector(isLoginUserSelector)

    const handle = () => {
        if (!isLogin) {
            navigate(screen.LOGIN)
        } else {
            navigate(screen.COMMING_SOON)
        }
    }

    return (
        <Box
            row
            height={90}
            marginTop={20}
            justifySpaceBetween
        >
            <Btn flex={1} onPress={() => {
                // if (!isLogin) {
                //     navigate(screen.LOGIN)
                // } else {
                //     navigate(screen.P2P_TAB)
                // }
                handle()
            }}>
                <LinearGradient
                    colors={[theme.white2, theme.yellow3]}
                    start={{ x: 0.3, y: 0.2 }} end={{ x: 1, y: 1 }}
                    style={{ height: '100%', width: '100%', borderRadius: 7, padding: 10 }}
                >
                    <Box absolute bottom={2} right={4} opacity={0.2}>
                        <Icon
                            size={30}
                            source={require('@images/home/team.png')}
                        />
                    </Box>
                    <Txt size={11} fontFamily={fonts.IBMPM} color={theme.white}>
                        {t('P2P Tranding')}
                    </Txt>
                    <Txt size={9} fontFamily={fonts.IBMPM} marginTop={5} color={colors.grayBlue2}>
                        {t('Bank Transfer, Digital Wallet Transfer Mobile')}
                    </Txt>
                </LinearGradient>
            </Btn>

            <Btn
                flex={1}
                onPress={() => {
                    if (!isLogin) {
                        navigate(screen.LOGIN)
                    } else {
                        navigate(screen.FUTURES_STACK)
                    }
                }}
                marginHorizontal={10}
            >
                <LinearGradient
                    colors={[theme.gray4, theme.white3]}
                    start={{ x: 0.3, y: 0.2 }} end={{ x: 1, y: 1 }}
                    style={{ height: '100%', width: '100%', borderRadius: 7, padding: 10 }}
                >
                    <Box flex={1}>
                        <Box absolute bottom={2} right={4} opacity={0.2}>
                            <Icon
                                source={require('@images/home/d.png')}
                                size={30}
                                opacity={0}
                            />
                        </Box>
                        <Txt size={11} fontFamily={fonts.IBMPM} color={theme.white}>
                            {t('Futures')}
                        </Txt>
                        <Txt size={9} fontFamily={fonts.IBMPM} marginTop={5} color={colors.grayBlue2}>
                            {t('Derivatives trading platform')}
                        </Txt>
                    </Box>
                </LinearGradient>
            </Btn>

            <Btn
                flex={1}
                onPress={handle}
            >
                <LinearGradient
                    colors={[theme.gray4, theme.white3]}
                    start={{ x: 0.3, y: 0.2 }} end={{ x: 1, y: 1 }}
                    style={{ height: '100%', width: '100%', borderRadius: 7, padding: 10 }}
                >
                    <Box flex={1}>
                        <Box absolute bottom={2} right={4} opacity={0.2}>
                            <Icon
                                source={require('@images/home/card2.png')}
                                size={30}
                            />
                        </Box>
                        <Txt size={11} fontFamily={fonts.IBMPM} color={theme.black}>
                            {t('Spot')}
                        </Txt>
                        <Txt size={9} fontFamily={fonts.IBMPM} marginTop={5} color={colors.grayBlue2}>
                            {t('Immediate trading of cryptocurrencies at current market prices')}
                        </Txt>
                    </Box>
                </LinearGradient>
            </Btn>
        </Box>
    )
}