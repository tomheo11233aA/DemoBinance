import Box from '@commom/Box'
import Icon from '@commom/Icon'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { getHistoryDeposit } from '@service/walletService'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Alert, View } from 'react-native'
import { historyDeposit } from 'src/model/walletModel'
import ItemDepositHistory from './ItemDepositHistory'
import { historyDepositsFundingSelector } from '@selector/fundingSelector'
import { getHistoryDepositThunk } from '@asyncThunk/fundingAsyncThunk'

const DepositHistory = () => {
    const dispatch = useAppDispatch()
    const theme = useTheme()
    const { t } = useTranslation()
    const historyDeposits = useAppSelector(historyDepositsFundingSelector)

    useEffect(() => {
        handleGetHistoryDeposit()
    }, [])

    const handleGetHistoryDeposit = async () => {
        const { payload } = await dispatch(getHistoryDepositThunk({ limit: 1000, page: 1 }))
        if (!payload.status) {
            Alert.alert(t(payload.message))
        }
    }

    return (
        <Box>
            <Box
                row
                alignCenter
                justifySpaceBetween
                marginTop={20}
            >
                <Box row alignCenter>
                    <View
                        style={{
                            paddingVertical: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 20,
                            backgroundColor: theme.gray2,
                            paddingHorizontal: 10,
                            borderRadius: 3
                        }}>
                        <Txt size={13} fontFamily={fonts.IBMPM} color={theme.black}>
                            Crypto
                        </Txt>
                    </View>
                    <Txt size={13} fontFamily={fonts.IBMPM} color={colors.grayBlue}>Cash</Txt>
                </Box>
                <Icon
                    source={require('@images/wallet/filter.png')}
                    tintColor={'#929ba4'}
                    size={14}
                />
            </Box>

            <Box row alignCenter marginTop={10}>
                <Icon
                    source={require('@images/future/info.png')}
                    size={10}
                    marginRight={5}
                    tintColor={'#b6bec8'}
                />
                <Txt size={11} color={colors.grayBlue2} fontFamily={fonts.IBMPR}>
                    Deposits not arrived?
                </Txt>
                <Txt size={11} color={colors.yellowBold} fontFamily={fonts.IBMPR}>
                    {' Deposits not arrived >'}
                </Txt>
            </Box>

            <Box>
                {historyDeposits.data.map((item: any) =>
                    <ItemDepositHistory
                        t={t}
                        key={item.id}
                        item={item}
                        theme={theme}
                    />
                )}
                <Box alignCenter>
                    <Txt size={12} fontFamily={fonts.IBMPR} marginTop={20} color={colors.grayBlue2}>
                        No more data
                    </Txt>
                </Box>
            </Box>
        </Box>
    )
}

export default DepositHistory