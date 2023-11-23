import Box from '@commom/Box'
import { height, width } from '@util/responsive'
import React from 'react'
import Txt from '@commom/Txt'
import { fonts } from '@theme/fonts'
import { StyleSheet, View } from 'react-native'
import { colors } from '@theme/colors'
import { useTranslation } from 'react-i18next'
import { HEIGHT_RECT, MARGIN_TOP } from './BackIDCard'

const R = width * 5 / 100
const W = 2
const RADIUS = 3

const Frame = () => {
    const { t } = useTranslation()
    return (
        <Box
            absolute
            width={width}
            height={height}
            alignCenter
        >
            <View
                style={{
                    width: '90%',
                    borderWidth: 5,
                    borderRadius: 10,
                    marginBottom: 20,
                    height: HEIGHT_RECT,
                    borderColor: 'white',
                    marginTop: MARGIN_TOP,
                }}
            >
                <Box
                    width={R}
                    height={R}
                    bottom={R / 3}
                    left={R / 3}
                    absolute
                    borderBottomWidth={W}
                    borderRightWidth={W}
                    borderBottomRightRadius={RADIUS}
                    rotateZ={'90deg'}
                />
                <Box
                    width={R}
                    height={R}
                    top={R / 3}
                    left={R / 3}
                    absolute
                    borderBottomWidth={W}
                    borderRightWidth={W}
                    borderBottomRightRadius={RADIUS}
                    rotateZ={'-180deg'}
                />
                <Box
                    width={R}
                    height={R}
                    top={R / 3}
                    right={R / 3}
                    absolute
                    borderBottomWidth={W}
                    borderRightWidth={W}
                    borderBottomRightRadius={RADIUS}
                    rotateZ={'-90deg'}
                />
                <Box
                    width={R}
                    height={R}
                    bottom={R / 3}
                    right={R / 3}
                    absolute
                    borderBottomWidth={W}
                    borderRightWidth={W}
                    borderBottomRightRadius={RADIUS}
                />
            </View>
            <Box width={'80%'}>
                <Txt style={styles.txt}>
                    {t('Place the')}
                    <Txt style={[styles.txt, { color: colors.yellow }]}>
                        {t(' Back of ID Card ')}
                    </Txt>
                    {t('in the frame')}
                </Txt>
            </Box>
        </Box >
    )
}

export default Frame

const styles = StyleSheet.create({
    txt: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontFamily: fonts.AS,
    }
})