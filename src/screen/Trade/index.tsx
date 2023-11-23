import Box from "@commom/Box"
import Icon from "@commom/Icon"
import { hideBottomTab, useAppDispatch, useAppSelector, useTheme } from "@hooks/index"
import { delay } from "@method/alert"
import KeyBoardSafe from "@reuse/KeyBoardSafe"
import { loadingTradeSelector } from "@selector/tradeSelector"
import tradeSlice from "@slice/tradeSlice"
import { colors } from "@theme/colors"
import { useEffect } from "react"
import { AppState, AppStateStatus, StyleSheet, View } from "react-native"
import Date from "./Date"
import Diagram from "./Diagram"
import Footer from "./Footer"
import Header from "./Header"
import History from "./History"
import Statistical from "./Statistical"
import Times from "./Times"
import { useNavigation } from "@react-navigation/native"
import { styles as styled } from "@navigation/Container";

export default () => {
  const theme = useTheme()
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const loading = useAppSelector(loadingTradeSelector)

  hideBottomTab()

  useEffect(() => {
    dispatch(tradeSlice.actions.setLoading(true))
    AppState.addEventListener('change', handleAppStateChange);
  }, [])

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active') {
      dispatch(tradeSlice.actions.setLoading(true))
    }
  }

  useEffect(() => {
    if (loading) {
      delay(1000).then(() => {
        dispatch(tradeSlice.actions.setLoading(false))
        navigation.getParent()?.setOptions({ tabBarStyle: styled.noneContainer })
      })
    }
  }, [loading])

  const handleRefesh = () => {
    dispatch(tradeSlice.actions.setLoading(true))
  }

  return (
    <View style={styles.container}>
      <KeyBoardSafe
        refesh={loading}
        onRefesh={handleRefesh}
        bg={theme.bg}
        paddingBottom={10}
      >
        {!loading ?
          <>
            <Header />
            <Statistical />
            <Times />
            <Diagram />
            <Date />
            <History />
          </> :
          <Box flex={1} alignCenter justifyCenter>
            {/* <LoadingYellow /> */}
            <Icon
              size={30}
              source={require('@images/Logo.png')}
            />
          </Box>
        }
      </KeyBoardSafe>
      <Footer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black2,
  }
})