import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Profile } from 'src/model/userModel'

interface Props {
    profile: Profile
}

const Avatar = ({ profile }: Props) => {
    return (
        <Box alignCenter marginTop={30}>
            <Icon
                size={65}
                source={require('@images/home/user2.png')}
            />
            <Box row alignCenter marginTop={25} marginBottom={20}>
                <Txt fontFamily={fonts.AS} size={20}>
                    {profile?.userName}
                </Txt>
                <Icon
                    size={18}
                    marginLeft={10}
                    resizeMode={'contain'}
                    source={require('@images/home/pen.png')}
                />
            </Box>
        </Box>
    )
}

export default Avatar