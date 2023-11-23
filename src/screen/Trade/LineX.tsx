import { numberCommasDot } from "@method/format";
import { IChart } from "@screen/Futures/Chart";
import { colors } from "@theme/colors";
import { width } from "@util/responsive"
import { G, Line, Text as TextSVG } from "react-native-svg"

const size = 4

interface Props {
    theme: any,
    paddingTop: number;
    heigh_candle: number;
    heighValueChart: number;
    maxHighItem: IChart | null;
}

export default ({
    theme,
    paddingTop,
    maxHighItem,
    heigh_candle,
    heighValueChart,
}: Props) => {
    return (
        <G key={'G_Line_X'}>
            {Array.from(new Array(size)).map((_, index) => {
                let gap_x_line = (heigh_candle / (size - 1)) * index + paddingTop
                const textValue = Number(maxHighItem?.high) - (heighValueChart / (size - 1)) * index

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
                    </G>
                )
            })}
        </G>
    )
}