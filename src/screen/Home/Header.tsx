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

const LEFT = 20

const Header = () => {
    const theme = useTheme()
    const isLogin = useAppSelector(isLoginUserSelector)

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
                    source={require('@images/home/user.png')}
                    width={21}
                    height={22}
                    resizeMode={'stretch'}
                />
            </TouchableOpacity>

            <Box
                flex={1}
                height={30}
                radius={20}
                justifyCenter
                marginLeft={15}
                backgroundColor={theme.gray2}
            >
                <Input
                    height={40}
                    paddingHorizontal={40}
                    hint={'BTC'}
                    style={{ fontSize: 16 }}
                    color={colors.grayBlue}
                />
                <Box width={20} absolute top={8} left={10}>
                    <Icon
                        source={require('@images/home/search.png')}
                        size={16}
                    />
                </Box>
            </Box>

            <Box row alignCenter>
                <TouchableOpacity>
                    <Icon
                        source={require('@images/home/scan.png')}
                        size={16}
                        marginLeft={LEFT}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon
                        source={require('@images/profile/cskh.png')}
                        size={19}
                        marginLeft={LEFT}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon
                        source={require('@images/home/bell.png')}
                        size={19}
                        marginLeft={LEFT}
                        resizeMode='contain'
                        tintColor={colors.gray10}
                    />
                    <Box
                        backgroundColor={colors.yellow}
                        alignCenter
                        justifyCenter
                        absolute
                        width={19}
                        height={21}
                        radius={50}
                        right={-10}
                        top={-15}
                    >
                        <Txt size={10} fontFamily={fonts.OL}>0</Txt>
                    </Box>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon
                        source={require('@images/home/hand-coin.png')}
                        size={19}
                        marginLeft={LEFT}
                        resizeMode='contain'
                        tintColor={colors.gray10}
                    />
                </TouchableOpacity>
            </Box>
        </Box>
    )
}

export default Header