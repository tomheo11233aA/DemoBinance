import { db } from '@util/db'
import { width } from '@util/responsive'
import React from 'react'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useSharedValue } from 'react-native-reanimated'
import { Line, Svg } from 'react-native-svg'
import { LENGHT_CHART } from '.'
import Candles from './Candles'

const HEIGHT_SVG = 200
const WIDHT_SVG = width
export const TOTAL_CANDLE_IN_SCREEN = 30
export const HEIGHT_CANDLES = HEIGHT_SVG
export const GAP_CANDLE = width * 2.55 / 100
export const WIDTH_CANDLE = width * 2.052 / 100
export const WIDTH_30_CANDLE = GAP_CANDLE * TOTAL_CANDLE_IN_SCREEN - WIDTH_CANDLE
export const PADING_RIGHT_CANDLES = 20 * GAP_CANDLE - WIDTH_CANDLE - WIDTH_30_CANDLE

const PiChart = ({ data, chartLagre }: any) => {
  const piChart = useSharedValue<any>(db.slice(0, LENGHT_CHART))
  const piChartLage = useSharedValue(db)
  const maxHighChart = useSharedValue<number>(0)
  const minHighChart = useSharedValue<number>(0)
  const section = useSharedValue<number>(0)
  const translateX = useSharedValue<number>(0)

  let dataJson = JSON.stringify(data)
  let chartLagreJson = JSON.stringify(piChartLage)
  piChart.value = JSON.parse(dataJson)
  piChartLage.value = JSON.parse(chartLagreJson)

  maxHighChart.value = Math.max.apply(Math, piChart.value.map((item: any) => item.high))
  minHighChart.value = Math.min.apply(Math, piChart.value.map((item: any) => item.high))
  if (maxHighChart.value == -Infinity || maxHighChart.value == Infinity) {
    maxHighChart.value = 0
  }
  if (minHighChart.value == -Infinity || minHighChart.value == Infinity) {
    minHighChart.value = 0
  }

  const heightValueChart = maxHighChart.value - minHighChart.value
  section.value = HEIGHT_CANDLES / heightValueChart

  const handleGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startX = translateX.value
    },
    onActive: (e, ctx: any) => {
      translateX.value = ctx.startX + e.translationX
    },
  })

  return (
    <PanGestureHandler
      onGestureEvent={handleGestureEvent}
    >
      <Animated.View>
        <Svg
          width={WIDHT_SVG}
          height={HEIGHT_CANDLES}
        // style={{ backgroundColor: colors.grayBlue }}
        >
          <Candles
            piChart={piChart}
            maxHighChart={maxHighChart}
            minHighChart={minHighChart}
            section={section}
            piChartLage={piChartLage}
            translateX={translateX}
          />
          <Line
            x1={GAP_CANDLE * (LENGHT_CHART - 1) + (WIDTH_CANDLE / 2) - PADING_RIGHT_CANDLES}
            y1={0}
            x2={GAP_CANDLE * (LENGHT_CHART - 1) + (WIDTH_CANDLE / 2) - PADING_RIGHT_CANDLES}
            y2={HEIGHT_CANDLES}
            stroke={'red'}
          />
        </Svg>
      </Animated.View>
    </PanGestureHandler>
  )
}

export default PiChart