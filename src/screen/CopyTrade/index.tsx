import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Input from '@commom/Input'
import Txt from '@commom/Txt'
import { hideBottomTab, useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { goBack } from '@navigation/navigationRef'
import Back from '@reuse/Back'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import LoadingBlack from '@reuse/LoadingBlack'
import TextError from '@reuse/TextError'
import { hotTraderCopyTradeSelector } from '@selector/copyTradeSelector'
import { profileUserSelector } from '@selector/userSelector'
import { copyTradeFuture } from '@service/copyTradeService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert } from 'react-native'
import { Profile } from 'src/model/userModel'
import Leverage from './Leverage'
import Pair from './Pair'
import TPSL from './TPSL'
import { numberCommasDot } from '@method/format'

const CopyTrade = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const hotTrader = useAppSelector(hotTraderCopyTradeSelector)
  const profile: Profile = useAppSelector<any>(profileUserSelector)

  const [TP, setTP] = useState('')
  const [SL, setSL] = useState('')
  const [core, setCore] = useState(0)
  const [margin, setMargin] = useState('')
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [arraySymbol, setArrSymbol] = useState([])

  hideBottomTab()

  const handleCopyTrade = async () => {
    if (margin.trim() == '') return
    setLoading(true)
    const res = await copyTradeFuture({
      ROETP: TP.trim() == '' ? undefined : TP,
      ROESL: SL.trim() == '' ? undefined : SL,
      amountDeposit: margin,
      arraySymbol: arraySymbol.length < 1 ? null : arraySymbol,
      core: core,
      idCopy: hotTrader.id
    })

    if (res.status) {
      Alert.alert(t('Copy successfully'))
      goBack()
    } else {
      Alert.alert(t(res.message))
    }
    setLoading(false)
  }

  const handleRefresh = async () => {
    setRefresh(true)
    await dispatch(getProfileThunk())
    setRefresh(false)
  }

  return (
    <Box
      flex={1}
      backgroundColor={theme.bg}
    >
      <KeyBoardSafe
        refesh={refresh}
        paddingBottom={50}
        paddingHorizontal={15}
        onRefesh={handleRefresh}
      >
        <Box row justifySpaceBetween>
          <Back size={16} color={theme.black} />
          <Txt color={theme.black} fontFamily={fonts.IBMPM} size={16}>
            {`${t('Copy')} ${hotTrader.email}`}
          </Txt>
          <Txt></Txt>
        </Box>

        <Box marginTop={25}>
          <Txt color={theme.black} fontFamily={fonts.IBMPM}>
            {t('Copy by')}
          </Txt>
          <Txt color={colors.grayBlue} fontFamily={fonts.IBMPR} size={13} marginTop={10}>
            {t('Every trade')}
          </Txt>
        </Box>

        <Txt color={theme.black} fontFamily={fonts.IBMPM} marginTop={20}>
          {t('Margin Type')}
        </Txt>
        <Box
          radius={7}
          marginTop={10}
          borderWidth={1}
          paddingVertical={5}
          paddingHorizontal={15}
          alignSelf={'flex-start'}
          borderColor={colors.yellow}
        >
          <Txt color={colors.yellow} size={12}>USDT</Txt>
        </Box>

        <Txt fontFamily={fonts.IBMPM} color={theme.black} marginTop={25}>
          {t('Margin')}
        </Txt>
        <Input
          radius={7}
          height={40}
          marginTop={15}
          value={margin}
          borderWidth={1}
          font={fonts.M24}
          color={theme.black}
          paddingHorizontal={10}
          onChangeText={setMargin}
          keyboardType={'numeric'}
          borderColor={theme.gray2}
        />
        {margin.trim() == '' ? <TextError text={t('Please enter margin')} /> : <></>}
        <Txt
          size={12}
          marginTop={10}
          color={colors.grayBlue}
          fontFamily={fonts.IBMPR}
        >
          {t('When a trader opens a trade, the estimated margin of your order is 2 USDT Std. Futures Account (Avail.)')}
          <Txt fontFamily={fonts.M23} color={theme.black}>
            {` ${numberCommasDot(profile.balance?.toFixed(2))}`}
            <Txt color={theme.black} size={12}>
              {' USDT'}
            </Txt>
          </Txt>
        </Txt>

        {/* <TPSL {...{ theme, t, TP, SL, setTP, setSL }} />
        <Pair {...{ theme, t, arraySymbol, setArrSymbol }} />
        <Leverage {...{ theme, t, core, setCore }} /> */}
      </KeyBoardSafe>

      <Box paddingHorizontal={15} paddingBottom={40}>
        <Btn
          radius={5}
          disabled={loading}
          height={40}
          onPress={handleCopyTrade}
          backgroundColor={colors.yellow}
        >
          {loading ?
            <LoadingBlack />
            :
            <Txt fontFamily={fonts.IBMPM}>
              {t('Copy Now')}
            </Txt>
          }
        </Btn>
      </Box>
    </Box>
  )
}

export default CopyTrade