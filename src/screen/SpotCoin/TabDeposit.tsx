import { getHistoryDepositThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import ItemDepositHistory from '@screen/ChangeBalanceHistory/ItemDepositHistory'
import { historyDepositsFundingSelector } from '@selector/fundingSelector'
import { profileUserSelector } from '@selector/userSelector'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'

const TabDeposit = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const { t } = useTranslation()
  const profile = useAppSelector(profileUserSelector)
  const historyDeposits = useAppSelector(historyDepositsFundingSelector)

  useEffect(() => {
    handleGetHistoryDeposit()
  }, [profile])

  const handleGetHistoryDeposit = async () => {
    const { payload } = await dispatch(getHistoryDepositThunk({ limit: 1000, page: 1 }))
    if (!payload.status) {
      Alert.alert(t(payload.message))
    }
  }

  return (
    <Box maxHeight={400} marginTop={10}>
      <Scroll nestedScrollEnabled={true} paddingBottom={20}>
        {historyDeposits.data.map((item, index) =>
          <ItemDepositHistory
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

export default TabDeposit