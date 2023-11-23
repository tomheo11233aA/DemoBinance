import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    title: string;
    value: string;
    onPress?: Function;
    marginRight?: number;
}

const DownItem = ({
    title,
    value,
    onPress,
    marginRight = 20,
}: Props) => {
    const { t } = useTranslation()

    return (
        <Btn
            row
            alignCenter
            onPress={onPress}
            marginRight={marginRight}
        >
            <Txt
                size={13}
                fontFamily={fonts.IBMPM}
                color={colors.grayBlue}
            >
                {t(title) + t(value)}
            </Txt>
            <Icon
                size={14}
                source={require('@images/trade/more.png')}
            />
        </Btn>
    )
}

export default DownItem