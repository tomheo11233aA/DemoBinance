import Box from "@commom/Box"
import Txt from "@commom/Txt"
import { useTheme } from "@hooks/index"
import { colors } from "@theme/colors"
import { fonts } from "@theme/fonts"
import { ScrollView } from "react-native"

const data = ['Cryptocurrency address', 'Binance Account', 'fiat money']

export default () => {
    const theme = useTheme()
    return (
        <Box>
            <ScrollView horizontal >
                <Box row alignCenter justifySpaceAround paddingHorizontal={5}>
                    {data.map((item, index) =>
                        <Box
                            key={item}
                            backgroundColor={index === 1 && theme.gray2}
                            paddingHorizontal={10}
                            paddingVertical={3}
                            radius={4}
                            marginTop={10}
                        >
                            <Txt
                                size={13}
                                fontFamily={fonts.RM}
                                color={index !== 1 ? colors.grayBlue : theme.black}
                            >
                                {item}
                            </Txt>
                        </Box>
                    )}
                </Box>
            </ScrollView>
        </Box>
    )
}