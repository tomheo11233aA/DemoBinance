import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { coinsFuturesChartSelector, priceFuturesSelector, symbolFuturesSelector, typeTradeFuturesSelector } from '@selector/futuresSelector'
import futuresSlice from '@slice/futuresSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, StyleSheet, TextInput } from 'react-native'

const Price = ({ theme }: any) => {
  const dispatch = useAppDispatch()
  const price = useAppSelector(priceFuturesSelector)
  const typeTrade = useAppSelector(typeTradeFuturesSelector)
  const coins = useAppSelector(coinsFuturesChartSelector)
  const symbol = useAppSelector(symbolFuturesSelector)
  const { t } = useTranslation()

  useEffect(() => {
    let price = 0
    if (coins.length > 0) {
      price = coins.filter(coin => coin.symbol === symbol)[0].close
    }
    dispatch(futuresSlice.actions.setPrice(price))
  }, [symbol])

  return (
    <Box
      row
      height={45}
      alignCenter
      marginVertical={5}
      justifySpaceBetween
      paddingHorizontal={10}
      backgroundColor={typeTrade === 'Limit' ? theme.gray2 : theme.gray}
    >
      <Btn
        onPress={() => {
          const n = Number(price) - 1
          if (n >= 0) {
            dispatch(futuresSlice.actions.setPrice(n))
          }
        }}
      >
        <Txt size={20} bold color={colors.grayBlue}>ー</Txt>
      </Btn>

      <Box flex={1} height={30}>
        <TextInput
          value={price.toString()}
          onChangeText={(text: string) => dispatch(futuresSlice.actions.setPrice(text))}
          style={
            [styles.input, {
              fontFamily: price.toString() === '' ? fonts.RM : 'Myfont20-Regular',
              fontSize: price.toString() === '' ? 15 : 18,
              color: theme.black
            }]
          }
          placeholderTextColor={colors.grayBlue}
          placeholder={String(t('Price'))}
          keyboardType={'decimal-pad'}
          editable={typeTrade === 'Limit'}
          selectionColor={colors.yellow}
          numberOfLines={1}
        />
      </Box>

      <Btn
        onPress={() => {
          const n = Number(price) + 1
          dispatch(futuresSlice.actions.setPrice(n))
        }}
      >
        <Txt style={styles.txt}>+</Txt>
      </Btn>
    </Box>
  )
}

export default Price

const styles = StyleSheet.create({
  input: {
    height: Platform.OS === 'ios' ? 30 : 40,
    paddingHorizontal: 5,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  txt: {
    fontSize: 30,
    color: colors.grayBlue,
  }
})