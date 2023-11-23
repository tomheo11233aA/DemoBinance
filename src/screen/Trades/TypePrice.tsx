import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { styled } from '@theme/styled'
import React, { useState } from 'react'
import { StyleSheet, TextInput } from 'react-native'

interface Props {
    theme: any;
    price: string;
    setPrice: any;
    typeTrade: 'Market' | 'Limit';
    setTypeTrade: Function;
}

const types = ['Market', 'Limit']

const TypePrice = ({
    theme,
    price,
    setPrice,
    typeTrade,
    setTypeTrade,
}: Props) => {
    const [moreType, setMoreType] = useState<boolean>(false)

    return (
        <Box
            row
            marginTop={20}
            zIndex={1}
        >
            <Box width={'60%'}>
                <Txt color={colors.gray5} fontFamily={fonts.AS}>Price</Txt>
                <Box
                    backgroundColor={typeTrade === 'Market' ? theme.gray7 : theme.gray}
                    paddingHorizontal={10}
                    row
                    height={40}
                    alignCenter
                    marginTop={5}
                >
                    <Box flex={1}>
                        <TextInput
                            value={price}
                            onChangeText={setPrice}
                            placeholder={'Market Price'}
                            editable={typeTrade === 'Limit'}
                            placeholderTextColor={colors.gray5}
                            style={[styles.priceInput, { color: theme.black }]}
                        />
                    </Box>
                    <Txt fontFamily={fonts.RM} color={colors.gray5} size={15}>USDT</Txt>
                </Box>
            </Box>

            <Box width={'40%'} marginLeft={5}>
                <Txt color={colors.gray5} fontFamily={fonts.AS}>Limit</Txt>
                <Btn
                    onPress={() => setMoreType(!moreType)}
                    width={'100%'}
                    backgroundColor={theme.gray}
                    height={40}
                    marginTop={5}
                    paddingHorizontal={10}
                    row
                    justifyCenter={false}
                >
                    <Box flex={1}>
                        <Txt fontFamily={fonts.RM} color={theme.black}>
                            {typeTrade}
                        </Txt>
                    </Box>
                    <Box rotateZ={moreType ? '180deg' : '0deg'}>
                        <Icon
                            source={require('@images/trade/more.png')}
                            tintColor={theme.black}
                            size={13}
                        />
                    </Box>
                </Btn>

                {moreType &&
                    <Box
                        width={'100%'}
                        style={styled.shadow}
                        backgroundColor={theme.bg}
                        absolute
                        top={70}
                        paddingBottom={7}
                    >
                        {types.map((item: string) =>
                            <Btn
                                onPress={() => {
                                    setMoreType(false)
                                    if (item === 'Market' || item === 'Limit') {
                                        setTypeTrade(item)
                                    }
                                    setPrice('')
                                }}
                                key={item}
                                marginVertical={5}
                            >
                                <Txt
                                    fontFamily={fonts.RM}
                                    size={13}
                                    color={item === typeTrade ? colors.yellow : colors.gray5}
                                >
                                    {item}
                                </Txt>
                            </Btn>
                        )}
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default TypePrice

const styles = StyleSheet.create({
    priceInput: {
        height: '100%',
        paddingRight: 10,
        fontFamily: fonts.AS,
        fontSize: 15,
    }
})