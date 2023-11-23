import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

interface Props {
    value: string;
    onMinus: Function;
    onPlus: Function;
    setValue: Function;
    placeholder?: string;
}

const EditText = ({
    value,
    onPlus,
    onMinus,
    setValue,
    placeholder = '',
}: Props) => {
    const theme = useTheme()

    return (
        <Box
            row
            alignCenter
            justifySpaceBetween
            paddingHorizontal={10}
            backgroundColor={theme.gray2}
            height={40}
            flex={1}
        >
            <Btn onPress={onMinus}>
                <Txt size={20} bold color={colors.grayBlue}>ー</Txt>
            </Btn>

            <Box flex={1} height={30}>
                <TextInput
                    value={value.toString()}
                    onChangeText={(text: string) => setValue(text)}
                    style={
                        [styles.input, {
                            fontFamily: value.toString() === '' ? fonts.RM : 'Myfont20-Regular',
                            fontSize: value.toString() === '' ? 15 : 18,
                            color: theme.black
                        }]
                    }
                    placeholderTextColor={colors.grayBlue}
                    placeholder={placeholder}
                    keyboardType={'decimal-pad'}
                    selectionColor={colors.yellow}
                />
            </Box>

            <Btn onPress={onPlus}>
                <Txt style={styles.txt}>+</Txt>
            </Btn>
        </Box>
    )
}

export default EditText

const styles = StyleSheet.create({
    input: {
        height: Platform.OS === 'ios' ? 30 : 40,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        textAlign: 'center',
    },
    txt: {
        fontSize: 30,
        color: colors.grayBlue,
    }
})