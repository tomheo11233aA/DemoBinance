import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { IPositions } from 'src/model/futuresModel'

const percents = [25, 50, 75, 100]

interface Props {
    t: any;
    theme: any;
    percent: number;
    setPercent: Function;
    position: IPositions | null;
}

const AmountClose = ({
    t,
    theme,
    percent,
    position,
    setPercent,
}: Props) => {
    let equivalent = 0

    if (position) {
        const SIZE = position.margin * position.core
        equivalent = SIZE * (percent / 100)
    }

    return (
        <Box marginTop={20}>
            <Txt color={colors.gray5} fontFamily={fonts.AS}>{t('Amount')}</Txt>
            <Box
                row
                backgroundColor={theme.gray}
                height={40}
                marginTop={5}
                paddingHorizontal={10}
                justifySpaceBetween
                alignCenter
            >
                <Box row alignCenter>
                    <Txt fontFamily={fonts.M24} size={16} color={theme.black}>
                        {percent}
                    </Txt>
                    <Txt bold color={theme.black}>%</Txt>
                    <Txt fontFamily={fonts.AS} color={theme.black}>(≈</Txt>
                    <Txt fontFamily={fonts.M24} size={16} color={theme.black}>
                        {numberCommasDot(equivalent.toFixed(1))}
                    </Txt>
                    <Txt color={theme.black}>)</Txt>
                </Box>
                <Txt color={colors.gray5} fontFamily={fonts.RM}>USDT</Txt>
            </Box>

            <Box row alignCenter marginTop={10} justifySpaceBetween>
                {percents.map((item: number) => {
                    const colorBG = item <= percent ? theme.grayBlue: theme.gray3
                    const color = item <= percent ? theme.grayBlue: colors.gray5
                    return (
                        <Btn
                            key={item}
                            width={'24%'}
                            onPress={() => setPercent(item)}
                        >
                            <Box width={'100%'} height={12} backgroundColor={colorBG} />
                            <Box marginTop={2} row alignCenter>
                                <Txt fontFamily={fonts.M24} size={13} color={color}>
                                    {item}
                                </Txt>
                                <Txt bold size={11} fontFamily={fonts.FSCR} color={color}>%</Txt>
                            </Box>
                        </Btn>
                    )
                })}
            </Box>
        </Box>
    )
}

export default AmountClose