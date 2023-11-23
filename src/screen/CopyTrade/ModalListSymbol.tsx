import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Scroll from '@commom/Scroll';
import Txt from '@commom/Txt';
import { useTheme } from '@hooks/index';
import Modality from '@reuse/Modality'
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import { height, width } from '@util/responsive';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Pressable } from 'react-native';
import { ICoins } from 'src/model/futuresModel';

interface Props {
    show: boolean;
    coins: ICoins[];
    setShow: Function;
    symbols: string[];
    setSymbols: Function;
    arraySymbol: string[];
    setArrSymbol: Function;
}

const ModalListSymbol = ({
    show,
    coins,
    setShow,
    symbols,
    setSymbols,
    arraySymbol,
    setArrSymbol,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Modality
            show={show}
            setShow={setShow}
            close={false}
        >
            <Pressable onPress={() => {
                setSymbols(arraySymbol)
                setShow(false)
            }}>
                <Box width={width} height={height} opacity={0} />
            </Pressable>
            <Box
                absolute
                bottom={0}
                height={height * 50 / 100}
                width={width}
                paddingTop={10}
                paddingBottom={40}
                paddingHorizontal={15}
                borderTopLeftRadius={10}
                borderTopRightRadius={10}
                backgroundColor={theme.bg}
            >
                <Box flex={1}>
                    <Box alignCenter>
                        <Txt color={theme.black} fontFamily={fonts.IBMPM} size={16}>
                            {t('Symbol')}
                        </Txt>
                    </Box>

                    <Scroll paddingBottom={50}>
                        <Btn
                            onPress={() => {
                                if (symbols.length == coins.length) {
                                    setSymbols([])
                                } else {
                                    setSymbols(coins.map((coin) => coin.symbol))
                                }
                            }}
                            row
                            marginTop={20}
                            justifyCenter={false}
                        >
                            <Box
                                width={15}
                                radius={50}
                                height={15}
                                borderWidth={1}
                                marginRight={10}
                                borderColor={theme.gray2}
                            >
                                {symbols.length == coins.length &&
                                    <Txt size={10} color={colors.yellow} bold>✓</Txt>
                                }
                            </Box>
                            <Txt color={theme.black} fontFamily={fonts.IBMPR}>
                                {t('All of the below')}
                            </Txt>
                        </Btn>
                        {coins.map((coin) =>
                            <Btn
                                onPress={() => {
                                    if (symbols.includes(coin.symbol)) {
                                        let symbolsFilter = symbols.filter((symbol) => symbol != coin.symbol)
                                        setSymbols(symbolsFilter)
                                    } else {
                                        setSymbols([...symbols, coin.symbol])
                                    }
                                }}
                                row
                                key={coin.id}
                                marginTop={20}
                                alignCenter={false}
                                justifyCenter={false}
                            >
                                <Box
                                    width={15}
                                    radius={50}
                                    height={15}
                                    alignCenter
                                    justifyCenter
                                    borderWidth={1}
                                    marginRight={10}
                                    borderColor={theme.gray2}
                                >
                                    {symbols.includes(coin.symbol) &&
                                        <Txt size={10} color={colors.yellow} bold>✓</Txt>
                                    }
                                </Box>
                                <Txt color={theme.black} fontFamily={fonts.IBMPR}>
                                    {coin.symbol}
                                </Txt>
                            </Btn>
                        )}
                    </Scroll>
                </Box>

                <Btn
                    onPress={() => {
                        setArrSymbol(symbols)
                        setShow(false)
                    }}
                    radius={20}
                    paddingVertical={10}
                    backgroundColor={colors.yellow}
                >
                    <Txt fontFamily={fonts.IBMPM}>
                        {t('Confirm')}
                    </Txt>
                </Btn>
            </Box>
        </Modality>
    )
}

export default ModalListSymbol