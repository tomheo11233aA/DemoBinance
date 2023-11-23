import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Platform, StyleSheet, TextInput } from 'react-native'

const FindCoin = ({ theme }: any) => {
    return (
        <Box paddingHorizontal={15}>
            <Box
                row
                alignCenter
                justifySpaceBetween
                marginTop={5}
            >
                <Txt fontFamily={fonts.RM} size={21} color={theme.black}>
                    USDⓢ-M Futures
                </Txt>
                <Icon
                    source={require('@images/future/menu.png')}
                    size={15}
                    resizeMode={'contain'}
                />
            </Box>

            <Box
                height={Platform.OS === 'ios' ? 30 : 40}
                row
                alignCenter
                backgroundColor={theme.gray2}
                radius={30}
                marginTop={10}
            >
                <Icon
                    source={require('@images/future/look.png')}
                    size={15}
                    resizeMode={'contain'}
                    marginLeft={10}
                />
                <Box flex={1}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Find'}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default FindCoin

const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: '100%',
        paddingLeft: 10,
        paddingRight: 20,
        fontFamily: fonts.RM,
        fontSize: 13,
        color: colors.black,
    }
})