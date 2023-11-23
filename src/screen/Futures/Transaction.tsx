import Box from '@commom/Box'
import { useTheme } from '@hooks/index'
import React from 'react'
import BuySellLong from './BuySellLong'
import Cross from './Cross'
import History from './History'
import Statistical from './Statistical'

const Transaction = () => {
    const theme = useTheme()

    return (
        <Box
            padding={15}
            backgroundColor={theme.bg}
            borderTopLeftRadius={30}
            borderTopRightRadius={30}
        >
            <Cross />
            <Box row>
                <Statistical />
                <BuySellLong />
            </Box>
            <History />
        </Box>
    )
}

export default Transaction