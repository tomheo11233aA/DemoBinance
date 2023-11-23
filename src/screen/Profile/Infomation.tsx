import Box from "@commom/Box";
import Btn from "@commom/Btn";
import Icon from "@commom/Icon";
import Img from "@commom/Img";
import Txt from "@commom/Txt";
import { useAppDispatch, useAppSelector, useTheme } from "@hooks/index";
import { reset } from "@navigation/navigationRef";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { kycUserSelector, profileUserSelector } from "@selector/userSelector";
import userSlice from "@slice/userSlice";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import contants from "@util/contants";
import { screen } from "@util/screens";
import { Profile } from "src/model/userModel";

export default ({ t }: any) => {
    const theme = useTheme()
    const kyc = useAppSelector(kycUserSelector)
    const profile: Profile = useAppSelector<any>(profileUserSelector)

    const kycOjb = {
        approved: {
            text: 'Verified',
            color: '#3cb389',
            backgroundColor: theme.green,
            icon: require('@images/profile/checkmark.png'),
            sizeIcon: 12,
        },
        pendding: {
            text: 'Pending',
            color: colors.yellowBold,
            backgroundColor: theme.yellow,
            icon: require('@images/p2p/oclock.png'),
            sizeIcon: 9,
        },
        notKyc: {
            text: 'Not verified',
            color: colors.red,
            backgroundColor: theme.red2,
            icon: require('@images/profile/close.png'),
            sizeIcon: 9,
        },
    }

    const kycStatus = kyc === contants.KYC_APPROVED ? kycOjb.approved :
        kyc === contants.KYC_PENDING ? kycOjb.pendding : kycOjb.notKyc 

    return (
        <Box>
            <Box row alignCenter marginTop={30}>
                <Box flex={1} row>
                    <Img
                        width={32}
                        height={33}
                        marginRight={10}
                        source={require('@images/home/user.png')}
                    />
                    <Box>
                        <Txt color={colors.grayBlue2} size={10}>
                            ID: {profile.id}
                        </Txt>
                        <Txt fontFamily={fonts.AS} size={18} color={theme.black}>
                            {profile.userName}
                        </Txt>
                        <Box
                            row
                            alignCenter
                            marginTop={10}
                        >
                            <Box
                                row
                                radius={5}
                                alignCenter
                                marginRight={5}
                                paddingVertical={3}
                                paddingHorizontal={5}
                                backgroundColor={kycStatus.backgroundColor}
                            >
                                <Icon
                                    marginRight={3}
                                    resizeMode={'contain'}
                                    source={kycStatus.icon}
                                    size={kycStatus.sizeIcon}
                                    tintColor={kycStatus.color}
                                />
                                <Txt size={10} color={kycStatus.color} fontFamily={fonts.RM}>
                                    {t(kycStatus.text)}
                                </Txt>
                            </Box>

                            <Box
                                row
                                radius={5}
                                alignCenter
                                marginRight={5}
                                paddingVertical={3}
                                paddingHorizontal={5}
                                backgroundColor={theme.gray}
                            >
                                <Icon
                                    size={11}
                                    marginRight={5}
                                    resizeMode={'contain'}
                                    tintColor={theme.black}
                                    source={require('@images/profile/diamond.png')}
                                />
                                <Txt
                                    size={10}
                                    color={theme.black}
                                    fontFamily={fonts.IBMPM}
                                >
                                    {t('Regular')}
                                </Txt>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Icon
                    size={12}
                    resizeMode={'contain'}
                    source={require('@images/wallet/right_arrow.png')}
                />
            </Box>

            <Box width={'100%'} height={1} backgroundColor={theme.gray2} marginTop={20} />
        </Box>
    )
}
