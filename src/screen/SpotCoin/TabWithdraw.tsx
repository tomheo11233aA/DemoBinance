import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Box from '@commom/Box'
import History from '@screen/ChangeBalanceHistory/History'
import { getHistoryWidthdraw } from '@service/fundingService'
import { useAppSelector, useTheme } from '@hooks/index'
import { historyWithdraw } from 'src/model/walletModel'
import ItemWithdrawHistory from '@screen/ChangeBalanceHistory/ItemWithdrawHistory'
import Scroll from '@commom/Scroll'
import { useTranslation } from 'react-i18next'
import { profileUserSelector } from '@selector/userSelector'

const TabWithdraw = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const profile = useAppSelector(profileUserSelector)
    const [historyWithdraws, setHistoryWithdraw] = useState<historyWithdraw[]>([])

    useEffect(() => {
        handleGetHistoryWidthdraw()
    }, [profile])

    const handleGetHistoryWidthdraw = async () => {
        const res = await getHistoryWidthdraw({
            limit: 1000,
            page: 1,
        })
        if (res.status) {
            setHistoryWithdraw(res.data.array)
        }
    }

    return (
        <Box maxHeight={400}>
            <Scroll nestedScrollEnabled={true} paddingBottom={20}>
                {historyWithdraws.map((item, index) =>
                    <ItemWithdrawHistory
                        t={t}
                        theme={theme}
                        item={item}
                        key={item.id}
                    />
                )}
            </Scroll>
        </Box>
    )
}

export default TabWithdraw