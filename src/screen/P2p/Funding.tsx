import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

const Funding = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Box
            row
            justifySpaceBetween
            borderBottomWidth={1}
            borderColor={theme.gray2}
            paddingVertical={10}
        >
            <Box row>
                <MoreItem
                    title={t('Amount')}
                />
                <MoreItem
                    title={t('Payment method')}
                    width={80}
                />
                <MoreItem
                    title={t('Price')}
                    color={colors.yellow}
                />
            </Box>

            <Box row alignCenter>
                <Box
                    width={1}
                    height={10}
                    marginRight={5}
                    backgroundColor={colors.gray2}
                />
                <Txt size={12} fontFamily={fonts.SGM} color={colors.grayBlue}>
                    {t('Filter')}
                </Txt>
                <Icon
                    size={10}
                    marginLeft={5}
                    tintColor={colors.grayBlue}
                    source={require('@images/wallet/filter.png')}
                />
            </Box>
        </Box>
    )
}

interface PropsMoreItem {
    title: string;
    width?: number;
    color?: string;
}

const MoreItem = ({
    title,
    width = 70,
    color = colors.grayBlue,
}: PropsMoreItem) => {
    return (
        <Btn row alignCenter width={width} marginRight={15}>
            <Txt
                size={12}
                fontFamily={fonts.SGM}
                numberOfLines={1}
                color={color}
            >
                {title}
            </Txt>
            <Icon
                size={14}
                marginLeft={5}
                tintColor={color}
                source={require('@images/trade/more.png')}
            />
        </Btn>
    )
}

export default Funding