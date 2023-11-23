import Box from "@commom/Box"
import Btn from "@commom/Btn"
import Icon from "@commom/Icon"
import Txt from "@commom/Txt"
import { useTheme } from "@hooks/index"
import { navigate } from "@navigation/navigationRef"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"
import { screen } from "@util/screens"

export default ({ t }: any) => {
    const theme = useTheme()

    return (
        <Btn
            row
            alignCenter
            justifySpaceBetween
            marginTop={25}
            onPress={() => navigate(screen.COMMING_SOON)}
        >
            <Box row alignCenter>
                <Icon
                    size={21}
                    marginRight={10}
                    tintColor={'#90929E'}
                    resizeMode={'contain'}
                    source={require('@images/profile/add.png')}
                />
                <Txt fontFamily={fonts.IBMPR} size={13} color={theme.black}>
                    {t('Referral')}
                </Txt>
            </Box>
            <Box row alignCenter>
                <Box
                    row
                    padding={3}
                    alignCenter
                    justifyCenter
                    marginRight={10}
                    backgroundColor={theme.yellow}
                >
                    <Icon
                        size={12}
                        marginRight={5}
                        source={require('@images/profile/gift2.png')}
                    />
                    <Txt size={10} fontFamily={fonts.IBMPR} color={colors.yellowBold}>
                        {t('Unlock Rewards')}
                    </Txt>
                </Box>
                <Icon
                    size={12}
                    resizeMode={'contain'}
                    source={require('@images/wallet/right_arrow.png')}
                />
            </Box>
        </Btn>
    )
}