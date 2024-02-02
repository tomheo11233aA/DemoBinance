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
    tab2: string,
    setTab2: Function,
}

const data: string[] = ['Discover', 'Following', 'Announcement', 'News', 'Academy', 'LIVE']

const Tab2 = ({ tab2, setTab2 }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Box
            row
        >
            <Scroll horizontal showsHorizontalScrollIndicator={false} height={50} alignCenter>
                {data.map(item =>
                    <Box key={item} alignCenter marginRight={25}>
                        <Btn onPress={() => setTab2(item)}>
                            <Txt
                                fontFamily={fonts.BNPL}
                                fontType={'600'}
                                size={16}
                                color={tab2 === item ? theme.black : colors.gray78}
                            >
                                {t(item)}
                            </Txt>
                        </Btn>
                        {tab2 === item && <Box height={2} width={40} backgroundColor={colors.yellow} marginTop={5} />}
                        {/* có một cái chấm treen đầu item following */}
                        {item === 'Following' && item === 'Following' && (
                            <Box
                                absolute
                                top={Platform.OS === 'ios' ? -5 : -10}
                                right={Platform.OS === 'ios' ? -10 : -10}
                                width={10}
                                height={10}
                                radius={5}
                                backgroundColor={colors.yellow}
                            />
                        )}
                    </Box>
                )}
            </Scroll>
        </Box>
    )
}

export default Tab2