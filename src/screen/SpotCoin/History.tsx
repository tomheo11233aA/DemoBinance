import Box from "@commom/Box";
import Btn from "@commom/Btn";
import Txt from "@commom/Txt";
import { useTheme } from "@hooks/index";
import { navigate } from "@navigation/navigationRef";
import { colors } from "@theme/colors";
import { fonts } from "@theme/fonts";
import { screen } from "@util/screens";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import TabDeposit from "./TabDeposit";
import TabWithdraw from "./TabWithdraw";

const data = ['Deposit', 'Withdraw']

export default () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const [tab, setTab] = useState('Deposit')

    return (
        <Box marginTop={20}>
            <Box row alignCenter justifySpaceBetween>
                <Txt fontFamily={fonts.IBMPM} size={13} color={theme.black}>
                    {t('History')}
                </Txt>
                <Btn onPress={() => navigate(screen.CHANGE_BALANCE_HISTORY)}>
                    <Txt size={12} fontFamily={fonts.IBMPM} color={colors.yellow}>
                        {t('More')}
                    </Txt>
                </Btn>
            </Box>

            <Box row alignStart>
                {data.map((item) =>
                    <Btn
                        key={item}
                        backgroundColor={item === tab && theme.gray}
                        paddingHorizontal={10}
                        paddingVertical={3}
                        radius={4}
                        marginTop={10}
                        onPress={() => setTab(item)}
                    >
                        <Txt
                            size={12}
                            fontFamily={fonts.AS}
                            color={item === tab ? theme.black : colors.grayBlue}
                        >
                            {t(item)}
                        </Txt>
                    </Btn>
                )}
            </Box>

            {tab === 'Deposit' ?
                <TabDeposit /> :
                <TabWithdraw />
            }
        </Box>
    )
}
