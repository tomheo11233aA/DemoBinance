import Box from '@commom/Box'
import Icon from '@commom/Icon'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { delay } from '@method/alert'
import { HEIGHT_BOTTOM_TAB, styles } from '@navigation/Container'
import { useNavigation } from '@react-navigation/native'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import Login from '@screen/Wallet/Login'
import { loadingFuturesSelector } from '@selector/futuresSelector'
import { isLoginUserSelector } from '@selector/userSelector'
import futuresSlice from '@slice/futuresSlice'
import { height } from '@util/responsive'
import React, { useEffect, useRef } from 'react'
import { AppState, AppStateStatus, Platform } from 'react-native'
import Drawer from './Drawer'
import Header from './Header'
import OpenCloseChart from './OpenCloseChart'
import Transaction from './Transaction'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'

const Futures = () => {
  const theme = useTheme()
  const drawerRef = useRef(null)
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  const isLogin = useAppSelector(isLoginUserSelector)
  const loading = useAppSelector(loadingFuturesSelector)

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      dispatch(getProfileThunk())
      dispatch(futuresSlice.actions.setLoading(true))
    })
    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      focus
    }
  }, [])

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      dispatch(getProfileThunk())
      dispatch(futuresSlice.actions.setLoading(true))
    }
  }

  useEffect(() => {
    if (loading) {
      navigation.getParent()?.setOptions({
        tabBarStyle: [
          styles.container,
          { backgroundColor: theme.bg }
        ]
      })
      delay(1000).then(() => dispatch(futuresSlice.actions.setLoading(false)))
    }
  }, [loading])

  return (
    <>
      {isLogin ?
        <Box flex={1}>
          {!loading ?
            <>
              <Box
                height={
                  Platform.OS === 'android' ? height - HEIGHT_BOTTOM_TAB * 2 :
                    height - HEIGHT_BOTTOM_TAB
                }
              >
                <KeyBoardSafe
                  bg={theme.gray5}
                  paddingBottom={0}
                  refesh={loading}
                  onRefesh={() => {
                    dispatch(getProfileThunk())
                    dispatch(futuresSlice.actions.setLoading(true))
                  }}
                >
                  <Header drawerRef={drawerRef} />
                  <Transaction />
                </KeyBoardSafe>
                <OpenCloseChart />
              </Box>
              <Drawer ref={drawerRef} />
            </> :
            <Box flex={1} alignCenter justifyCenter backgroundColor={theme.bg}>
              {/* <LoadingYellow /> */}
              <Icon
                size={30}
                source={require('@images/Logo.png')}
              />
            </Box>
          }
        </Box>
        :
        <Login />
      }
    </>
  )
}

export default Futures

// import { View, Text } from 'react-native'
// import React from 'react'
// import Box from '@commom/Box'
// import ComingSoon from '@screen/ComingSoon'

// const Futures = () => {
//   return (
//     <ComingSoon />
//   )
// }

// export default Futures