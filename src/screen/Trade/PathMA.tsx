import { colors } from "@theme/colors"
import { G, Path } from "react-native-svg"

interface Props {
    dPathMA: {
        ma7: string,
        ma25: string,
        ma99: string,
    },
}

export default ({ dPathMA }: Props) => {
    return (
        <G key={'G_Path'}>
            <Path
                key={'P_MA7'}
                d={dPathMA.ma7}
                strokeWidth={1}
                stroke={colors.yellow}
                fill={'none'}
            />
            <Path
                key={'P_MA25'}
                d={dPathMA.ma25}
                strokeWidth={1}
                stroke={colors.ma25}
                fill={'none'}
            />
            <Path
                key={'P_MA99'}
                d={dPathMA.ma99}
                strokeWidth={1}
                stroke={colors.ma99}
                fill={'none'}
            />
        </G>
    )
}