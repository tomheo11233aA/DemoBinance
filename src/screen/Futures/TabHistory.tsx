import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppSelector, useTheme } from '@hooks/index'
import { navigate } from '@navigation/navigationRef'
import { openOrdersFundingSelector } from '@selector/fundingSelector'
import { colors } from '@theme/colors'
import { width } from '@util/responsive'
import { screen } from '@util/screens'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { IOpenOrder } from 'src/model/fundingModel'
import { IPositions } from 'src/model/futuresModel'

interface Props {
    setTab: Function;
    openOrders: any;
    positions: IPositions[];
    tab: 'open' | 'position';
}

const TabHistory = ({ tab, setTab, positions, openOrders }: Props) => {
    const theme = useTheme()
    const { t } = useTranslation()

    return (
        <Box>
            <Box row justifySpaceBetween alignCenter>
                <Box row alignStart>
                    <Btn
                        onPress={() => setTab('open')}
                        alignCenter
                        marginRight={20}
                    >
                        <Txt
                            color={tab === 'open' ? theme.black : colors.gray5}
                        >
                            {t(`${t('Open orders')} (${openOrders.data.length})`)}
                        </Txt>
                        {tab === 'open' && <Box width={18} height={3} backgroundColor={colors.yellow} marginTop={10} />}
                    </Btn>

                    <Btn
                        alignCenter
                        onPress={() => setTab('position')}
                    >
                        <Txt
                            color={tab === 'position' ? theme.black : colors.gray5}
                        >
                            {t(`${t('Positions')} (${positions.length})`)}
                        </Txt>
                        {tab === 'position' && <Box width={18} height={3} backgroundColor={colors.yellow} marginTop={10} />}
                    </Btn>
                </Box>

                <Btn
                    onPress={() => navigate(screen.FUTURES_HISTORY)}
                >
                    <Icon
                        size={15}
                        resizeMode={'contain'}
                        source={require('@images/future/page.png')}
                    />
                </Btn>
            </Box>
            <Box width={width} height={0.5} marginLeft={-15} backgroundColor={theme.gray2} />
        </Box>
    )
}

export default TabHistory