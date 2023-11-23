import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import ModalListSymbol from './ModalListSymbol'
import { getListCoin } from '@service/tradeService'

const Pair = ({
    t,
    theme,
    arraySymbol,
    setArrSymbol,
}: any) => {
    const [coins, setCoins] = useState([])
    const [symbols, setSymbols] = useState([])
    const [isShowModalSymbol, setShowModalSymbols] = useState(false)

    useEffect(() => {
        handleGetCoins()
    }, [])

    const handleGetCoins = async () => {
        setSymbols(arraySymbol)
        const res = await getListCoin()
        if (res.status) {
            setCoins(res.data)
        }
    }

    return (
        <Btn
            row
            radius={5}
            marginTop={15}
            justifySpaceBetween
            paddingVertical={15}
            paddingHorizontal={10}
            backgroundColor={theme.gray2}
            onPress={() => setShowModalSymbols(true)}
        >
            <Txt color={theme.black} fontFamily={fonts.IBMPM}>
                {t('Pair')}
            </Txt>

            <Box row alignCenter>
                <Txt fontFamily={fonts.IBMPR} color={colors.grayBlue}>
                    {t('Copy the trader')}
                </Txt>
                <Icon
                    size={10}
                    marginLeft={10}
                    resizeMode={'contain'}
                    source={require('@images/wallet/right_arrow.png')}
                />
            </Box>
            <ModalListSymbol
                coins={coins}
                setSymbols={setSymbols}
                symbols={symbols}
                arraySymbol={arraySymbol}
                setArrSymbol={setArrSymbol}
                show={isShowModalSymbol}
                setShow={setShowModalSymbols}
            />
        </Btn>
    )
}

export default Pair