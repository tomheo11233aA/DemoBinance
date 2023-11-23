import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { getDateMD, getDateYMD } from '@method/date'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { theme } from '@theme/index'
import { ReText } from 'react-native-redash'
import { width } from '@util/responsive'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedGestureHandler, useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated'
import { Circle, G, Line, Path, Svg, Text as TextSVG } from 'react-native-svg'
import { Platform } from 'react-native'

const PADDING_H = 30
const WIDTH_SVG = width - PADDING_H
const HEIGHT_SVG = 200
const PADDING_LEFT_CHART = 30
const PADDING_RIGHT_CHART = 10
const WIDTH_CHART = WIDTH_SVG - PADDING_LEFT_CHART
const WIDTH_CHART_ACTUAL = WIDTH_CHART - PADDING_RIGHT_CHART
const PADDING_TOP_CHART = 10
const HEIGHT_CHART = HEIGHT_SVG - 40

const FONT = fonts.M17
const COLOR = colors.grayBlue

export interface IndexColumn {
  min: number;
  max: number;
  total: number;
  fixed?: 2;
}

export interface IndexRow {
  data: any[];
  total: number;
}

interface Props {
  title: string;
  indexColunm: IndexColumn;
  indexRow: IndexRow;
  lineYellow: number[];
}

const LineAnimated = Animated.createAnimatedComponent(Line)

const ChartPNl = ({
  title,
  indexRow,
  indexColunm,
  lineYellow,
}: Props) => {
  const theme = useTheme()
  const positionX = useSharedValue(0)
  const opacity = useSharedValue(0)
  const usdt = useSharedValue(0)
  const day = useSharedValue(0)

  const { t } = useTranslation()

  let inputRange = [0, 1]
  let outputRange = [0, 1]
  const calcRange = () => {
    let range: any = []
    if (indexRow.data.length > 1) {
      indexRow.data.map((item, index) => {
        range.push((WIDTH_CHART_ACTUAL / (indexRow.data.length - 1) * index + PADDING_LEFT_CHART))
      })
    }


    for (let i = 0; i < range.length; i++) {
      if (i === 0) inputRange.push(range[i])

      if (i !== 0) {
        const tb = (range[i] - range[i - 1]) / 2 + range[i - 1]
        inputRange = [...inputRange, (tb - 0.1), (tb + 0.1), range[i]]
      }

      if (i !== 0 && i < (range.length - 1)) {
        outputRange = [...outputRange, range[i], range[i], range[i]]
      } else {
        outputRange = [...outputRange, range[i], range[i]]
      }
    }
  }

  calcRange()

  const render_x_line = () => {
    const size = indexColunm.total
    return (
      <G>
        {
          Array.from(new Array(size)).map((_, index) => {
            let gap_x_line = (HEIGHT_CHART / (size - 1)) * index + PADDING_TOP_CHART
            let x_point = WIDTH_CHART + PADDING_LEFT_CHART
            const heightValue = indexColunm.max - indexColunm.min
            const text_value = indexColunm.max - (heightValue / (size - 1)) * index

            return (
              <G key={'g_x_line' + index}>
                <Line
                  key={gap_x_line}
                  x1={PADDING_LEFT_CHART}
                  x2={x_point}
                  y1={gap_x_line}
                  y2={gap_x_line}
                  stroke={theme.gray2}
                />
                <TextSVG
                  x={0}
                  fill={COLOR}
                  textAnchor={'start'}
                  y={gap_x_line + 2}
                  fontFamily={FONT}
                >
                  {numberCommasDot(text_value.toFixed(indexColunm.fixed))}
                </TextSVG>
              </G>
            )
          })
        }
      </G>
    )
  }

  const renderIndexDay = () => {
    const size = indexRow.data.length < 2 ? 2 : indexRow.data.length
    let show = 0
    const sub = (indexRow.data.length / indexRow.total).toFixed(0)

    return (
      <G>
        {
          indexRow.data.map((item, index) => {
            let x_point = (WIDTH_CHART_ACTUAL / (size - 1)) * index + PADDING_LEFT_CHART
            let showText = 0
            if (index == 0) {
              showText = 1
            } else if (show == Number(sub)) {
              showText = 1
              show = 0
            }
            show++

            return (
              <G key={'g_index_day' + index}>
                <TextSVG
                  x={x_point}
                  y={HEIGHT_SVG - 3}
                  fontFamily={FONT}
                  fill={COLOR}
                  textAnchor={'middle'}
                  opacity={showText}
                >
                  {getDateMD(item)}
                </TextSVG>
              </G>
            )
          })
        }
      </G>
    )
  }

  const renderLineYellow = () => {
    let dPath = ''
    const size = indexRow.data.length < 2 ? 2 : indexRow.data.length
    const heighValueChart = indexColunm.max - indexColunm.min
    let section = HEIGHT_CHART / heighValueChart

    const circles: { cx: number; cy: number }[] = []

    lineYellow.map((item, index) => {
      let x_point = (WIDTH_CHART_ACTUAL / (size - 1)) * index + PADDING_LEFT_CHART
      let y_point = HEIGHT_CHART - (item - indexColunm.min) * section + PADDING_TOP_CHART

      if (section == Infinity) y_point = HEIGHT_CHART / 2 + PADDING_TOP_CHART

      if (index === 0) {
        dPath += `M${x_point} ${y_point}`
      } else {
        dPath += `L${x_point} ${y_point}`
      }

      circles.push({ cx: x_point, cy: y_point })
    })

    return (
      <G>
        <Path
          d={dPath}
          fill={'none'}
          strokeWidth={1.5}
          stroke={colors.yellow}
        />
        {circles.length <= 21 && circles.map((item, index) => {
          return (
            <Circle
              r={3}
              key={'circles' + index}
              cx={item.cx}
              cy={item.cy}
              fill={theme.bg}
              stroke={colors.yellow}
            />
          )
        })}
      </G>
    )
  }

  const gestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.translateX = positionX.value
      if (ctx.translateX < PADDING_LEFT_CHART) {
        positionX.value = PADDING_LEFT_CHART
      }
      opacity.value = 1
    },
    onActive: (e, ctx) => {
      const translateX = e.translationX + ctx.translateX
      positionX.value = translateX
      if (translateX < PADDING_LEFT_CHART) {
        positionX.value = PADDING_LEFT_CHART
      }
      if (translateX > (WIDTH_CHART_ACTUAL + PADDING_LEFT_CHART)) {
        positionX.value = WIDTH_CHART_ACTUAL + PADDING_LEFT_CHART
      }

    },
    onEnd: (e, ctx) => {
      opacity.value = 0
    }
  })

  const cursorStyle = useAnimatedStyle(() => {
    const local = interpolate(
      positionX.value,
      inputRange,
      outputRange,
      {
        extrapolateLeft: Extrapolation.IDENTITY,
        extrapolateRight: Extrapolation.IDENTITY,
      }
    )
    const index = ((local - PADDING_LEFT_CHART) / (WIDTH_CHART_ACTUAL / (indexRow.data.length - 1))).toFixed(0)
    if (Number(index) >= 0) {
      usdt.value = lineYellow[Number(index)]
      day.value = indexRow.data[Number(index)]
    }

    return {
      transform: [
        {
          translateX: local,
        },
      ],
      opacity: opacity.value
    }
  })

  const valueDrived = useDerivedValue(() => {
    return `${numberCommasDot(usdt.value.toFixed(2))}`
  })

  const dayDrived = useDerivedValue(() => {
    return `${day.value != 0 ? getDateYMD(day.value) : '--'}`
  })

  return (
    <Box>
      <Txt color={theme.black} marginTop={20} fontFamily={fonts.IBMPM}>
        {t(title)}
      </Txt>

      <ReText
        text={dayDrived}
        style={{
          color: colors.grayBlue,
          fontFamily: fonts.M23,
          marginTop: Platform.OS === 'ios' ? 5 : -10,
        }}
      />

      <Box
        row alignCenter
        marginTop={Platform.OS === 'android' ?  -30: 5}
        marginBottom={Platform.OS === 'android' ?  -20: 5}
      >
        <ReText
          text={valueDrived}
          style={{ color: colors.grayBlue, fontFamily: fonts.M24, fontSize: 15 }}
        />
        <Txt color={colors.grayBlue} fontFamily={fonts.IBMPM} size={13} marginTop={-3}>
          {'USDT'}
        </Txt>
      </Box>

      <Box marginTop={20}>
        <PanGestureHandler onGestureEvent={gestureEvent}>
          <Animated.View>
            <Svg width={WIDTH_SVG} height={HEIGHT_SVG}>
              {render_x_line()}
              {renderIndexDay()}
              {(lineYellow.length > 0 && indexRow.data.length > 0) && renderLineYellow()}

              <LineAnimated
                key={`L_Cursor`}
                x1={0}
                y1={PADDING_TOP_CHART}
                x2={0}
                y2={HEIGHT_CHART + PADDING_TOP_CHART}
                stroke={colors.grayBlue}
                strokeWidth={1}
                strokeDasharray={'1'}
                style={cursorStyle}
              />
            </Svg>
          </Animated.View>
        </PanGestureHandler>
      </Box>
    </Box>
  )
}

export default ChartPNl