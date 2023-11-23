import Box from '@commom/Box'
import Txt from '@commom/Txt'
import { useAppSelector } from '@hooks/index'
import { numberCommasDot } from '@method/format'
import { listCopiersCopyTradeSelector } from '@selector/copyTradeSelector'
import { colors } from '@theme/colors'
import { fonts } from '@theme/fonts'
import React from 'react'

const TabCopiers = ({ theme, t }: any) => {
  const copiers = useAppSelector(listCopiersCopyTradeSelector)

  return (
    <Box>
      {copiers.data.map((item: any) => {
        const PnL = item.PnL >= 0 ?
          `+${numberCommasDot(item?.PnL?.toFixed(2))}` : `${numberCommasDot(item?.PnL?.toFixed(2))}`
        const colorPnL = item.PnL >= 0 ? colors.green2 : colors.red3

        return (
          <Box
            row
            alignCenter
            key={item.id}
            justifySpaceBetween
            paddingVertical={10}
            borderBottomWidth={1}
            borderColor={theme.gray2}
          >
            <Txt color={theme.black} fontFamily={fonts.IBMPR} size={12}>
              {item.email}
            </Txt>
            <Box>
              <Txt color={colorPnL} fontFamily={fonts.M23} size={16}>
                {PnL}
              </Txt>
              <Txt color={theme.black} fontFamily={fonts.IBMPR} size={12} marginTop={5}>
                {t('Total Profit USDT')}
              </Txt>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default TabCopiers