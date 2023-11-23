import { getListPositionCloseThunk } from '@asyncThunk/fundingAsyncThunk'
import Box from '@commom/Box'
import Scroll from '@commom/Scroll'
import Txt from '@commom/Txt'
import { useAppDispatch, useAppSelector, useTheme } from '@hooks/index'
import { positionsHistoryFundingSelector } from '@selector/fundingSelector'
import { profileUserSelector } from '@selector/userSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Profile } from 'src/model/userModel'
import DownItem from '../TransactionHistory/DownItem'
import Item from './Item'
import { FlatList, RefreshControl } from 'react-native'

const PositionHistory = () => {
  const theme = useTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()

  const profile: Profile = useAppSelector<any>(profileUserSelector)
  const positionsHistory = useAppSelector(positionsHistoryFundingSelector)

  useEffect(() => {
    dispatch(getListPositionCloseThunk())
  }, [])

  const hanldeRefesh = async () => {
    dispatch(getListPositionCloseThunk())
  }

  return (
    <Box flex={1}>
      <Box
        row
        alignCenter
        marginTop={10}
        justifySpaceBetween
      >
        <DownItem
          value={'All'}
          title={'Type: '}
        />
        <Txt color={colors.grayBlue} size={12} fontFamily={fonts.IBMPR}>
          {t('Last update')}
          <Txt color={colors.grayBlue} fontFamily={fonts.M17} size={13}>
            {': --'}
          </Txt>
        </Txt>
      </Box>
      {
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={hanldeRefesh}
            />
          }
          renderItem={
            ({ item }) =>
              <Item
                t={t}
                item={item}
                theme={theme}
                profile={profile}
              />
          }
          initialNumToRender={10}
          data={positionsHistory.data}
          removeClippedSubviews={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 200 }}
        />
      }
    </Box>
  )
}

export default PositionHistory