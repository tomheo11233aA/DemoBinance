import { ydmhm } from "@method/date";
import { IChart } from "@screen/Futures/Chart";
import { colors } from "@theme/colors";
import { G, Line, Text as TextSVG } from "react-native-svg";

interface Props {
    theme: any;
    candles: IChart[];
    paddingTop: number;
    gap_candle: number;
    width_candle: number;
    height_container: number;
    padding_right_candle: number;
}

export default ({
    theme,
    candles,
    gap_candle,
    paddingTop,
    width_candle,
    height_container,
    padding_right_candle,
}: Props) => {
    return (
        <G key={`G_Candles`}>
            {
                candles.map((item: IChart, index) => {
                    const x_point = gap_candle * index - padding_right_candle
                    return (
                        <G key={`G_candles_${index}`}>
                            {(index == 15 || index == 30 || index == 45) &&
                                <>
                                    <Line
                                        key={`l2_candles_Y ${index}`}
                                        x1={x_point}
                                        y1={0}
                                        x2={x_point}
                                        y2={height_container - paddingTop}
                                        stroke={theme.line2}
                                        strokeWidth={0.5}
                                    />
                                    <TextSVG
                                        key={`T_l2_candles_Y ${index}`}
                                        x={x_point}
                                        y={height_container - 10}
                                        fontSize={8}
                                        fill={colors.grayBlue}
                                        textAnchor={'middle'}
                                    >
                                        {ydmhm(item.time)}
                                    </TextSVG>
                                </>
                            }

                            <Line
                                key={`L_candles_${index}`}
                                x1={x_point}
                                y1={item.highSVG}
                                x2={x_point}
                                y2={item.lowSVG}
                                stroke={item.colorChart}
                                strokeWidth={1}
                            />
                            <Line
                                key={`l2_candles ${index}`}
                                x1={x_point}
                                y1={item.closeSVG == item.openSVG ? item.closeSVG + 1 : item.closeSVG}
                                x2={x_point}
                                y2={item.openSVG}
                                stroke={item.colorChart}
                                strokeWidth={width_candle}
                            // animatedProps={useAnimatedProps(() => {
                            //     return {
                            //         strokeWidth: width_candle_animated.value,
                            //         x1: x_point + x_canlde_animated.value,
                            //         x2: x_point + x_canlde_animated.value,
                            //     }
                            // })}
                            />
                        </G>
                    )
                })
            }
        </G>
    )

}