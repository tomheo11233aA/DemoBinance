import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { hideBottomTab, useTheme } from '@hooks/index'
import { useRoute } from '@react-navigation/native'
import Safe from '@reuse/Safe'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import { width } from '@util/responsive'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import ItemTPSL from './ItemTPSL'
import Parent from './Parent'

const TPSL = () => {
    const theme = useTheme()
    const { t } = useTranslation()

    const route = useRoute<any>()
    const { itemOpenOrder } = route.params

    const [amountTP, setAmountTP] = useState('')
    const [amountSL, setAmountSL] = useState('')
    const [triggerTP, setTriggerTP] = useState({ value: 'Mark', show: false })
    const [triggerSL, setTriggerSL] = useState({ value: 'Mark', show: false })

    hideBottomTab()

    useEffect(() => {
        if (itemOpenOrder.TP) {
            setAmountTP(itemOpenOrder.TP.toString())
            setTriggerTP({ ...triggerTP, value: itemOpenOrder.triggerTP })
        }
        if (itemOpenOrder.SL) {
            setAmountSL(itemOpenOrder.SL.toString())
            setTriggerSL({ ...triggerSL, value: itemOpenOrder.triggerSL })
        }
    }, [])

    return (
        <Safe
            bg={theme.bg}
            paddingHorizontal={15}
        >
            <Box flex={1}>
                <Header />
                <Parent {...{ itemOpenOrder }} />
                <Box
                    alignEnd
                    width={'95%'}
                    borderLeftWidth={4}
                    alignSelf={'flex-end'}
                    borderColor={theme.gray2}
                >
                    {itemOpenOrder.TP &&
                        <ItemTPSL
                            trigger={triggerTP}
                            amountTrigger={amountTP}
                            setTrigger={setTriggerTP}
                            title={'Take Profit Market'}
                            lastItem={!itemOpenOrder.SL}
                            setAmountTrigger={setAmountTP}
                            amount={itemOpenOrder.amountPnL_TP}
                            side={itemOpenOrder.side === 'buy' ? 'sell' : 'buy'}
                        />
                    }
                    {itemOpenOrder.SL &&
                        <ItemTPSL
                            zIndex={0}
                            lastItem={true}
                            trigger={triggerSL}
                            title={'Stop Market'}
                            amountTrigger={amountSL}
                            setTrigger={setTriggerSL}
                            setAmountTrigger={setAmountSL}
                            amount={itemOpenOrder.amountPnL_SL}
                            side={itemOpenOrder.side === 'buy' ? 'sell' : 'buy'}
                        />
                    }
                </Box>

                <Box
                    row
                    zIndex={-1}
                    marginTop={width * 25 / 100}
                >
                    <Icon
                        size={11}
                        marginTop={3}
                        tintColor={colors.grayBlue}
                        source={require('@images/future/info2.png')}
                    />
                    <Box paddingLeft={10} flex={1}>
                        <Txt color={colors.grayBlue} size={11} fontFamily={fonts.IBMPR}>
                            {t('The One-Triggers-a One Cancels the-Other (OTOCO) order allows you to place two orders - one primary and two secondary orders - at the same time.')}
                        </Txt>
                    </Box>
                </Box>
            </Box>

            <Btn
                radius={3}
                marginBottom={10}
                paddingVertical={10}
                backgroundColor={colors.yellow}
            >
                <Txt fontFamily={fonts.IBMPM}>{t('Confirm')}</Txt>
            </Btn>
        </Safe>
    )
}

export default TPSL