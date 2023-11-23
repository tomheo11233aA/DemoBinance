import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet } from 'react-native'

interface Props {
    typeTrade: string;
    marginTop?: number;
    typeTrigger: string;
    pnl: any;
    level: number | string;
}

const NoteModalTPSLPosition = ({
    pnl,
    level,
    typeTrade,
    typeTrigger,
    marginTop = 10,
}: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    let ROUND = 1
    if (!isNaN(pnl)) {
        ROUND = Number(pnl) < 10 ? 4 : (Number(pnl) > 9 && Number(pnl) < 51) ? 3 : 1
    }

    const color = Number(pnl) >= 0 ? colors.green : colors.red3

    level = !isNaN(Number(level)) ? numberCommasDot(Number(level).toFixed(ROUND)) : level
    pnl = !isNaN(pnl) ? numberCommasDot(Number(pnl).toFixed(ROUND)) : pnl

    return (
        <Box marginTop={marginTop}>
            <Txt style={styles.textGray}>
                {t('When')}
                <Txt color={theme.black} fontFamily={fonts.IBMPR} size={13}>{` ${t(typeTrigger)} `}</Txt>
                <Txt style={styles.textGray}>{t('reaches')}</Txt>
                <Txt color={theme.black} fontFamily={fonts.M23}>{` ${level} `}</Txt>
                <Txt style={styles.textGray}>{`${t('levels')}, ${t('the2')}`}</Txt>
                <Txt style={styles.textGray}>{` ${typeTrade} `}</Txt>
                <Txt style={styles.textGray}>{t('order will be triggered to close the position. PNL is estimated to be')}</Txt>
                <Txt
                    color={color}
                    fontFamily={fonts.M23}
                >
                    {` ${pnl}.`}
                </Txt>
            </Txt>
        </Box>
    )
}

export default NoteModalTPSLPosition

const styles = StyleSheet.create({
    textGray: {
        fontSize: 13,
        color: colors.grayBlue,
        fontFamily: fonts.IBMPR,
    }
})