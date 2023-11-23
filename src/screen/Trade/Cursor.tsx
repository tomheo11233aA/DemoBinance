import { numberCommasDot } from "@method/format";
import { IChart } from "@screen/Futures/Chart";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import { width } from "@util/responsive";
import moment from "moment";
import { G, Line, Text as TextSVG } from "react-native-svg";

interface Props {
    theme: any;
    candles: IChart[];
    countDown: number;
    size_chart: number; 
    gap_candle: number;
    padding_right_candle: number;
}

export default ({
    theme,
    candles,
    countDown,
    size_chart,
    gap_candle,
    padding_right_candle,
}: Props) => {
    const lastChart = candles[candles.length - 1]
    let closeSVG = lastChart.closeSVG

    const ma7 = numberCommasDot(lastChart?.ma7?.toFixed(2)) || 0
    const ma25 = numberCommasDot(lastChart?.ma25?.toFixed(2)) || 0
    const ma99 = numberCommasDot(lastChart?.ma99?.toFixed(2)) || 0

    const x_text_ma7 = 7

    return (
        <G key={'G_cursor'} >
            <Line
                key={'L_cursor_yellow'}
                x1={(size_chart - 1) * gap_candle - padding_right_candle}
                y1={closeSVG}
                x2={width}
                y2={closeSVG}
                stroke={colors.yellow}
                strokeWidth={1}
                strokeDasharray={'1 2'}
            />
            <Line
                key={'L_cursor'}
                x1={width}
                y1={closeSVG}
                x2={width - 60}
                y2={closeSVG}
                stroke={theme.yellow5}
                strokeWidth={15}
            />
            <Line
                key={'L_cursor_time'}
                x1={width}
                y1={closeSVG + 15}
                x2={width - 50}
                y2={closeSVG + 13}
                stroke={theme.yellow6}
                strokeWidth={15}
            />
            <TextSVG
                key={'text_close_time'}
                fill={colors.yellowBold}
                x={width - 4}
                y={closeSVG + 17}
                textAnchor={'end'}
                fontSize={8}
            >
                {moment.utc(moment.duration(countDown, 's').asMilliseconds()).format('HH:mm:ss') }
            </TextSVG>
            <TextSVG
                key={'text_close'}
                fill={colors.yellowBold}
                x={width - 4}
                y={closeSVG + 4}
                textAnchor={'end'}
                fontSize={8}
            >
                {numberCommasDot(Number(lastChart.close).toFixed(2))}
            </TextSVG>
            <TextSVG
                key={'text_MA7'}
                fill={colors.yellow}
                x={x_text_ma7}
                y={12}
                textAnchor={'start'}
                fontSize={8}
                fontFamily={fonts.IBMPM}
            >
                {`MA(7): ${ma7}`}
            </TextSVG>
            <TextSVG
                key={'text_M25'}
                fill={colors.ma25}
                x={x_text_ma7 + 90}
                y={12}
                textAnchor={'start'}
                fontFamily={fonts.IBMPM}
                fontSize={8}
            >
                {`MA(25): ${ma25}`}
            </TextSVG>
            <TextSVG
                key={'text_MA99'}
                fill={colors.ma99}
                x={x_text_ma7 + 185}
                y={12}
                textAnchor={'start'}
                fontFamily={fonts.IBMPM}
                fontSize={8}
            >
                {`MA(99): ${ma99}`}
            </TextSVG>
        </G>
    )
}