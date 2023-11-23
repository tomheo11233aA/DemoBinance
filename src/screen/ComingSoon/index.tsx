import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { applyLetterSpacing } from '@method/format'
import Back from '@reuse/Back'
import Safe from '@reuse/Safe'
import { colors } from '@theme/colors'
import { height, width } from '@util/responsive'
import React from 'react'
import { Platform, Text } from 'react-native'

const ComingSoon = ({ showBack = true }) => {
    return (
        <Safe paddingHorizontal={15}>
            {showBack ? <Back size={16} /> : <></>}

            <Box
                flex={1}
                alignCenter
                justifyCenter
            >
                <Icon
                    marginTop={-height * 30 / 100}
                    marginLeft={20}
                    size={width * 90 / 100}
                    source={require('@images/planet2.png')}
                />
                <Txt
                    bold
                    size={20}
                    marginTop={-50}
                    color={colors.yellow}
                >
                    {applyLetterSpacing('COMING SOON', Platform.OS === 'ios' ? 10 : 5)}
                </Txt>
            </Box>
        </Safe>
    )
}

export default ComingSoon