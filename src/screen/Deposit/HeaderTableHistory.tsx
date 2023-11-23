import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

const HeaderTableHistory = () => {
    const { t } = useTranslation()

    return (
        <Box
            row
            alignCenter
            justifyCenter
            marginTop={15}
        >
            <Box
                width={'29%'}
                style={styles.container}
            >
                <Txt style={styles.text}>{t('Network')}</Txt>
                <View style={styles.line} />
            </Box>
            <Box
                width={'29%'}
                style={styles.container}
            >
                <Txt style={styles.text}>{t('Amount')}</Txt>
                <View style={styles.line} />
            </Box>
            <Box
                width={'29%'}
                style={styles.container}
            >
                <Txt style={styles.text}>{t('Status')}</Txt>
                <View style={styles.line} />
            </Box>
            <Box
                width={'13%'}
                style={styles.container}
            >
                <View />
                <Txt style={styles.text}></Txt>
                <View />
            </Box>
        </Box>
    )
}

export default HeaderTableHistory

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.yellow,
        flexDirection: 'row',
        paddingHorizontal: 5,
    },
    text: {
        fontSize: 14,
    },
    line: {
        backgroundColor: colors.white,
        width: 1,
        height: 20,
    }
})