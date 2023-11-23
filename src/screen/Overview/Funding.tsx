import { View, Text } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'

const Funding = () => {
    return (
        <Box alignCenter>
            <Icon
                source={require('@images/future/hand-coin.png')}
                size={120}
                marginVertical={25}
            />
            <Txt color={colors.gray5} size={15} marginBottom={15}>
                Your account has no assets
            </Txt>
            <Box row>
                <Box
                    flex={1}
                    backgroundColor={colors.gray}
                    padding={10}
                    radius={5}
                >
                    <Box
                        width={45}
                        height={45}
                        alignCenter
                        backgroundColor={colors.white}
                        justifyCenter
                        radius={50}
                    >
                        <Icon
                            source={require('@images/future/referral.png')}
                            size={22}
                        />
                    </Box>
                    <Txt fontFamily={fonts.RM} marginTop={10}>P2P Trading</Txt>
                </Box>

                <Box
                    flex={1}
                    backgroundColor={colors.gray}
                    marginHorizontal={10}
                    radius={5}
                    padding={10}
                >
                    <Box
                        width={45}
                        height={45}
                        alignCenter
                        backgroundColor={colors.white}
                        justifyCenter
                        radius={50}
                    >
                        <Icon
                            source={require('@images/home/mail.png')}
                            size={22}
                        />
                    </Box>
                    <Txt fontFamily={fonts.RM} marginTop={10}>P2P Trading</Txt>
                </Box>

                <Box
                    flex={1}
                    backgroundColor={colors.gray}
                    radius={5}
                    padding={10}
                >
                    <Box
                        width={50}
                        height={50}
                        alignCenter
                        backgroundColor={colors.white}
                        justifyCenter
                        radius={50}
                    >
                        <Icon
                            source={require('@images/future/d.png')}
                            size={25}
                        />
                    </Box>
                    <Txt fontFamily={fonts.RM} marginTop={10}>Deposit VND</Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default Funding