import { getHistoryOrderCopyThunk, getListCancelCopyTraderThunk, getListCopyingTraderThunk, getListPositionCloseCopyThunk } from '@asyncThunk/copyTradeAsyncThunk'
import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { hideBottomTab, useAppDispatch, useTheme } from '@hooks/index'
import Back from '@reuse/Back'
import Safe from '@reuse/Safe'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import TabOrderCopyHistory from './TabOrderCopyHistory'
import TabPositionCopyHistory from './TabPositionCopyHistory'
import Scroll from '@commom/Scroll'
import CopyingTrader from './CopyingTrader'
import CanceledTraderCopying from './CanceledTraderCopying'

const POSITIONS = 'Position Copy history'
const ORDER = 'Order Copy History'
const COPYING_TRADER = 'Copying Trader'
const CANCELED_TRADER_COPYING = 'Canceled trader copying'

const tabs = [
    POSITIONS,
    ORDER,
    COPYING_TRADER,
    CANCELED_TRADER_COPYING,
]

const HistoryCopyTrader = () => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const [tabChoosed, setTabChoosed] = useState(POSITIONS)

    hideBottomTab()
    useEffect(() => {
        handleGetAPI()
    }, [])

    const handleGetAPI = async () => {
        const req = { limit: 1000, page: 1 }
        dispatch(getListPositionCloseCopyThunk(req))
        dispatch(getHistoryOrderCopyThunk(req))
        dispatch(getListCopyingTraderThunk(req))
        dispatch(getListCancelCopyTraderThunk(req))
    }

    return (
        <Safe paddingHorizontal={15}>
            <Box row alignCenter justifySpaceBetween>
                <Back size={16} />
                <Txt color={theme.black} fontFamily={fonts.IBMPM} size={16}>
                    {t('Trader copy history')}
                </Txt>
                <Txt></Txt>
            </Box>

            <Box
                marginTop={20}
                borderBottomWidth={1}
                borderColor={theme.gray2}
            >
                <Scroll horizontal alignStart>
                    {tabs.map((tab) => {
                        return (
                            <Btn
                                key={tab}
                                alignCenter
                                marginRight={20}
                                onPress={() => setTabChoosed(tab)}
                            >
                                <Txt color={theme.black} fontFamily={fonts.IBMPM} marginBottom={10}>
                                    {t(tab)}
                                </Txt>
                                {tab == tabChoosed &&
                                    <Box
                                        width={30}
                                        height={3}
                                        backgroundColor={colors.yellow}
                                    />
                                }
                            </Btn>
                        )
                    })}
                </Scroll>
            </Box>
            {
                tabChoosed == POSITIONS ?
                    <TabPositionCopyHistory {...{ t, theme, handleGetAPI }} /> :
                    tabChoosed == ORDER ?
                        <TabOrderCopyHistory {...{ t, theme, handleGetAPI }} /> :
                        tabChoosed == COPYING_TRADER ?
                            <CopyingTrader {...{ t, theme, handleGetAPI }} /> :
                            <CanceledTraderCopying {...{ t, theme, handleGetAPI }} />
            }
        </Safe>
    )
}

export default HistoryCopyTrader