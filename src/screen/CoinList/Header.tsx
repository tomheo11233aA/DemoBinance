import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { goBack } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

const Header = ({ theme, t }: any) => {
    return (
        <Box row>
            <Box
                flex={1}
                radius={20}
                height={35}
                backgroundColor={theme.gray2}
            >
                <Input
                    height={35}
                    hint={t('Search')}
                    paddingHorizontal={40}
                    color={colors.grayBlue}
                    style={{ fontFamily: fonts.AS }}
                />
                <Box width={20} absolute top={8} left={10}>
                    <Icon
                        size={18}
                        source={require('@images/home/search.png')}
                    />
                </Box>
            </Box>
            <Btn width={70} onPress={() => goBack()}>
                <Txt fontFamily={fonts.AS} color={colors.yellowBold}>
                    {t('Cancel')}
                </Txt>
            </Btn>
        </Box >
    )
}

export default Header