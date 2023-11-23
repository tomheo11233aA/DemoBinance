import { getHistoryChangeBalanceThunk, getHistoryDepositThunk, getHistoryOpenOrderAllThunk } from "@asyncThunk/fundingAsyncThunk";
import { getPositionThunk } from "@asyncThunk/futuresAsyncThunk";
import { getProfileThunk } from "@asyncThunk/userAsyncThunk";
import { styles } from "@navigation/Container";
import { useNavigation } from "@react-navigation/native";
import { themeUserSelector, userIDSelector } from "@selector/userSelector";
import futuresSlice from "@slice/futuresSlice";
import { colors } from "@theme/colors";
import contants from "@util/contants";
import { useEffect } from "react";
import { AppState, AppStateStatus } from "react-native";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { ICoins } from "src/model/futuresModel";
import { AppDispatch, RootState } from "src/redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// hide or show bottomtab
export const hideBottomTab = () => {
  const navigation = useNavigation()
  const theme = useTheme()

  useEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: styles.noneContainer })
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: [
          styles.container,
          { backgroundColor: theme.bg }
        ]
      })
    }
  }, [])
}

export const useTheme = () => {
  const THEME = colors[useAppSelector(themeUserSelector)]
  return THEME
}

export const getCoinsFromSocket = async () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  useEffect(() => {
    const newSocket = io(contants.HOSTING)

    newSocket.on('listCoin', (coins: ICoins[]) => {
      if (coins) {
        dispatch(futuresSlice.actions.setCoins(coins))
      }
    })

    const blur = navigation.addListener('blur', () => {
      newSocket.disconnect()
    })

    const focus = navigation.addListener('focus', () => {
      newSocket.connect()
    })

    AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      if (nextAppState === 'inactive') {
        newSocket.disconnect()
      }
      if (nextAppState === 'active') {
        newSocket.connect()
      }
    });

    return () => {
      blur
      focus
    }
  }, [])
}

export const socketLimitDeposit = async () => {
  const dispatch = useAppDispatch()
  const userID = useAppSelector(userIDSelector)

  useEffect(() => {
    const newSocket = io(contants.HOSTING)
    newSocket.emit('joinUser', `${userID}`)

    newSocket.on("limit", (res) => {
      console.log('limit hook')
      dispatch(getProfileThunk())
      dispatch(getPositionThunk('BTCUSDT'))
      dispatch(getHistoryOpenOrderAllThunk({
        page: 1,
        limit: 1000,
      }))

      dispatch(getHistoryChangeBalanceThunk({
        limit: 1000,
        page: 1,
        symbol: undefined,
      }))
    })

    newSocket.on('deposit', (res) => {
      console.log('depsit hook')
      dispatch(getProfileThunk())
      dispatch(getHistoryDepositThunk({ limit: 1000, page: 1 }))
    })
  }, [userID])
}