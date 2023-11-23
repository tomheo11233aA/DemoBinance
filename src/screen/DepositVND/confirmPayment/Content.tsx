import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Icon from '@commom/Icon';
import Txt from '@commom/Txt';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import React from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

interface Props {
    t: any;
    theme: any;
    title: string;
    content: string;
}

const Content = ({
    t,
    theme,
    title,
    content,
}: Props) => {
    return (
        <Box
            row
            alignCenter
            marginTop={15}
            justifySpaceBetween
        >
            <Txt
                fontFamily={fonts.IBMPR}
                color={colors.grayBlue}
            >
                {title}
            </Txt>
            <Box row alignCenter>
                <Txt fontFamily={fonts.AS} color={theme.black} marginRight={5}>
                    {t(content)}
                </Txt>
                <Btn onPress={() => Clipboard.setString(content)}>
                    <Icon
                        size={15}
                        tintColor={colors.grayBlue}
                        source={require('@images/profile/copy.png')}
                    />
                </Btn>
            </Box>
        </Box>
    )
}

export default Content