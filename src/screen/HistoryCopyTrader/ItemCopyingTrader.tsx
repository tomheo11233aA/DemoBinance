import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

interface Props {
    t: any;
    theme: any;
    item: any;
    showLast?: boolean;
    onOpenModalCancel?: (idCopy: number) => void;
}

const ItemCopyingTrader = ({
    t,
    theme,
    item,
    showLast = true,
    onOpenModalCancel,
}: Props) => {
    const PNL = item?.PnL >= 0 ?
        `+${numberCommasDot(item?.PnL?.toFixed(2))}` : `${numberCommasDot(item?.PnL?.toFixed(2))}`
    const colorPnL = item?.PnL >= 0 ? colors.green2 : colors.red3

    const ROE = item?.ROE >= 0 ?
        `+${numberCommasDot(item?.ROE?.toFixed(2))}` : `${numberCommasDot(item?.ROE?.toFixed(2))}`
    const colorROE = item?.ROE >= 0 ? colors.green2 : colors.red3

    const TP = item?.ROETP ?
        `${numberCommasDot(item?.ROETP?.toFixed(2))}` : `--`

    const SL = item?.ROESL ?
        `${numberCommasDot(item?.ROESL?.toFixed(2))}` : `--`

    const symbols = JSON.parse(item?.arraySymbol)?.map((i: any) => i.replace('USDT', '') + ' / ')
        || '--'

    // 2 flatlist đang dùng chung item này

    const showCancel = item?.cancel == 0 ? false : true

    const opacityCurrentCopying = !showCancel ? 1 : 0

    return (
        <Box
            paddingVertical={15}
            borderBottomWidth={1}
            borderColor={theme.gray2}
        >
            <Box row alignCenter justifySpaceBetween>
                <Txt fontFamily={fonts.IBMPM} color={theme.black}>
                    {item?.emailCopy}
                </Txt>
                <Txt color={colors.grayBlue} fontFamily={fonts.M24}>
                    {item?.core}
                    <Txt color={colors.grayBlue} size={12} bold>{' x'}</Txt>
                </Txt>
            </Box>

            <Box row alignStart marginTop={10} justifySpaceBetween>
                <Box>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        PNL
                    </Txt>
                    <Txt color={colorPnL} fontFamily={fonts.M24} marginTop={5}>
                        {PNL}
                    </Txt>
                </Box>

                <Box>
                    <Txt size={12} fontFamily={fonts.IBMPR} color={colors.grayBlue}>
                        TP/SL
                    </Txt>
                    <Txt color={theme.black} fontFamily={fonts.M23} marginTop={5}>
                        {TP}
                        <Txt color={colors.grayBlue} fontFamily={fonts.M23}>
                            {` / ${SL}`}
                        </Txt>
                    </Txt>
                </Box>

                <Box>
                    <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={12}>
                        ROE
                    </Txt>
                    <Txt color={colorROE} fontFamily={fonts.M24} marginTop={5}>
                        {ROE}
                    </Txt>
                </Box>
            </Box>

            <Box row marginTop={10} alignCenter justifySpaceBetween>
                <Txt size={12} fontFamily={fonts.IBMPR} color={colors.grayBlue}>
                    {t('Symbol')}
                </Txt>
                <Txt size={12} color={theme.black} fontFamily={fonts.M24}>
                    {symbols}
                </Txt>
            </Box>

            <Box row marginTop={10} alignCenter justifySpaceBetween>
                <Txt size={12} fontFamily={fonts.IBMPR} color={colors.grayBlue}>
                    {t('Time')}
                </Txt>
                <Txt size={12} color={theme.black} fontFamily={fonts.M24}>
                    {item?.created_at}
                </Txt>
            </Box>

            {showLast &&
                <Box row justifySpaceBetween alignStart marginTop={10}>
                    <Box opacity={opacityCurrentCopying}>
                        <Txt
                            size={12}
                            color={theme.black}
                            fontFamily={fonts.IBMPM}
                        >
                            {t('Currently copying')}
                        </Txt>
                    </Box>

                    {showCancel &&
                        <Btn
                            onPress={() => onOpenModalCancel && onOpenModalCancel(item?.idCopy)}
                            radius={5}
                            height={25}
                            alignSelf={'flex-end'}
                            paddingHorizontal={10}
                            backgroundColor={colors.yellow}
                        >
                            <Txt size={12} fontFamily={fonts.IBMPM}>
                                {t('Cancel')}
                            </Txt>
                        </Btn>
                    }
                </Box>
            }
        </Box>
    )
}

export default ItemCopyingTrader