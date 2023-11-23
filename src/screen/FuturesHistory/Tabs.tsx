import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
    tab: string;
    setTab: Function;
}

const Tabs = ({ tab, setTab }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    const tabs: string[] = [
        'Open Orders',
        'Order History',
        'Position History',
        // 'Trade History',
        'Transaction History',
        // 'TWAP History',
        // 'Funding Fee',
    ]

    return (
        <Box
            marginTop={15}
            borderBottomWidth={1}
            borderColor={theme.gray2}
        >
            <Scroll
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {tabs.map((item: string) =>
                    <Btn
                        onPress={() => setTab(item)}
                        key={item}
                        alignCenter
                        marginRight={20}
                        justifyCenter={false}
                    >
                        <Txt
                            size={15}
                            fontFamily={fonts.AS}
                            color={tab === item ? theme.black : colors.grayBlue}
                        >
                            {t(item)}
                        </Txt>
                        {tab === item &&
                            <Box
                                width={25}
                                height={4}
                                marginTop={10}
                                backgroundColor={colors.yellow}
                            />
                        }
                    </Btn>
                )}
            </Scroll>
        </Box>
    )
}

export default Tabs