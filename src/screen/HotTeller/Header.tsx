import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { goBack, navigate } from '@navigation/navigationRef'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React from 'react'

interface Props {
    theme: any;
    t: any;
}

const IBMPM = fonts.IBMPM

const Header = ({ theme, t }: Props) => {

    return (
        <Box>
            <Box row justifySpaceBetween>
                <Btn onPress={() => goBack()}>
                    <Icon
                        size={14}
                        tintColor={theme.black}
                        source={require('@images/coppyTrade/close.png')}
                    />
                </Btn>
                <Box
                    row
                    alignStart
                >
                    <Txt color={theme.black} fontFamily={fonts.IBMPR} size={12}>
                        {t('My orders')}
                    </Txt>
                    <Btn
                        onPress={() => navigate(screen.HISTORY_COPY_TRADER)}
                        marginLeft={25}
                    >
                        <Icon
                            size={14}
                            resizeMode={'contain'}
                            tintColor={theme.black}
                            source={require('@images/p2p/menu.png')}
                        />
                    </Btn>
                </Box>
            </Box>

            <Box row marginTop={20}>
                <Txt color={theme.black} fontFamily={IBMPM} size={18}>
                    {t('Copy')}
                </Txt>
                <Txt
                    size={18}
                    marginLeft={10}
                    fontFamily={IBMPM}
                    color={colors.grayBlue}
                >
                    {t('Information resource')}
                </Txt>
            </Box>

            <Box
                row
                alignCenter
                marginTop={15}
                justifySpaceBetween
            >
                <Box row alignCenter>
                    <Box
                        radius={20}
                        padding={10}
                        backgroundColor={theme.gray2}
                    >
                        <Txt color={theme.black} fontFamily={fonts.IBMPM}>
                            {t('Contract')}
                        </Txt>
                    </Box>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM} marginLeft={10}>
                        {t('Spot')}
                    </Txt>
                </Box>

                <Box
                    radius={50}
                    alignCenter
                    padding={10}
                    justifyCenter
                    backgroundColor={theme.gray2}
                >
                    <Icon
                        size={15}
                        resizeMode={'contain'}
                        tintColor={theme.black}
                        source={require('@images/home/search.png')}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default Header