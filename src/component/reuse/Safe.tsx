import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import { useTheme } from '@hooks/index'
import React from 'react'
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'

interface Props {
    bg?: string,
    styles?: any,
    paddingHorizontal?: number;
    children: JSX.Element | JSX.Element[],
}

const Safe = ({
    bg,
    styles,
    children,
    paddingHorizontal,
}: Props) => {
    const theme = useTheme()

    const background = bg ? bg : theme.bg

    return (
        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'android' ? -1000 : 0}
            behavior='padding'
            enabled
            style={[{
                flex: 1,
                backgroundColor: background,
            }, styles]}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <Box
                    flex={1}
                    // isPaddingAdnroid
                    paddingTop={Platform.OS === 'android' ? 10 : 0}
                    paddingHorizontal={paddingHorizontal}
                >
                    {children}
                </Box>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default Safe