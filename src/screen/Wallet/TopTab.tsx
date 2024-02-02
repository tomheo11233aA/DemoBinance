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
    topTab: string,
    setTopTab: Function,
}

const data: string[] = ['Exchange', 'Web3']

const TopTab = ({ topTab, setTopTab }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()
    return (
        <Box
            row
            justifySpaceAround
            paddingHorizontal={30}
            marginBottom={5}
        >
            <Box
                row
                marginBottom={10}
                radius={3}
                height={30}
                backgroundColor={colors.gray6}
                style={{
                    alignItems: 'center',
                    justifyContent: 'space-around',
                }}
            >
                {data.map(item =>
                    <Box
                        key={item}
                        alignCenter
                        marginHorizontal={1}
                    >
                        <Btn onPress={() => setTopTab(item)}>
                            <Box
                                backgroundColor={topTab === item ? '#fff' : 'transparent'}
                                radius={3}
                                height={29}
                                paddingHorizontal={10}
                                paddingLeft={10}
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <Txt
                                    fontFamily={fonts.BNPR}
                                    fontType={'400'}
                                    size={16}
                                    color={topTab === item ? theme.black : colors.gray5}
                                >
                                    {t(item)}
                                </Txt>
                            </Box>
                        </Btn>
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default TopTab