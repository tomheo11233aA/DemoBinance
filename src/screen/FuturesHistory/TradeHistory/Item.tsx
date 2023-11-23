import Box from '@commom/Box';
import Txt from '@commom/Txt';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import React from 'react';

interface Props {
    t: any;
    item: any;
    theme: any;
}

const SIZE = 16
const FONTS = fonts.M24

const Item = ({
    t,
    item,
    theme,
}: Props) => {
    return (
        <Box
            borderBottomWidth={1}
            borderColor={theme.gray}
            paddingVertical={20}
        >
            <Box row alignCenter justifySpaceBetween>
                <Box>
                    <Txt color={theme.black} fontFamily={fonts.RM} size={16}>
                        {item.symbol} {t('Perpetual')}
                    </Txt>
                    <Txt
                        marginTop={5}
                        fontFamily={fonts.RM}
                        color={item.side === 'Buy' ? colors.green2 : colors.red3}
                    >
                        {t(item.side)}
                    </Txt>
                </Box>

                <Txt color={colors.grayBlue} fontFamily={fonts.M24} size={15}>
                    {item.date}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween marginVertical={10}>
                <Txt color={colors.grayBlue}>
                    {t('Price')}
                </Txt>
                <Txt color={theme.black} fontFamily={FONTS} size={SIZE}>
                    {item.price}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween marginBottom={10}>
                <Txt color={colors.grayBlue}>
                    {'Amount BTC'}
                </Txt>
                <Txt color={theme.black} fontFamily={FONTS} size={SIZE}>
                    {item.amount}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween>
                <Txt color={colors.grayBlue}>
                    {'Transaction fee'}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.M24} size={15}>
                    {item.fee}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween marginTop={10}>
                <Txt color={colors.grayBlue}>
                    {'Role'}
                </Txt>
                <Txt color={theme.black} fontFamily={fonts.M24} size={15}>
                    {item.role}
                </Txt>
            </Box>

            <Box row alignCenter justifySpaceBetween marginTop={10}>
                <Box>
                    <Txt color={colors.grayBlue}>
                        {'Profits already recognized'}
                    </Txt>
                    <Txt color={colors.grayBlue}>(USDT)</Txt>
                </Box>

                <Txt color={theme.black} fontFamily={fonts.M24} size={SIZE}>
                    {item.profit}
                </Txt>
            </Box>
        </Box>
    )
}

export default Item