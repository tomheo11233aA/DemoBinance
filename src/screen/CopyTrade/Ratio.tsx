import Box from '@commom/Box';
import Btn from '@commom/Btn';
import Txt from '@commom/Txt';
import { colors } from '@theme/colors';
import { fonts } from '@theme/fonts';
import React, { useState } from 'react';
import { TextInput } from 'react-native';

interface Props {
    theme: any;
    note: string;
    title: string;
    value: string;
    percents: number[];
    onChangeText: (txt: string) => void;
}

const Ratio = ({
    note,
    title,
    theme,
    value,
    percents,
    onChangeText,
}: Props) => {
    const [percentChoosed, setPercentChoosed] = useState(0)

    return (
        <Box marginTop={20}>
            <Txt color={theme.black}>
                {title}
            </Txt>
            <Box
                row
                radius={7}
                alignCenter
                marginTop={15}
                borderWidth={1}
                paddingRight={10}
                borderColor={theme.gray2}
            >
                <TextInput
                    value={value}
                    onChangeText={(txt: string) => {
                        onChangeText(txt)
                        setPercentChoosed(0)
                    }}
                    style={{
                        flex: 1,
                        height: 40,
                        color: theme.black,
                        fontFamily: fonts.M24,
                        paddingHorizontal: 10,
                    }}
                    keyboardType={'numeric'}
                    selectionColor={colors.yellow}
                />
                <Txt color={theme.black}>
                    %
                </Txt>
            </Box>

            <Box
                row
                marginTop={10}
                gap={10}
            >
                {percents.map((per, index) => {
                    const borderColor = per == percentChoosed ? colors.yellow : theme.gray2
                    const textColor = per == percentChoosed ? colors.yellow : theme.black

                    return (
                        <Btn
                            onPress={() => {
                                setPercentChoosed(per)
                                onChangeText(String(per))
                            }}
                            flex={1}
                            key={per}
                            radius={7}
                            borderWidth={1}
                            paddingVertical={5}
                            borderColor={borderColor}
                        >
                            <Txt color={textColor} fontFamily={fonts.M23}>
                                {per}
                                <Txt color={textColor} size={12} fontFamily={fonts.IBMPM}>
                                    {'%'}
                                </Txt>
                            </Txt>
                        </Btn>
                    )
                })}
            </Box>
            <Txt size={12} marginTop={10} color={colors.grayBlue}>
                {note}
            </Txt>
        </Box>
    )
}

export default Ratio