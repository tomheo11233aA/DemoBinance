import { View, Text } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@commom/Box';
import Txt from '@commom/Txt';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import Icon from '@commom/Icon';
import Btn from '@commom/Btn';
import { navigate } from '@navigation/navigationRef';
import { screen } from '@util/screens';

interface Props {
    theme: any;
    t: any;
}

const WeekDayTeller = ({ theme, t }: Props) => {
    return (
        <Btn
            row
            alignCenter
            marginTop={15}
            justifySpaceBetween
            onPress={() => navigate(screen.SIGN_UP_TRADER)}
        >
            <Box>
                <Txt color={theme.black} fontFamily={fonts.IBMPM}>
                    {t('Recruiting Elite Traders')}
                </Txt>
                <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12} marginTop={4}>
                    {t('Apply Now')}
                </Txt>
            </Box>
            <Icon
                size={10}
                resizeMode={'contain'}
                tintColor={theme.black}
                source={require('@images/wallet/right_arrow.png')}
            />
        </Btn>
    )
}

export default WeekDayTeller