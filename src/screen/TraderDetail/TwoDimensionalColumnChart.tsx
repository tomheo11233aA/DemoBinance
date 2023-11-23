import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useTheme } from '@hooks/index'
import { getDMYBy00Z, getDateMD, getDateYMD } from '@method/date'
import { numberCommasDot } from '@method/format'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { theme } from '@theme/index'
import { ReText } from 'react-native-redash'
import { width } from '@util/responsive'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PanGestureHandler, TextInput } from 'react-native-gesture-handler'
import Animated, { Extrapolation, SharedValue, interpolate, useAnimatedGestureHandler, useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated'
import { Circle, G, Line, LinearGradient, Path, Stop, Svg, Text as TextSVG } from 'react-native-svg'
import { Platform } from 'react-native'

const PADDING_H = 30
const WIDTH_SVG = width - PADDING_H
const HEIGHT_SVG = 200
const PADDING_LEFT_CHART = 50
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
    indexColunm: IndexColumn;
    indexRow: IndexRow;
    columns: number[];
}

const LineAnimated = Animated.createAnimatedComponent(Line)
const CircleAnimated = Animated.createAnimatedComponent(Circle)
const InputAniamted = Animated.createAnimatedComponent(TextInput)

const TwoDimensionalColumnChart = ({
    indexRow,
    indexColunm,
    columns,
}: Props) => {
    const theme = useTheme()
    const positionX = useSharedValue(0)
    const positionY = useSharedValue(0)
    const opacity = useSharedValue(0)
    const usdt = useSharedValue(0)
    const day = useSharedValue('')

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
                        let x_point = WIDTH_CHART_ACTUAL + PADDING_LEFT_CHART

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
                                    strokeDasharray={'4'}
                                />
                                <TextSVG
                                    x={0}
                                    fill={COLOR}
                                    textAnchor={'start'}
                                    y={gap_x_line + 2}
                                    fontFamily={FONT}
                                >
                                    {numberCommasDot(text_value?.toFixed(indexColunm.fixed))}
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
        const sub = (indexRow.data.length / indexRow.total)?.toFixed(0)

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
                                    {getDMYBy00Z(item)}
                                </TextSVG>
                            </G>
                        )
                    })
                }
            </G>
        )
    }

    const renderColumn = () => {
        const size = indexRow.data.length < 2 ? 2 : indexRow.data.length
        const heighValueChart = indexColunm.max - indexColunm.min
        let section = HEIGHT_CHART / heighValueChart

        const width_column = WIDTH_CHART_ACTUAL / indexRow.data.length / 2
        const y1 = HEIGHT_CHART - (0 - indexColunm.min) * section + PADDING_TOP_CHART

        return (
            <G>
                {columns.map((col, index) => {
                    let x_point = (WIDTH_CHART_ACTUAL / (size - 1)) * index + PADDING_LEFT_CHART
                    let y2 = HEIGHT_CHART - (col - indexColunm.min) * section + PADDING_TOP_CHART
                    let color = col > 0 ? colors.green2 : col < 0 ? colors.red3 : colors.grayBlue
                    col == 0 && (y2 += 1)

                    return (
                        <Line
                            key={'line-column' + index}
                            x1={x_point}
                            x2={x_point}
                            y1={y1}
                            y2={y2}
                            strokeWidth={width_column}
                            stroke={color}
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
        const index = ((local - PADDING_LEFT_CHART) / (WIDTH_CHART_ACTUAL / (indexRow.data.length - 1)))?.toFixed(0)
        if (Number(index) >= 0) {
            usdt.value = columns[Number(index)]
            day.value = indexRow.data[Number(index)]

            const heighValueChart = indexColunm.max - indexColunm.min
            let section = HEIGHT_CHART / heighValueChart
            section == Infinity && (section = 0)
            let y_point = HEIGHT_CHART - (columns[Number(index)] / 2 - indexColunm.min) * section + PADDING_TOP_CHART
            positionY.value = y_point
        }

        return {
            transform: [
                {
                    translateX: withTiming(local),
                },
            ],
            opacity: opacity.value
        }
    })

    const circleCursorStyle = useAnimatedStyle(() => {
        const local = interpolate(
            positionX.value,
            inputRange,
            outputRange,
            {
                extrapolateLeft: Extrapolation.IDENTITY,
                extrapolateRight: Extrapolation.IDENTITY,
            }
        )

        return {
            transform: [
                { translateX: withTiming(local) },
                { translateY: positionY.value },
            ],
            opacity: opacity.value
        }
    })

    const inputAnimatedProps: any = useAnimatedProps(() => {
        return {
            text: `${getDMYBy00Z(day.value)} ${numberCommasDot(usdt.value?.toFixed(2))}`
        }
    }, [])

    return (
        <Box>
            <Box marginTop={20}>
                <PanGestureHandler onGestureEvent={gestureEvent}>
                    <Animated.View>
                        <Svg width={WIDTH_SVG} height={HEIGHT_SVG}>
                            {render_x_line()}
                            {renderIndexDay()}
                            {(columns.length > 0 && indexRow.data.length > 0) && renderColumn()}

                            {(columns.length > 0 && indexRow.data.length > 0) &&
                                <>
                                    <LineAnimated
                                        key={`L_Cursor`}
                                        x1={0}
                                        y1={PADDING_TOP_CHART}
                                        x2={0}
                                        y2={HEIGHT_CHART + PADDING_TOP_CHART}
                                        stroke={colors.yellowBold}
                                        strokeWidth={2}
                                        strokeDasharray={'7'}
                                        style={cursorStyle}
                                    />
                                    <CircleAnimated
                                        x={0}
                                        y={positionY.value}
                                        r={5}
                                        fill={theme.bg}
                                        stroke={colors.yellowBold}
                                        strokeWidth={2}
                                        style={circleCursorStyle}
                                    />
                                    <Animated.View
                                        style={[{
                                            position: 'absolute',
                                            backgroundColor: colors.yellow,
                                            paddingVertical: 5,
                                            paddingHorizontal: 10,
                                            borderRadius: 10,
                                            alignSelf: 'flex-start',
                                            top: -20,
                                            left: -40,
                                        }, cursorStyle]}
                                    >
                                        <InputAniamted
                                            defaultValue={''}
                                            style={{
                                                color: 'black',
                                                fontSize: 12,
                                            }}
                                            animatedProps={inputAnimatedProps}
                                        />
                                    </Animated.View>
                                </>
                            }
                        </Svg>
                    </Animated.View>
                </PanGestureHandler>
            </Box>
        </Box>
    )
}

export default TwoDimensionalColumnChart