import { getProfileThunk } from '@asyncThunk/userAsyncThunk'
import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { hideBottomTab, useAppDispatch } from '@hooks/index'
import KeyBoardSafe from '@reuse/KeyBoardSafe'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BinancePro from './BinancePro'
import Header from './Header'
import Infomation from './Infomation'
import List from './List'
import Menu from './Menu'
import Referral from './Referral'
import TokenBalance from './TokenBalance'

const Profile = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const [refresh, setRefesh] = useState<boolean>(false)

  hideBottomTab()

  const handleRefresh = async () => {
    setRefesh(true)
    await dispatch(getProfileThunk())
    setRefesh(false)
  }

  return (
    <KeyBoardSafe
      refesh={refresh}
      onRefesh={handleRefresh}
      paddingBottom={20}
    >
      <Box paddingHorizontal={15}>
        <Header />
        <Infomation {...{ t }} />
        <Menu {...{ t }} />
        <BinancePro />
        <TokenBalance />
        <Referral {...{ t }} />
        <List {...{ t }} />
        <Txt
          size={10}
          marginTop={30}
          fontFamily={fonts.SGM}
          color={colors.grayBlue2}
        >
          {t('Please do not disclose SMS and Google Authentication codes to anyone, including Binance customer support.')}
        </Txt>
      </Box>
    </KeyBoardSafe>
  )
}

export default Profile