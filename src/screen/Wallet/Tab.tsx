import React from 'react'
import Box from '@commom/Box'
import { Platform } from 'react-native'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { useTranslation } from 'react-i18next'
import Scroll from '@commom/Scroll'
import { useTheme } from '@hooks/index'

interface Props {
    tab: string,
    setTab: Function,
}

const data: string[] = ['Overview', 'Spot', 'Funding', 'Margin', 'Futures', 'Earn']

const Tab = ({ tab, setTab }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Box
            row
            marginTop={Platform.OS === 'android' ? 10 : 0}
            justifySpaceAround
            paddingHorizontal={30}
        >
            <Scroll horizontal showsHorizontalScrollIndicator={false}>
                {data.map(item =>
                    <Box key={item} alignCenter marginRight={25}>
                        <Btn onPress={() => setTab(item)}>
                            <Txt
                                fontFamily={fonts.AS}
                                size={16}
                                color={tab === item ? theme.black : colors.gray5}
                            >
                                {t(item)}
                            </Txt>
                        </Btn>
                        {tab === item && <Box height={2} width={40} backgroundColor={colors.yellow} marginTop={5} />}
                    </Box>
                )}
            </Scroll>
        </Box>
    )
}

export default Tab