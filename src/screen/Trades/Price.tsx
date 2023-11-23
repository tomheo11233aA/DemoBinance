import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector } from '@hooks/index'
import { coinsFuturesChartSelector } from '@selector/futuresSelector'
import { coinChoosedSpotSelector, priceSpotSelector, typeTradeSpotSelector } from '@selector/spotSelector'
import { setPrice } from '@slice/spotSlice'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect } from 'react'
import { Platform, StyleSheet, TextInput } from 'react-native'

const Price = ({ theme, t }: any) => {
  const dispatch = useAppDispatch()
  const price = useAppSelector(priceSpotSelector)
  const coinChoosed = useAppSelector(coinChoosedSpotSelector)
  const coins = useAppSelector(coinsFuturesChartSelector)
  const typeTrade = useAppSelector(typeTradeSpotSelector)

  useEffect(() => {
    let price: number | string = 0
    if (coins.length > 0) {
      if (typeTrade === 'Limit') {
        price = coins.filter(coin => coin.symbol === coinChoosed.symbol)[0].close
      } else {
        price = ''
      }
    }
    dispatch(setPrice(price))
  }, [coinChoosed, typeTrade])

  return (
    <Box
      row
      alignCenter
      justifySpaceBetween
      paddingHorizontal={10}
      backgroundColor={typeTrade === 'Limit' ? theme.gray2 : theme.gray}
      height={45}
      marginVertical={5}
    >
      {typeTrade === 'Limit' &&
        <Btn
          onPress={() => {
            const n = Number(price) - 1
            if (n >= 0) {
              dispatch(setPrice(n))
            }
          }}
        >
          <Txt size={20} bold color={colors.grayBlue}>
            ー
          </Txt>
        </Btn>
      }

      <Box flex={1} height={30}>
        <TextInput
          value={price.toString()}
          onChangeText={(text: string) => dispatch(setPrice(text))}
          style={
            [styles.input, {
              fontFamily: price.toString() === '' ? fonts.RM : 'Myfont20-Regular',
              fontSize: price.toString() === '' ? 15 : 18,
              color: theme.black
            }]
          }
          placeholderTextColor={colors.grayBlue}
          placeholder={typeTrade === 'Limit' ? `${t('Price')} USDT` : t('Market Price')}
          keyboardType={'decimal-pad'}
          editable={typeTrade === 'Limit'}
          selectionColor={colors.yellow}
        />
      </Box>

      {typeTrade === 'Limit' &&
        <Btn
          onPress={() => {
            const n = Number(price) + 1
            dispatch(setPrice(n))
          }}
        >
          <Txt style={styles.txt}>+</Txt>
        </Btn>
      }
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