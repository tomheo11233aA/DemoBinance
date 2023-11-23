import Box from '@commom/Box'
import Img from '@commom/Img'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import { goBack } from '@navigation/navigationRef'
import { currencyFuturesSelector } from '@selector/futuresSelector'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

const Header = () => {
    const theme = useTheme()
    const currency = useAppSelector(currencyFuturesSelector)

    return (
        <View style={styles.container}>
            <View style={styles.symbolContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Img
                        source={require('@images/trade/convert.png')}
                        width={19}
                        height={19}
                        resizeMode={'contain'}
                        marginRight={10}
                        tintColor={theme.black}
                    />
                    {/* <Txt color={theme.black} bold size={16}>
                        {coinChoose.currency + '/USDT'}
                    </Txt> */}
                    <Box row alignCenter>
                        <Txt color={theme.black} bold size={15}>
                            {currency}
                        </Txt>
                        <Txt bold size={13}>{'/'}</Txt>
                        <Txt color={theme.black} bold size={15}>USDT</Txt>
                    </Box>
                </View>
            </View>

            <View style={styles.content}>
                <TouchableOpacity
                    style={{ paddingVertical: 15, paddingRight: 20 }}
                    onPress={() => goBack()}
                >
                    <Img
                        width={15}
                        height={15}
                        source={require('@images/back.png')}
                    />
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity>
                        <Img
                            source={require('@images/trade/share.png')}
                            width={12}
                            height={12}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Img
                            source={require('@images/trade/box.png')}
                            width={14}
                            height={14}
                            resizeMode={'contain'}
                            marginHorizontal={15}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Img
                            source={require('@images/trade/star.png')}
                            width={16}
                            height={16}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    symbolContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
        height: 50,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 30,
    },
    container: {
        padding: 10,
    }
})