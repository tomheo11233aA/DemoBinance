import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { percentSpotSelector, sideSpotSelector, totalSpotSelector, typeTradeSpotSelector } from '@selector/spotSelector'
import { cathEventWhemChangeCurreny, setPercent, setTotal } from '@slice/spotSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect } from 'react'
import { TextInput } from 'react-native'

const percents = [25, 50, 75, 100]

const Percent = ({ theme, t }: any) => {
    const dispatch = useAppDispatch()
    const side = useAppSelector(sideSpotSelector)
    const total = useAppSelector(totalSpotSelector)
    const percent = useAppSelector(percentSpotSelector)
    const typeTrade = useAppSelector(typeTradeSpotSelector)

    useEffect(() => {
        dispatch(cathEventWhemChangeCurreny())
    }, [])

    const handleSetPercent = (item: number) => {
        dispatch(setPercent(item))
    }

    return (
        <Box marginTop={5}>
            <Box row>
                {percents.map((item) =>
                    <Item
                        key={item}
                        item={item}
                        side={side}
                        theme={theme}
                        percent={percent}
                        onSetPercent={handleSetPercent}
                    />
                )}
            </Box>
            {typeTrade === 'Limit' &&
                <TextInput
                    placeholder={`${t('Total')} (USDT)`}
                    value={total.toString()}
                    keyboardType={'decimal-pad'}
                    selectionColor={colors.yellow}
                    placeholderTextColor={colors.grayBlue}
                    onChangeText={(txt: string) => dispatch(setTotal(txt))}
                    style={{
                        height: 45,
                        width: '100%',
                        marginTop: 10,
                        color: theme.black,
                        textAlign: 'center',
                        paddingHorizontal: 5,
                        backgroundColor: theme.gray2,
                        fontSize: total.toString() === '' ? 15 : 18,
                        fontFamily: total.toString() === '' ? fonts.RM : 'Myfont20-Regular',
                    }}
                />
            }
        </Box>
    )
}

interface Iitem {
    theme: any;
    item: number;
    percent: number;
    side: 'buy' | 'sell';
    onSetPercent: (item: number) => void;
}

const Item = ({ item, theme, percent, onSetPercent, side }: Iitem) => {
    return (
        <Btn flex={1} onPress={() => onSetPercent(item)}>
            <Box
                height={10}
                width={'90%'}
                marginBottom={5}
                backgroundColor={
                    (percent >= item && side === 'buy') ? colors.green2
                        : (percent >= item && side === 'sell') ? colors.red2 : theme.gray2
                }
            />
            <Txt
                fontFamily={fonts.M24}
                color={percent === item ? theme.black : colors.gray5}
            >
                {item}
                <Txt
                    size={13}
                    color={percent === item ? theme.black : colors.gray5}
                >
                    %
                </Txt>
            </Txt>
        </Btn>
    )
}

export default Percent