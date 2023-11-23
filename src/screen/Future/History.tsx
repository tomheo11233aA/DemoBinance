import Box from '@commom/Box'
import React, { useState } from 'react'
import TabHistory from './TabHistory'
import Assets from './Assets'
import PositionsFuture from './PositionsFuture'

const History = () => {
    const [tab, setTab] = useState<'position' | 'assets'>('position')

    return (
        <Box marginTop={10} paddingHorizontal={15}>
            <TabHistory {...{ tab, setTab }} />
            {
                tab === 'position' ? <PositionsFuture />
                    : <Assets />
            }
        </Box>
    )
}

export default History