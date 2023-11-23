import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import { useTheme } from '@hooks/index'
import React from 'react'
import { KeyboardAvoidingView, Platform, RefreshControl, SafeAreaView, ScrollView } from 'react-native'

interface Props {
    bg?: string,
    styles?: any,
    paddingBottom?: number,
    paddingHorizontal?: number
    children: JSX.Element | JSX.Element[],
    onRefesh?: () => void;
    refesh?: any;
}

const KeyBoardSafe = ({
    refesh,
    onRefesh,
    bg,
    styles,
    children,
    paddingBottom = 500,
    paddingHorizontal = 0
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
                >
                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingBottom: paddingBottom,
                            paddingHorizontal: paddingHorizontal,
                        }}
                        refreshControl={
                            onRefesh &&
                            <RefreshControl
                                refreshing={refesh || false}
                                onRefresh={onRefesh}
                            />
                        }
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                    >
                        {children}
                    </ScrollView>
                </Box>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export default KeyBoardSafe