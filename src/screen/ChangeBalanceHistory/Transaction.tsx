import Box from "@commom/Box";
import Btn from "@commom/Btn";
import Txt from "@commom/Txt";
import { useTheme } from "@hooks/index";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import { width } from "@util/responsive";
import { useTranslation } from "react-i18next";

interface Props {
    tab: string,
    setTab: Function,
}

export default ({ tab, setTab }: Props) => {
    const { t } = useTranslation()
    const theme = useTheme()
    const data = ['Deposit', 'Withdrawals', 'Buy', 'Sell', 'Convert', 'Trade']

    return (
        <Box>
            <Box
                row
                marginTop={25}
                justifySpaceAround
                alignStart
            >
                {data.map((item: string, index: number) =>
                    <Btn
                        onPress={() => {
                            if (item === 'Deposit' || item === 'Withdrawals') {
                                setTab(item)
                            }
                        }}
                        key={item}
                        alignCenter
                        marginRight={10}
                    >
                        <Txt
                            color={item === tab ? theme.black : colors.grayBlue}
                            fontFamily={fonts.AS}
                            size={13}
                        >
                            {t(item)}
                        </Txt>
                        {item === tab &&
                            <Box width={20} height={3} backgroundColor={colors.yellow} marginTop={5} />
                        }
                    </Btn>
                )}
            </Box>
            <Box width={width} height={0.5} backgroundColor={theme.gray2} marginLeft={-15} />
        </Box>

    )
}