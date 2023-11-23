import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Icon from '@commom/Icon';
import Txt from '@commom/Txt';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import React from 'react';
import Line from './Line';
import { numberCommasDot } from '@method/format';

interface Props {
    t: any;
    theme: any;
    item: any;
    handleMoveDetailTrade: Function;
    handleOpenCopyTrade: Function;
}

const TraderItem = ({
    t,
    item,
    theme,
    handleOpenCopyTrade,
    handleMoveDetailTrade,
}: Props) => {
    const ROE = item?.lastROE >= 0 ?
        `+${numberCommasDot(item?.lastROE?.toFixed(2))}` : `${numberCommasDot(item?.lastROE?.toFixed(2))}`

    const colorROE = item?.lastROE >= 0 ? colors.green2 : colors.red

    return (
        <Box
            radius={10}
            padding={15}
            borderWidth={1}
            marginBottom={10}
            borderColor={theme.gray2}
        >
            <Box row>
                <Box
                    paddingRight={15}
                    justifySpaceBetween
                    alignStart
                >
                    <Icon
                        size={28}
                        source={require('@images/home/user.png')}
                    />

                    <Box rotateZ={'-90deg'}>
                        <Txt color={colors.grayBlue} fontFamily={fonts.AS} marginBottom={20}>
                            Binance
                        </Txt>
                    </Box>
                </Box>

                <Box flex={1}>
                    <Box
                        paddingBottom={10}
                        borderBottomWidth={1}
                        borderColor={theme.gray2}
                    >
                        <Btn
                            row
                            alignCenter
                            justifySpaceBetween
                            onPress={() => handleMoveDetailTrade(item)}
                        >
                            <Box>
                                <Txt color={theme.black} fontFamily={fonts.IBMPM}>
                                    {item.email}
                                </Txt>
                                <Box row alignCenter>
                                    <Icon
                                        size={13}
                                        marginRight={5}
                                        source={require('@images/coppyTrade/medal_yellow.png')}
                                    />
                                    <Txt
                                        size={12}
                                        color={theme.black}
                                        fontFamily={fonts.IBMPR}
                                    >
                                        {t(`Binance HD standard`)}
                                    </Txt>
                                </Box>
                            </Box>
                            <Btn
                                radius={15}
                                paddingVertical={3}
                                paddingHorizontal={15}
                                backgroundColor={colors.yellow}
                                onPress={() => handleOpenCopyTrade(item)}
                            >
                                <Txt fontFamily={fonts.IBMPR} size={13}>
                                    {t('Copy')}
                                </Txt>
                            </Btn>
                        </Btn>

                        <Box row>
                            <Box marginTop={10} flex={1}>
                                <Txt
                                    size={18}
                                    fontFamily={fonts.M23}
                                    color={colorROE}
                                >
                                    {ROE}
                                    <Txt
                                        color={colorROE}
                                        fontFamily={fonts.IBMPM}
                                    >
                                        %
                                    </Txt>
                                </Txt>
                                <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                                    {t('Exchange rate last 30 days')}
                                </Txt>
                            </Box>

                            <Line {...{ item, theme }} />
                        </Box>
                    </Box>

                    <Box
                        row
                        alignCenter
                        marginTop={10}
                        justifySpaceBetween
                    >
                        <Box row alignCenter>
                            <Txt color={colors.grayBlue} size={12} fontFamily={fonts.IBMPR}>
                                {t('Copiers')}
                            </Txt>
                            <Txt color={theme.black} marginLeft={10} fontFamily={fonts.M24}>
                                {item.userCopy}
                            </Txt>
                        </Box>

                        <Box row alignCenter>
                            <Txt color={colors.grayBlue} size={12} fontFamily={fonts.IBMPR} marginRight={5}>
                                {t('Risk')}
                            </Txt>
                            <Box
                                radius={5}
                                borderWidth={1}
                                padding={3}
                                borderColor={colors.yellow}
                                backgroundColor={theme.yellow7}
                            >
                                <Txt color={colors.yellow} fontFamily={fonts.M23} size={13}>
                                    --
                                </Txt>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default TraderItem