import Box from '@commom/Box'
import { hideBottomTab } from '@hooks/index'
import React from 'react'
import BottomTab from './BottomTab'
import P2p from '@screen/P2p'

const P2pTab = () => {
    hideBottomTab()

    return (
        <Box flex={1}>
            <Box flex={1}>
                <P2p />
            </Box>
            <BottomTab />
        </Box>
    )
}

export default P2pTab