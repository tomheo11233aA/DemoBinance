import { numberCommasDot } from "@method/format";
import { IChart } from "@screen/Futures/Chart";
import { colors } from "@theme/colors";
import { width } from "@util/responsive";
import { G, Line, Text as TextSVG } from "react-native-svg";
import { heigh_candle, height_container, paddingTop } from "./Diagram";
import { ydmhm } from "@method/date";

const data = [0, 15, 30, 45]

interface Props {
    theme: any;
    candles: IChart[];
    gap_candle: number;
    heighValueChart: number;
    maxHighItem: IChart | null;
    padding_right_candle: number;
}

export default ({
    theme,
    candles,
    gap_candle,
    maxHighItem,
    heighValueChart,
    padding_right_candle,
}: Props) => {
    return (
        <G key={'G_Line_X'}>
            {data.map((item, index) => {
                let gap_x_line = (heigh_candle / (data.length - 1)) * index + paddingTop
                const textValue = Number(maxHighItem?.high) - (heighValueChart / (data.length - 1)) * index
                
                const x_point = gap_candle * item - padding_right_candle

                return (
                    <G key={`G_Line_X_${index}`}>
                        <Line
                            key={`L_X_${index}`}
                            x1={0}
                            y1={gap_x_line}
                            x2={width}
                            y2={gap_x_line}
                            stroke={theme.line2}
                            strokeWidth={0.5}
                        />
                        <TextSVG
                            key={`T_X_Line_${index}`}
                            x={width}
                            fill={colors.grayBlue}
                            y={gap_x_line}
                            textAnchor={'end'}
                            fontSize={8}
                        >
                            {numberCommasDot(textValue.toFixed(2))}
                        </TextSVG>

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
                            {ydmhm(candles[item].time)}
                        </TextSVG>
                    </G>
                )
            })}
        </G>
    )
}