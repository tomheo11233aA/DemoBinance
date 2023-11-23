import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { numberCommasDot } from '@method/format'
import { fonts } from '@theme/fonts'
import React from 'react'
import { ICoins } from 'src/model/futuresModel'

interface Props {
    coin: ICoins;
    theme: any;
    onChooseCoin: Function;
}

const CoinItem = ({ coin, onChooseCoin, theme }: Props) => {
    let percentChange: string = ''
    let colorPercentChange: string = '#f1485f'

    if (coin.percentChange > 0) {
        percentChange = `+${coin.percentChange.toFixed(2)}`
        colorPercentChange = '#30bc86'
    } else {
        percentChange = `${coin.percentChange.toFixed(2)}`
    }

    return (
        <Btn
            onPress={() => onChooseCoin(coin)}
            row
            justifySpaceBetween
            marginVertical={10}
        >
            <Box>
                <Txt size={14} color={theme.black}>{coin.symbol}</Txt>
                <Txt color={'#96969e'} size={11}>
                    Vĩnh cửu
                </Txt>
            </Box>

            <Box alignEnd>
                <Txt size={15} fontFamily={'Myfont24-Regular'} color={theme.black}>
                    {numberCommasDot(coin.close || 0)}
                </Txt>
                <Box row alignCenter marginTop={5}>
                    <Txt
                        size={12}
                        fontFamily={'Myfont23-Regular'}
                        color={colorPercentChange}
                    >
                        {numberCommasDot(percentChange || 0)}
                    </Txt>
                    <Txt fontFamily={fonts.IBMPR} color={colorPercentChange} size={11}>
                        {'%'}
                    </Txt>
                </Box>
            </Box>
        </Btn>
    )
}

export default CoinItem