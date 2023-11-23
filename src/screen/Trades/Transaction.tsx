import Box from '@commom/Box'
import { useTheme } from '@hooks/index'
import React from 'react'
import BuySellLong from './BuySellLong'
import History from './History'
import Statistical from './Statistical'

const Transaction = ({ toastTopRef }: any) => {
    const theme = useTheme()

    return (
        <Box
            paddingVertical={10}
            paddingHorizontal={15}
            backgroundColor={theme.bg}
            borderTopLeftRadius={30}
            borderTopRightRadius={30}
        >
            <Box row>
                <Statistical />
                <BuySellLong toastTopRef={toastTopRef} />
            </Box>
            <History />
        </Box>
    )
}

export default Transaction