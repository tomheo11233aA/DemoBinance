import Box from '@commom/Box'
import Btn from '@commom/Btn'
import Txt from '@commom/Txt'
import { useAppDispatch, useTheme } from '@hooks/index'
import NotPosition from '@reuse/NotPosition'
import { fonts } from '@theme/fonts'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ItemOpenOrder from './ItemOpenOrder'
import { IOpenOrder } from 'src/model/fundingModel'
import { cancelOpenOrder } from '@service/fundingService'
import { Alert } from 'react-native'
import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import { cancelOpenOrderThunk } from '@asyncThunk/futuresAsyncThunk'

const OpenOrders = ({ openOrders }: any) => {
    const theme = useTheme()
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const handleCancelOpenOrder = async (item: IOpenOrder) => {
        const { payload } = await dispatch(cancelOpenOrderThunk(item.id))
        if (payload.error) {
            return Alert.alert(t(payload.message))
        } else {
            dispatch(getProfileThunk())
        }
    }

    return (
        <>
            {openOrders.data.length === 0 ?
                <NotPosition /> :
                <>
                    <Box row alignCenter justifySpaceBetween marginTop={10}>
                        <Box row alignCenter>
                            <Box
                                width={14}
                                height={14}
                                radius={50}
                                borderWidth={1}
                                marginRight={10}
                                borderColor={theme.gray7}
                                backgroundColor={theme.gray2}
                            />
                            <Txt color={theme.black}>{t('Hide Other Symbols')}</Txt>
                        </Box>
                        <Btn
                            radius={3}
                            paddingVertical={7}
                            paddingHorizontal={10}
                            backgroundColor={theme.gray2}
                        >
                            <Txt size={12} fontFamily={fonts.SGM} color={theme.black}>
                                {t('Close All')}
                            </Txt>
                        </Btn>
                    </Box>
                    {openOrders.data.map((item: IOpenOrder) =>
                        <ItemOpenOrder
                            t={t}
                            item={item}
                            theme={theme}
                            key={item.id}
                            onCancelOpenOrder={handleCancelOpenOrder}
                        />
                    )}
                </>
            }
        </>
    )
}

export default OpenOrders