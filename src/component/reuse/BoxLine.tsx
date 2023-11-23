import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import Box from '@commom/Box'
import { colors } from '@theme/colors'
import { useTheme } from '@hooks/index';

interface Props {
    title: string;
    size?: number;
    color?: string;
    font?: any;
    size2?: any;
    bottom?: any;
    numberOfLines?: any;
    borderColor?: string;
    paddingText?: number;
    marginTop?: number;
}

const BoxLine = ({
    title,
    size = 12,
    size2,
    color = colors.gray5,
    font = null,
    bottom = -2,
    numberOfLines = 10,
    borderColor = colors.gray5,
    paddingText = 0,
    marginTop = 0,
}: Props) => {
    const theme = useTheme()

    return (
        <Box marginTop={marginTop}>
            <View
                style={[
                    styles.txtContent,
                    { borderColor }
                ]}
            >
                <Text
                    style={{
                        fontSize: size,
                        color: 'white',
                        fontFamily: font,
                        // position: 'absolute',
                    }}
                    numberOfLines={numberOfLines}
                >
                    {title}
                </Text>
            </View>

            <View
                style={[
                    styles.txtContent2,
                    { backgroundColor: theme.bg }
                ]}
            >
                <Text
                    style={{
                        fontSize: size,
                        color: 'white',
                        opacity: 0,
                        fontFamily: font,
                        // position: 'absolute',
                    }}
                >
                    {title}
                </Text>
                <Text
                    style={{
                        fontSize: size2 || size,
                        color: color,
                        position: 'absolute',
                        bottom: bottom,
                        fontFamily: font,
                        paddingVertical: paddingText,
                    }}
                    numberOfLines={numberOfLines}
                >
                    {title}
                </Text>
            </View>
        </Box>
    )
}

export default BoxLine

const styles = StyleSheet.create({
    txtContent: {
        borderStyle: 'dashed',
        borderWidth: 1,
        borderBottomWidth: 1,
        // width: '100%',
        height: 15,
        position: 'absolute',
        left: Platform.OS === 'android' ? 1 : 0
    },
    txtContent2: {
        backgroundColor: 'white',
        marginTop: -1,
        height: 15,
        paddingHorizontal: Platform.OS === 'android' ? 2 : 0,
        paddingRight: 2, // 2,
        alignSelf: 'flex-start'
    }
})