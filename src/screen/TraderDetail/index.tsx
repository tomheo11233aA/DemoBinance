import { getHistoryTradeToTraderThunk, getListCopiersThunk, getPositionToTraderThunk } from '@asyncThunk/copyTradeAsyncThunk'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { hideBottomTab, useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { styles } from '@navigation/Container'
import { navigate } from '@navigation/navigationRef'
import { useNavigation } from '@react-navigation/native'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import LoadingYellow from '@reuse/LoadingYellow'
import { hotTraderCopyTradeSelector, positionToTraderCopyTraderSelector } from '@selector/copyTradeSelector'
import { setHotTrader } from '@slice/copyTradeSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { screen } from '@util/screens'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Avatar from './Avatar'
import Local from './Local'
import Statistics from './Statistics'
import TransactionData from './TransactionData'

export const listDay = [
  { value: 180, title: 'Last 180D ROI' },
  { value: 90, title: 'Last 90D ROI' },
  { value: 30, title: 'Last 30D ROI' },
  { value: 7, title: 'Last 7D ROI' },
]

const TraderDetail = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const hotTrader = useAppSelector(hotTraderCopyTradeSelector)
  const positionToTrader = useAppSelector(positionToTraderCopyTraderSelector)

  hideBottomTab()

  useEffect(() => {
    handleGetPositionToTrader()

    navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({ tabBarStyle: styles.noneContainer })
    })
  }, [])

  const handleGetPositionToTrader = async () => {
    dispatch(getPositionToTraderThunk(hotTrader.userid))
    dispatch(getListCopiersThunk({
      useridTrader: hotTrader.userid,
      limit: 1000,
      page: 1
    }))
    dispatch(getHistoryTradeToTraderThunk({
      useridTrader: hotTrader.userid,
      limit: 1000,
      page: 1
    }))
  }

  const handleRefresh = async () => {
    handleGetPositionToTrader()
    await dispatch(getProfileThunk())
  }

  const hanldeCopyNow = () => {
    dispatch(setHotTrader(hotTrader))
    navigate(screen.COPY_TRADE)
  }

  return (
    <>
      {positionToTrader.loading ?
        <Box flex={1} backgroundColor={theme.bg} alignCenter justifyCenter>
          <LoadingYellow />
        </Box>
        :
        <Box flex={1} backgroundColor={theme.bg}>
          <KeyBoardSafe
            paddingBottom={40}
            onRefesh={handleRefresh}
          >
            <Avatar {...{ theme, t, hotTrader }} />
            {/* <Local {...{ theme, t }} /> */}
            <Statistics {...{ theme, t }} />
            <TransactionData {...{ theme, t }} />
          </KeyBoardSafe>
          <Box
            marginBottom={40}
            paddingHorizontal={15}
          >
            <Btn
              radius={20}
              paddingVertical={10}
              onPress={hanldeCopyNow}
              backgroundColor={colors.yellow}
            >
              <Txt fontFamily={fonts.IBMPM}>
                {t('Copy Now')}
              </Txt>
            </Btn>
          </Box>
        </Box>
      }
    </>
  )
}

export default TraderDetail