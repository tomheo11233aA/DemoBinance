import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Img from '@commom/Img'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import { navigate } from '@navigation/navigationRef'
import { isLoginUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React from 'react'
import { Platform, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Notification from '../../assets/images/svg/notification.svg'
import { themeUserSelector } from '@selector/userSelector'

const LEFT = 20

const Header = () => {
    const theme = useTheme()
    const isLogin = useAppSelector(isLoginUserSelector)
    const themeUser = useAppSelector(themeUserSelector)
    const handleMoveProfileScreen = () => {
        if (isLogin) {
            navigate(screen.PROFILE)
        } else {
            navigate(screen.LOGIN)
        }
    }

    return (
        <Box
            row
            alignCenter
            justifySpaceBetween
            marginTop={Platform.OS === 'android' ? 10 : 0}
        >
            <TouchableOpacity onPress={handleMoveProfileScreen}>
                <Img
                    source={(require('@images/iconbinance.png'))}
                    width={wp(5.5)}
                    height={hp(2.5)}
                    resizeMode={'stretch'}
                    radius={7}
                />
            </TouchableOpacity>

            <Box
                flex={1}
                height={hp(3.5)}
                radius={8}
                justifyCenter
                marginLeft={15}
                backgroundColor={theme.gray2}
            >
                <Input
                    // paddingHorizontal={30}
                    paddingHorizontal={wp(8)}
                    hint={'BTC'}
                    hintColor={colors.gray77}
                    style={{
                        fontSize: 14,
                        fontFamily: fonts.BNPM,
                        color: colors.black
                    }}
                    color={colors.grayBlue}
                />
                <Box absolute left={12}>
                    <Icon
                        source={require('@images/home/search.png')}
                        // size={15}
                        size={wp(2.8)}
                    />
                </Box>
            </Box>

            <Box row alignCenter>
                <TouchableOpacity>
                    <Icon
                        source={require('@images/home/scan.png')}
                        // size={16}
                        size={hp(1.6)}
                        marginLeft={LEFT}
                        // tintColor={'#1E2329'}
                        tintColor={themeUser === 'dark' ? '#fff' : '#1E2329'}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon
                        source={require('@images/profile/cskh.png')}
                        // size={19}
                        size={hp(1.6)}
                        marginLeft={LEFT}
                        resizeMode='contain'
                        // tintColor={'#1E2329'}
                        tintColor={themeUser === 'dark' ? '#fff' : '#1E2329'}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon
                        source={require('@images/myHome/notification.png')}
                        size={hp(2)}
                        marginLeft={LEFT}
                        resizeMode='contain'
                        // tintColor={'#1E2329'}
                        tintColor={themeUser === 'dark' ? '#fff' : '#1E2329'}
                    />
                    {/* <Notification
                        width={25}
                        height={22}
                        style={{
                            marginLeft: LEFT,
                        }}
                    /> */}
                    <Box
                        backgroundColor={colors.yellow}
                        alignCenter
                        justifyCenter
                        absolute
                        width={hp(1.6)}
                        height={hp(1.6)}
                        radius={50}
                        right={-hp(0.9)}
                        top={-hp(0.8)}
                    >
                        <Txt size={10} fontFamily={fonts.BNPL}>0</Txt>
                    </Box>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon
                        source={require('@images/home/hand-coin.png')}
                        // size={19}
                        size={hp(1.6)}
                        marginLeft={LEFT}
                        resizeMode='contain'
                        // tintColor={colors.gray10}
                        // tintColor={'#1E2329'}
                        tintColor={themeUser === 'dark' ? '#fff' : '#1E2329'}
                    />
                </TouchableOpacity>
            </Box>
        </Box>
    )
}

export default Header