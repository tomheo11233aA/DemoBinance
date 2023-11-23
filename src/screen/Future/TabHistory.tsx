import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    setTab: Function,
    tab: 'assets' | 'position',
}

const TabHistory = ({ tab, setTab }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Box row alignStart marginLeft={-5}>
            <Btn
                alignCenter
                marginRight={20}
                onPress={() => setTab('position')}
            >
                <Txt
                    size={13}
                    fontFamily={fonts.RM}
                    color={tab === 'position' ? theme.black : colors.gray5}
                >
                    {t('Positions')}
                </Txt>
                {tab === 'position' && <Box width={25} height={3} backgroundColor={colors.yellow} marginTop={10} />}
            </Btn>

            <Btn
                onPress={() => setTab('assets')}
                alignCenter
            >
                <Txt
                    size={13}
                    fontFamily={fonts.RM}
                    color={tab === 'assets' ? theme.black : colors.gray5}
                >
                    {t('Assets')}
                </Txt>
                {tab === 'assets' && <Box width={25} height={3} backgroundColor={colors.yellow} marginTop={10} />}
            </Btn>
        </Box>
    )
}

export default TabHistory