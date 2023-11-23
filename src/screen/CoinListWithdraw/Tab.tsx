import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

interface Props {
    theme: any;
    tab: 'Crypto' | 'Cash';
    setTab: (tab: 'Crypto' | 'Cash') => void;
}

const Tab = ({
    tab,
    theme,
    setTab,
}: Props) => {
    return (
        <Box
            row
            alignStart
            marginTop={20}
            justifySpaceAround
            paddingHorizontal={20}
        >
            <Btn onPress={() => setTab('Crypto')}>
                <Txt
                    size={18}
                    fontFamily={fonts.AS}
                    color={tab === 'Crypto' ? theme.black : colors.gray5}
                >
                    Crypto
                </Txt>
                {tab === 'Crypto' &&
                    <Box width={35} height={4} backgroundColor={colors.yellow} marginTop={10} />
                }
            </Btn>

            <Btn onPress={() => setTab('Cash')}>
                <Txt
                    size={18}
                    fontFamily={fonts.AS}
                    color={tab === 'Cash' ? theme.black : colors.gray5}
                >
                    Cash
                </Txt>
                {tab === 'Cash' &&
                    <Box width={35} height={4} backgroundColor={colors.yellow} marginTop={10} />
                }
            </Btn>
        </Box>
    )
}

export default Tab