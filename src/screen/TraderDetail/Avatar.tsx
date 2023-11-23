import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import Back from '@reuse/Back'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import ModalShowDay from './ModalShowDay'

const Avatar = ({ theme, t, hotTrader }: any) => {
    return (
        <Box paddingHorizontal={15}>
            <Box row alignCenter justifySpaceBetween>
                <Back size={16} />
                <Box row alignCenter>
                    <Icon
                        marginRight={10}
                        size={16}
                        source={require('@images/profile/gift2.png')}
                    />
                    <Icon
                        size={20}
                        resizeMode={'contain'}
                        source={require('@images/login/dots.png')}
                    />
                </Box>
            </Box>

            <Box row justifySpaceBetween marginTop={30}>
                <Box>
                    <Icon
                        size={40}
                        source={require('@images/home/user.png')}
                    />
                    <Box row marginTop={10} alignCenter>
                        <Txt
                            color={theme.black}
                            fontFamily={fonts.IBMPM}
                        >
                            {hotTrader?.email}
                        </Txt>
                        <Icon
                            size={13}
                            marginLeft={15}
                            source={require('@images/coppyTrade/medal_yellow.png')}
                        />
                    </Box>
                </Box>

                <Btn
                    height={35}
                    radius={20}
                    paddingHorizontal={40}
                    backgroundColor={colors.yellow}
                >
                    <Txt size={12} fontFamily={fonts.IBMPM}>
                        {`+${t('Follow')}`}
                    </Txt>
                </Btn>
            </Box>

            <Box row alignCenter marginTop={10}>
                <Txt color={theme.black} fontFamily={fonts.M23}>
                    {'0 '}
                </Txt>
                <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                    {`${t('Follower')} | `}
                </Txt>
                <Txt color={colors.grayBlue} fontFamily={fonts.M17}>
                    {`${hotTrader?.created_at} `}
                </Txt>
                <Txt size={12} fontFamily={fonts.IBMPR} color={colors.grayBlue}>
                    {t('Joined')}
                </Txt>
            </Box>

            <ModalShowDay />
        </Box>
    )
}

export default Avatar