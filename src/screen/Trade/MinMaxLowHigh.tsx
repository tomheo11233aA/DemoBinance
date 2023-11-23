import { numberCommasDot } from "@method/format"
import { IChart } from "@screen/Futures/Chart";
import { colors } from "@theme/colors";
import { G, Line, Text as TextSVG } from "react-native-svg"

interface Props {
    candles: IChart[];
    size_chart: number;
    gap_candle: number;
    minLowItem: IChart | null;
    maxHighItem: IChart | null;
    padding_right_candle: number;
}

export default ({
    candles,
    minLowItem,
    gap_candle,
    size_chart,
    maxHighItem,
    padding_right_candle,
}: Props) => {
    const gap_x1_x2_line_max =
        size_chart / 2 < Number(maxHighItem?.position) ? -20 : 20
    const gap_x1_x2_line_min =
        size_chart / 2 < Number(minLowItem?.position) ? -20 : 20

    const x_line_max = gap_candle * Number(maxHighItem?.position) - padding_right_candle
    const y_line_max = candles[Number(maxHighItem?.position)].highSVG

    const x_line_min = gap_candle * Number(minLowItem?.position) - padding_right_candle
    const y_line_min = candles[Number(minLowItem?.position)].lowSVG

    const high = Number(candles[Number(maxHighItem?.position)].high).toFixed(2)
    const low = Number(candles[Number(minLowItem?.position)].low).toFixed(2)

    return (
        <G key={'G_min_max_candle'}>
            <Line
                key={'L_max_candle'}
                x1={x_line_max}
                y1={y_line_max}
                x2={x_line_max + gap_x1_x2_line_max}
                y2={y_line_max}
                strokeWidth={0.5}
                stroke={colors.grayBlue}
            />
            <TextSVG
                key={'text_max_chart'}
                y={y_line_max}
                x={x_line_max + gap_x1_x2_line_max}
                fontSize={8}
                fill={colors.grayBlue}
                textAnchor={gap_x1_x2_line_max < 0 ? 'end' : 'start'}
            >
                {numberCommasDot(high)}
            </TextSVG>

            <Line
                key={'L_min_candle'}
                x1={x_line_min}
                y1={y_line_min}
                x2={x_line_min + gap_x1_x2_line_min}
                y2={y_line_min}
                strokeWidth={0.5}
                stroke={colors.grayBlue}
            />
            <TextSVG
                key={'text_min_chart'}
                fontSize={8}
                fill={colors.grayBlue}
                x={x_line_min + gap_x1_x2_line_min}
                y={y_line_min}
                textAnchor={gap_x1_x2_line_min < 0 ? 'end' : 'start'}
            >
                {numberCommasDot(low)}
            </TextSVG>
        </G>
    )
}