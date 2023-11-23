import Box from '@commom/Box'
import { hideBottomTab, useAppDispatch, useTheme } from '@hooks/index'
import { useRoute } from '@react-navigation/native'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { height } from '@util/responsive'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Available from './Available'
import Balance from './Balance'
import Header from './Header'
import History from './History'
import TradeSpot from './TradeSpot'
import Footer from './Footer'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import { delay } from '@method/alert'

const SpotCoin = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme()
  const route = useRoute<any>()
  const { coin } = route.params
  const { t } = useTranslation()

  const [refresh, setRefresh] = useState(false)

  hideBottomTab()

  const handleRefresh = async () => {
    setRefresh(true)
    dispatch(getProfileThunk())
    await delay(2000)
    setRefresh(false)
  }

  return (
    <Box flex={1}>
      <KeyBoardSafe
        refesh={refresh}
        onRefesh={handleRefresh}
        bg={theme.gray10}
        paddingBottom={0}
      >
        {refresh ?
          <></>
          :
          <Box height={height}>
            <Header {...{ theme, coin }} />
            <Box backgroundColor={theme.bg} marginTop={10} paddingHorizontal={15} flex={1}>
              <Balance {...{ theme, coin, t }} />
              <Available {...{ theme, coin, t }} />
              <TradeSpot {...{ theme, t }} />
              <History />
            </Box>
          </Box>
        }
      </KeyBoardSafe>
      <Footer {...{ coin }} />
    </Box>
  )
}

export default SpotCoin