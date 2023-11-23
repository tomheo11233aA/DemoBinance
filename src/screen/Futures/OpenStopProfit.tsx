import Box from '@commom/Box'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { width } from '@util/responsive'
import React, { useState } from 'react'
import Animated from 'react-native-reanimated'
import { G, Path, Svg, Text as TextSVG } from 'react-native-svg'
import { IPositions } from 'src/model/futuresModel'

interface Props {
    t: any;
    theme: any;
    position: IPositions | null;
}

const PADDING = 30
const WIDHT_SVG = width - PADDING
const HEIGHT_SVG = 30

const OpenStopProfit = ({ theme, t, position }: Props) => {
    const [side, setSide] = useState<'buy' | 'sell'>(position?.side || 'buy')

    return (
        <Box marginTop={20}>
            <Animated.View
                style={{
                    borderRadius: 3,
                    overflow: 'hidden',
                }}
            >
                <Svg height={HEIGHT_SVG} width={WIDHT_SVG}>
                    {side === 'buy' ?
                        <G>
                            <Path
                                onPress={() => setSide('sell')}
                                strokeWidth={1}
                                fill={theme.gray2}
                                stroke={theme.gray2}
                                d={`M${WIDHT_SVG} 0L${WIDHT_SVG / 2} 0L${WIDHT_SVG / 2} ${HEIGHT_SVG}L${WIDHT_SVG} ${HEIGHT_SVG}`}
                            />
                            <TextSVG
                                fontSize={13}
                                x={WIDHT_SVG / 1.3}
                                textAnchor={'middle'}
                                fontFamily={fonts.RM}
                                y={HEIGHT_SVG / 2 + 3}
                                fill={colors.grayBlue}
                            >
                                {t('Open Short')}
                            </TextSVG>

                            <Path
                                strokeWidth={1}
                                fill={colors.green2}
                                stroke={colors.green2}
                                d={`M0 0L${WIDHT_SVG / 2} 0L${WIDHT_SVG / 2 + 15} ${HEIGHT_SVG / 2}L${WIDHT_SVG / 2} ${HEIGHT_SVG}L0 ${HEIGHT_SVG}`}
                            />
                            <TextSVG
                                fontSize={13}
                                fill={'white'}
                                x={WIDHT_SVG / 4}
                                textAnchor={'middle'}
                                y={HEIGHT_SVG / 2 + 3}
                                fontFamily={fonts.RM}
                            >
                                {t('Open Long')}
                            </TextSVG>
                        </G>
                        :
                        <G>
                            <Path
                                onPress={() => setSide('buy')}
                                strokeWidth={1}
                                fill={theme.gray2}
                                stroke={theme.gray2}
                                d={`M0 0L${WIDHT_SVG / 2} 0L${WIDHT_SVG / 2} ${HEIGHT_SVG}L0 ${HEIGHT_SVG}`}
                            />
                            <TextSVG
                                fontSize={13}
                                x={WIDHT_SVG / 4}
                                textAnchor={'middle'}
                                fontFamily={fonts.RM}
                                y={HEIGHT_SVG / 2 + 3}
                                fill={colors.grayBlue}
                            >
                                {t('Open Long')}
                            </TextSVG>

                            <Path
                                strokeWidth={1}
                                fill={colors.redCan}
                                stroke={colors.redCan}
                                d={`M${WIDHT_SVG} 0L${WIDHT_SVG / 2} 0L${WIDHT_SVG / 2 - 15} ${HEIGHT_SVG / 2}L${WIDHT_SVG / 2} ${HEIGHT_SVG}L${WIDHT_SVG} ${HEIGHT_SVG}`}
                            />
                            <TextSVG
                                fontSize={13}
                                fill={'white'}
                                x={WIDHT_SVG / 1.3}
                                textAnchor={'middle'}
                                fontFamily={fonts.RM}
                                y={HEIGHT_SVG / 2 + 3}
                            >
                                {t('Open Short')}
                            </TextSVG>
                        </G>
                    }
                </Svg>
            </Animated.View>
        </Box>
    )
}

export default OpenStopProfit