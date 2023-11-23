import Img from '@commom/Img'
import { colors } from '@theme/colors'
import { width } from '@util/responsive'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Svg, { Line as L } from 'react-native-svg'
import { HEIGHT_CHART, WIDTH_CHART } from './Candlestick'

const Line = () => {
  const HEGHT = HEIGHT_CHART + (HEIGHT_CHART * 6.770480704129994 / 100)

  const l1 = 0 + 16
  const l3 = HEGHT / 2
  const l2 = (l3 - l1) / 2 + l1
  const l5 = HEGHT - 16
  const l4 = (l5 - l3) / 2 + l3

  const lines = [l1, l2, l3, l4, l5]

  const applyLetterSpacing = (string: string, count = 3) => {
    return string?.split('')?.join('\u200A'.repeat(count));
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          height: HEGHT,
          position: 'absolute',
          width: WIDTH_CHART,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 50 }}>
          <Img
            source={require('@images/Logo.png')}
            width={30}
            height={30}
          />
          <Text style={{ fontSize: 25, marginLeft: 10, fontWeight: 'bold', color: colors.line }}>
            {applyLetterSpacing('BINANCE')}
          </Text>
        </View>
      </View>

      <View
        style={{
          height: HEGHT,
          position: 'absolute',
          width: WIDTH_CHART,
        }}
      >
        <Svg height={HEGHT} width={width}>
          {lines.map(line =>
            <L
              key={line}
              x1={0}
              y1={line}
              x2={width}
              y2={line}
              strokeWidth={0.6}
              stroke={colors.line}
            />
          )}
          <L
            x1={WIDTH_CHART / 3}
            y1={l1}
            x2={WIDTH_CHART / 3}
            y2={l5}
            strokeWidth={0.6}
            stroke={colors.line}
          />

          <L
            x1={WIDTH_CHART / 1.5}
            y1={l1}
            x2={WIDTH_CHART / 1.5}
            y2={l5}
            strokeWidth={0.6}
            stroke={colors.line}
          />
        </Svg>
      </View>
    </View>
  )
}

export default Line

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -(HEIGHT_CHART * 3.385240352064997 / 100),
  }
})